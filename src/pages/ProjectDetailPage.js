import React, {Component} from 'react';

import {fetchProjectById} from 'websiteApi'
import {getProjectIdBySlugAsync} from 'utils/mapProjectSlugNameToIds';
import {Redirect} from 'react-router-dom'
import Script from 'react-load-script'
import routes from 'globals/routes';

import scriptjs from 'scriptjs'

import ProjectTemp01 from 'containers/projectDetail/ProjectTemp01';
import ProjectTemp02 from 'containers/projectDetail/ProjectTemp02';
import ProjectTemp03 from 'containers/projectDetail/ProjectTemp03';


import "./video-react.css"; // import css

import {Player} from 'video-react';

import './ProjectDetailPage.css';

import Footer from 'containers/Footer';
import {fetchActiveFooter} from 'websiteApi';

// Choosing the React Element Type at Runtime
// https://reactjs.org/docs/jsx-in-depth.html
const projectTemplateMap = {
  1: ProjectTemp01,
  2: ProjectTemp02,
  3: ProjectTemp03
};

function loadJSFiles() {
  var loadScriptsAsync = ['lib/jquery/jquery.min.js','lib/bootstrap/js/bootstrap.bundle.min.js','lib/wow/wow.min.js']
  var loadScriptsDefer = ['lib/jquery/jquery-migrate.min.js','lib/owlcarousel/owl.carousel.min.js'];

    scriptjs(loadScriptsAsync, () => {
      for (let i = 0; i < loadScriptsDefer.length; i++) {
        scriptjs(loadScriptsDefer[i],'bundle')
      }

    });
    scriptjs.ready('bundle', function() {
      //scriptjs()
    //  scriptjs('js/loadByPage.js')
    //  scriptjs('lib/jqueryvide/jquery.vide.js')

    })

}

function VideoLanding(props) {
  var video_url = props.project.showreel.guid;
  var video_url_shorten = video_url.substring(0, video_url.length - 4);
  var data_vid = 'mp4:' + video_url_shorten + ', webm: video/ocean, ogv:' + video_url_shorten + ', poster: video/ocean" data-vide-options="position: 0% 50%'

  return (<section id="video-landing" className="section-bg">
    <div className="video-landing-div">
      <div className="container-fluid ">
        <div id="block2" data-vide-bg=""></div>
        <div className="video-text wow fadeIn">
          <h1 className="container-fluid">{props.project.my_title}</h1>
          <h2 className="container-fluid">{props.project.subtitle}</h2>
          <a href="#">
            <i className="ion ion-android-arrow-dropright-circle"></i>
            SHOWREEL</a>
        </div>
      </div>
    </div>
  </section>)
}

function VideoLandingDesc(props) {

  return (<section id="video-landing-caption" className="section-bg wow fadeIn">
    <div className="container-fluid">
      <div className="row video-landing-text text-right">
        <div className="col-lg-6">
          <p className="video-landing-text-l">{props.project.primary_desc}</p>
        </div>
        <div className="col-lg-6">
          <p className="video-landing-text-r">{props.project.secondary_desc}</p>
        </div>
      </div>
    </div>
  </section>)

}
class ProjectDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      isReturnNotFound: false
    }
  }

  async componentDidMount() {
    const projectSlugFromQuery = this.props.match.params.projectSlug;
    const projectIdStr = await getProjectIdBySlugAsync(projectSlugFromQuery);
    const projectIdNum = parseInt(projectIdStr, 10);

    // if no corresponding project id entry for the slug got from query
    if (isNaN(projectIdNum)) {
      this.setState({isReturnNotFound: true});
      return;
    }

    fetchProjectById(projectIdNum, (aProject) => {
      if (aProject === null) {
        this.setState({isReturnNotFound: true});
      } else {
        this.setState({project: aProject});
      }
    });
    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });

  }

  render() {
    const state = this.state;
    const project = state.project;

    // should check isReturnNotFound first
    // before checking project === null
    if (state.isReturnNotFound) {
      return (<Redirect to={routes.notFound}/>);
    }

    if (project === null) {
      return null;
    }

    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }

    //    console.log(state.isReturnNotFound);
    //    console.log(project);

    const projectTemplates = project.project_templates;
    const projectTemplateContainer = projectTemplates.map((templateData) => {
      const templateType = parseInt(templateData.my_type, 10);
      const TemplateToUse = projectTemplateMap[templateData.my_type];
      return <TemplateToUse {...templateData}/>
    });

    return (<div>
    <h2>Project Detail Page</h2>
      {project.my_name}
      {projectTemplateContainer}

      <Footer
        //Section: Footer
        footer={footer}/>
        {/*loadJSFiles()*/}
      </div>);
  }
}

export default ProjectDetailPage;
