import React from "react";

export default props => (
  <div className="app__header">
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          <h2 className="title">
            {props.title} . <span className="subtitle">{props.subTitle}</span>
          </h2>
        </div>
        <div className="col-lg-3">{props.children}</div>
      </div>
    </div>
  </div>
);
