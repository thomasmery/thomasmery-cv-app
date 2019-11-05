import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import MarkdownIt from "markdown-it";

import Technology from "./Technology";

import { translate } from "../App";

const md = new MarkdownIt();

const defaultCarouselStyles = {
  whiteSpace: "nowrap"
};

const expandedCarouselStyles = {
  ...defaultCarouselStyles,
  ...{
    whiteSpace: "normal"
  }
};

class Project extends Component {
  static defaultProps = {
    lang: "en"
  };

  constructor(props) {
    super(props);

    this.state = {
      detailsHidden: true,
      showNotesMore: false,
      carouselStyles: defaultCarouselStyles
    };
  }

  renderCarousel(images) {
    if (!images || !images.length) {
      return <div>No images</div>;
    }

    return images.map((image_url, index) => (
      <img
        key={`project_image_${index}`}
        src={image_url}
        style={{ width: "100%", height: "auto", marginBottom: "14px" }}
      />
    ));
  }

  toggleNotesMore = () => {
    this.setState(state => ({
      showNotesMore: !this.state.showNotesMore,
      carouselStyles: !this.state.showNotesMore
        ? expandedCarouselStyles
        : defaultCarouselStyles
    }));
  };

  renderTechnologiesList() {
    const { technologies } = this.props.data;

    return (
      <ul className="technologies__list">
        {(technologies || []).map((techno, index, array) => {
          const colorWeight = 1; //1.4 - (index / array.length);
          const style = {
            backgroundColor: `rgba(200,200,200,${colorWeight} )`,
            color: `rgba(255,255,255,${colorWeight} )`
          };
          return (
            <li key={`techno_${index}`}>
              <Technology name={techno} style={style} />
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    const {
      name,
      description,
      notes,
      technologies,
      status,
      project_url,
      repo_url
    } = this.props.data;

    const project_link = project_url ? (
      <a href={project_url || "#"} target="_blank" rel="noopener noreferrer">
        <i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;
      </a>
    ) : (
      ""
    );
    const repo_link = repo_url ? (
      <a href={repo_url || "#"} target="_blank" rel="noopener noreferrer">
        <i className="fa fa-github" aria-hidden="true"></i>&nbsp;
      </a>
    ) : (
      ""
    );

    const images = this.props.data.images || [];

    const notes_parts = notes.split("####");
    const notes_essentials = notes_parts[0];
    const notes_more = notes_parts[1] || "";

    const statusColors = {
      completed: "#5cb85c",
      "in progress": "#f0ad4e",
      ongoing: "#5bc0de"
    };

    return (
      <div>
        <div className="title project__title">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-sm">
                <h4>
                  {name}{" "}
                  <span style={{ fontSize: "0.8em" }}>
                    {project_link} {repo_link}
                  </span>{" "}
                  <span
                    style={{
                      fontSize: "0.5em",
                      position: "relative",
                      top: "-4px",
                      marginLeft: "10px",
                      backgroundColor: statusColors[status]
                    }}
                    className="badge badge-pill badge-info"
                  >
                    {translate(status, this.props.lang)}
                  </span>
                </h4>
              </div>
              <div className="col-sm">{this.renderTechnologiesList()}</div>
            </div>
          </div>
        </div>
        <div className="project__content">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <h6
                  dangerouslySetInnerHTML={{
                    __html: md.renderInline(description)
                  }}
                ></h6>
                <div
                  className="project__details"
                  style={{ position: "relative" }}
                >
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: md
                          .render(notes_essentials)
                          .replace(
                            /(href=".*?")/g,
                            '$1  target="_blank" rel="noopener noreferrer"'
                          )
                      }}
                    ></div>
                    {notes_more ? (
                      <button
                        className="btn btn-sm btn-link btn-more"
                        onClick={this.toggleNotesMore}
                      >
                        {this.state.showNotesMore ? (
                          <i
                            className="fa fa-chevron-circle-up"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <i
                            className="fa fa-chevron-circle-down"
                            aria-hidden="true"
                          ></i>
                        )}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <CSSTransitionGroup
                      transitionName="project__notes__more"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      {this.state.showNotesMore ? (
                        <div
                          className="project__notes__more"
                          dangerouslySetInnerHTML={{
                            __html: md
                              .render(notes_more)
                              .replace(
                                /(href=".*?")/g,
                                '$1  target="_blank" rel="noopener noreferrer"'
                              )
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </CSSTransitionGroup>
                  </div>
                </div>
                <div>{this.renderTechnologiesList()}</div>
              </div>
              <div
                className="col-lg-6 project__carousel"
                style={this.state.carouselStyles}
              >
                {this.renderCarousel(images)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
