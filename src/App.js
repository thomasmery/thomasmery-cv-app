import React, { Component } from 'react';

// Internal
import Header from './components/Header'
import LangSwitcher from './components/LangSwitcher';

import Intro from './components/Intro'
import Project from './components/Project'
import Technology from './components/Technology'

import { getTechnologiesFromProjects } from './projectsUtils.js';

import './App.css';

let projects_map;

class App extends Component {

  constructor (props) {
      
      super(props);

      const trimmed_pathname = window.location.pathname.replace(/^\//,'');
      const lang = trimmed_pathname.match(/^(fr|en)\/?$/) ? trimmed_pathname : 'en';

      this.state = {
        projects: [],
        technologiesFromProjects: [],
        activeLang: lang,
        activeTechno: null
      }

  }

  switchLang = (lang) => {

    window.history.pushState(lang, lang, lang);

    this.setState( (state ) => ( { 
      activeLang: lang,
      projects: projects_map[lang],
      technologiesFromProjects: getTechnologiesFromProjects(projects_map[lang])
    } ),
      () => window.scrollTo(0, 0)
    );

  }

  onSwitchLang = (e) => {
    e.preventDefault();
    const lang = e.target.getAttribute('href');
    this.switchLang(lang);
  }

  onFilterProjectsByTechno = (techno) => {
    
    if( techno === 'ALL') {
      this.setState( (state) => ( { 
        projects: projects_map[this.state.activeLang],
        activeTechno: null
      } ) );
      return;
    }
    
    const projects = projects_map[this.state.activeLang].filter( 
      (project) => project.technologies.filter(
          ( _techno ) => _techno === techno
        ).length
      );
    
    this.setState( (state) => ({ 
      projects,
      activeTechno: techno
    }) );

    const scroll_offset = document.getElementsByClassName('content')[0].offsetHeight + 20;
    
    window.scrollTo( 0, scroll_offset);

  }

  componentDidMount() {

    // load EN & FR
    const _en = fetch(`/api/projects_en.json`);
    const _fr = fetch(`/api/projects_fr.json`);

    Promise.all( [_en, _fr] ).then(
        ( responses ) => {

          const _jsons_promises = responses.map( (response) => response.json() );
          
          Promise.all( _jsons_promises ).then(
            ( projects_json_data ) => {

                projects_map = {
                  'en': projects_json_data[0],
                  'fr': projects_json_data[1],
                }

                this.setState( (state) => ( { 
                  projects: projects_map[this.state.activeLang],
                  technologiesFromProjects: getTechnologiesFromProjects(projects_map[this.state.activeLang])
                } ) );

                return projects_map;
            }
          )
        }
      );
  }

  renderTechnologies = () =>  {

    // build an array of technologies objects
    // { name: 'techName', count: howManyProjectsUseIt }      
    return this.state.technologiesFromProjects.map( (techno, index) => {
        const onFilterProjects = this.onFilterProjectsByTechno.bind(null, techno.name);
        const className = this.state.activeTechno === techno.name ? 'active' : '';
        const count = parseInt(techno.count, 10)
        const weight_projects_max = 10;
        const weight =  count < weight_projects_max ? count / weight_projects_max * 2 : 1;
        const style= { backgroundColor: `rgba(0,200,200,${ weight } )`, color: 'black' }
        return (
          <li className={className} key={`techno_${index}`} onClick={onFilterProjects}>
            <Technology name={techno.name} projects_count={techno.count} style={style} />
          </li>
        );
      }
    );

  }

  renderProjects = () => {

    return this.state.projects.map( (project, index) => (
        <div key={`project_${index}`} className="project__container">
            <Project name={project.name} data={project} lang={this.state.activeLang}/>
        </div>
      )
    );

  }

  renderIntro () {
    switch(this.state.activeLang) {
      case 'fr':
        return <em>!!! Développeur Web, front-end and back-end, travaille avec <strong>PHP, MySQL, Wordpress, Javascript, React.js, HTML5, CSS3 ...</strong></em>;
      default :
        return <em>Web developer, front-end and back-end, experienced with <strong>PHP, MySQL, Wordpress, Javascript, React.js, HTML5, CSS3 ...</strong></em>;
    }
  }

  renderBio () {
     switch(this.state.activeLang) {
      case 'fr':
        return <div>
            <h5>Code</h5>
            <p>Je suis développeur web autodidacte depuis une quinzaine d'années. J'ai participé à de nombreux projets allant de simples sites web à des applications web plus complexes. Bien que je puisse aborder tout type de projets j'ai récemment été amené à me spécialiser dans l'utilisation du CMS <a href="http://www.wordpress.org" target="_blank" rel="noopener noreferrer">WordPress</a>, de son extension E-Commerce <a href="http://www.woocommerce.com" target="_blank" rel="noopener noreferrer">WooCommerce</a> et d'interfaces utilisateurs modernes faisant appel à la librairie Javascript <a href="http://www.wordpress.org" target="_blank" rel="noopener noreferrer">React.js</a> couplée avec des API REST.</p>
            <h5>Outils et méthodes de travail</h5>
            <p>J'utilise quotidiennement des outils de développement tels que <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a>, <a href="http://www.gulpjs.com" target="_blank" rel="noopener noreferrer">Gulp</a>, <a href="https://webpack.github.io/" target="_blank" rel="noopener noreferrer">Webpack</a>, <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">Babel</a>, <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">Composer</a> et <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> et préfère développer les projets WordPress à l'aide d'architecture telle que <a href="https://roots.io/bedrock/" target="_blank" rel="noopener noreferrer">Bedrock</a>.</p>
            <h5>Design</h5>
            <p>La plupart des projets que je réalise font appel au <em>Responsive Web Design</em> et j'ai une bonne connaissance des outils principaux de création graphique : <em>Photoshop</em>, <em>Sketch</em>, <em>Illustrator</em> ... </p>
            <h5>Autres ...</h5>
            <p>Je suis français et habite à Paris mais suis <em>très à l'aise en anglais</em>, pour ce qui touche au développement ... mais pas seulement.</p>
            <p>Vous trouverez ci-dessous une liste des projets récents que je juge intéressants ainsi que les technologies utilisées pour leur réalisation.</p>
            <p>Et bien sûr n'hésitez pas à me contacter pour plus de détails ... <a href="mailto:thomas.mery@gmail.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope" aria-hidden="true"></i><span style={{ display: 'none' }}>Email</span></a></p>
          </div>
      default :
        return <div>
          <h5>On Coding</h5>
          <p>I am a self-taught web developer and have been developing for the web for 15 years now. I have participated in many projects ranging from simple websites to complex web applications. Although I can tackle different type of projects I now specialize in <a href="http://www.wordpress.org" target="_blank" rel="noopener noreferrer">WordPress</a>, <a href="http://www.woocommerce.com" target="_blank" rel="noopener noreferrer">WooCommerce</a> and modern javascript front-end built with <a href="http://www.wordpress.org" target="_blank" rel="noopener noreferrer">React.js</a></p>
          <h5>On Tools & Workflow</h5>
          <p>I use development tools like <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">Git</a>, <a href="http://www.gulpjs.com" target="_blank" rel="noopener noreferrer">Gulp</a>, <a href="https://webpack.github.io/" target="_blank" rel="noopener noreferrer">Webpack</a>, <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">Babel</a>, <a href="https://getcomposer.org/" target="_blank" rel="noopener noreferrer">Composer</a> and <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker</a> on a daily basis and like to use modern WordPress workflow like <a href="https://roots.io/bedrock/" target="_blank" rel="noopener noreferrer">Bedrock</a>.</p>
          <p>I also am <em>confident with the command line</em> and prefer to now manage projects in the terminal as much as possible, dealing with remote servers through <em>ssh</em> and leveraging the power of the Unix tools when necessary.</p>
          <h5>On Design</h5>
          <p>Most of the projects I now work on adhere to Responsive Web Design principles. I have a reasonable practice of all the major design software: <em>Photoshop</em>, <em>Sketch</em>, <em>Illustrator</em> ... </p>
          <h5>On location & other concerns</h5>
          <p>I am french and live In Paris but I am <em>very comfortable with english</em>, in the work place and outside.</p>
          <p>I am mostly looking for <em>remote work</em> and although I can, of course, spend time with teams on location to bootstrap projects or when absolutely necessary I much prefer Slack and video conferencing applications.</p>
          <p>Please find below the most noteworthy projects I have worked on and the technologies I have used.</p>
          <p>And of course don't hesitate get in touch for more details ... <a href="mailto:thomas.mery@gmail.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope" aria-hidden="true"></i><span style={{ display: 'none' }}>Email</span></a></p>
        </div>;
    }
  }


  render() {
    return (
      <div className="App">

        <Header title="Thomas Mery" subTitle="Web Development">
            <div className="row justify-content-between">
            <div className="col">
              <ul className="menu">
                <li><a href="mailto:thomas.mery@gmail.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope" aria-hidden="true"></i><span style={{ display: 'none' }}>Email</span></a></li>
                <li><a href="https://github.com/thomasmery" target="_blank" rel="noopener noreferrer"><i className="fa fa-github" aria-hidden="true"></i><span style={{ display: 'none' }}>Github</span></a></li>
              </ul>
            </div>
            <div className="col" style={{ textAlign: 'right' }}>
              <LangSwitcher onSwitchLang={this.onSwitchLang} activeLang={this.state.activeLang}/>
            </div>
          </div>
        </Header>

        <div  className="content">

          <div className="container">
            <div className="row">
              <div className="col">
                  <Intro>
                    {this.renderIntro()}
                  </Intro>
                  {this.renderBio()}
              </div>
            </div>
          </div>
        
        </div>

        <div  className="technologies__menu">
          <div className="container ">
            <div className="row">
                <div className="col">
                  <h3><button className="btn btn-outline-info btn-sm" style={{ opacity: this.state.activeTechno ? 1 : 0.4 }}onClick={ () => this.onFilterProjectsByTechno('ALL') }>{App.translate('View all Projects', this.state.activeLang)}</button> <span style={{ fontSize: '0.6em' }}>{App.translate("... or filter by the technologies you're interested in.", this.state.activeLang)} </span></h3>
                  <ul className="list technologies__list">{ this.renderTechnologies() }</ul>
                </div>
            </div>
          </div>
        </div>


        <div className="projects">
          <ul className="list projects__list">{ this.renderProjects() }</ul>
        </div>
      
      </div>
    );
  }
}


/** Quick i18n ... */
App.translations = {
  'View all Projects': {
    'fr': 'Voir tous les projets'
  },
  "... or filter by the technology you're interested in.": {
    'fr': 'ou choisissez une technologie qui vous intéresse.'
  },
  'completed': {
    'fr' : 'terminé'
  },
  'in progress': {
    'fr' : 'en cours'
  },
  'ongoing': {
    'fr' : 'au long cours'
  },
}

export const translate = App.translate = function( term_en, lang ) {
  return (lang === 'en' || ! App.translations[term_en] || ! App.translations[term_en][lang])  
    ? term_en 
    : App.translations[term_en][lang];
}

export default App;
