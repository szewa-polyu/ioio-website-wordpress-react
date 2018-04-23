import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectListPage.css';

import {fetchProjects, fetchProjectCategories, fetchProjectTags, fetchActiveFooter} from 'websiteApi.js';
import routes from 'globals/routes';
import {getProjectCategoryNameById, getProjectTagNameById} from 'utils/mapProjectCategoryAndTagNames';

import Footer from 'containers/Footer';
import scriptjs from 'scriptjs'

function ProjectTags(props) {
  const tag_items = props.tags.map((tag, id) => {
    let tagId = ".filter-" + tag.id
    return (<li key={id} data-filter={tagId}>{tag.name}</li>);
  });
  return (<div className="col-lg-12 ">
    <ul id="portfolio-flters">
      <li data-filter="*" className="filter-active">All</li>
      {tag_items}
    </ul>
  </div>);
}

function loadJSFiles(){
  // const publicUrl = process.env.PUBLIC_URL;
  // const loadScriptsAsync = [
  //   publicUrl + '/lib/jquery/jquery.min.js',
  //   publicUrl + '/lib/bootstrap/js/bootstrap.bundle.min.js',
  //   publicUrl + '/lib/wow/wow.min.js'
  // ];
  // const loadScriptsLater = [
  //   publicUrl + '/lib/jquery/jquery-migrate.min.js',
  //   publicUrl + '/lib/owlcarousel/owl.carousel.min.js',
  //   publicUrl + '/lib/easing/easing.min.js',
  //   publicUrl + '/lib/superfish/hoverIntent.js',
  //   publicUrl + '/lib/scrollspy/scrollspy.js',
  //   publicUrl + '/lib/isotope/isotope.pkgd.min.js',
  //   publicUrl + '/lib/touchSwipe/jquery.touchSwipe.min.js'
  // ];

  // scriptjs(loadScriptsAsync, () => {
  //   scriptjs(loadScriptsLater, () => {
  //     scriptjs(publicUrl + '/js/loadByPage.js');
  //   });
  // });  
}

function AllProjects(props) {
  const tag_item = props.tags.map((tag, id) => {
    let tt = ".filter-" + tag.id
    return (<div>
      <li data-filter={tt}>{tag.name}</li>
    </div>);
  });

  const project_items = props.projectlist.map((project, id) => {
    let tagIds = "col-lg-4 col-md-6 portfolio-item wow fadeInUp ";
    for (let i = 0; i < project.project_tags.length; i++) {
      tagIds += "filter-" + project.project_tags[i] + " "
    }

    const tagsCorrespondingToProj = project.project_tags.map((tagId, index) => {

      let tagName = "";
      if (index >= 1) {
        tagName = " / " + getProjectTagNameById(tagId)
      } else {
        tagName = getProjectTagNameById(tagId)
      }
      return (<span key={index}>
        {tagName}
      </span>);
    });
    let s = project.link;
    cutString(s);
    function cutString(s) {
      let cut = s.indexOf('/projects');
      if (cut === -1)
        return s;
      return s.substr(cut)
    }
    let d = cutString(s);

    return (<div className={tagIds} key={id}>
    <Link to={routes.projectBySlugWithValue(project.slug)}>{props.name}
        <div className="portfolio-wrap">
          <figure>
            <img src={project.cover_image.guid} className="img-fluid" alt="alt"/>
          </figure>
          <div className="portfolio-info">
            <h4>
              {project.my_name}
            </h4>
            <p>{tagsCorrespondingToProj}</p>
          </div>
        </div>
      </Link>
    </div>);
  });

  return (<div className="row portfolio-container">
    {project_items}
  </div>);
}

// filter implementation reference
// https://reactjs.org/docs/thinking-in-react.html
class ProjectListPage extends Component {
  constructor(props) {
    super(props);
    this.selectAllCategoryId = -1;
    this.state = {
      projects: [],
      projectCategories: [],
      projectTags: [],
      footer: null,
      selectedCategoryId: this.selectAllCategoryId
    }

    // https://reactjs.org/docs/handling-events.html
    // This binding is necessary to make `this` work in the callback
    this.handleCategoryButtonClick = this.handleCategoryButtonClick.bind(this);
  }

  componentDidMount() {
    fetchProjects((projects) => {
      this.setState({projects: projects});
    });
    fetchProjectCategories((categories) => {
      this.setState({projectCategories: categories});
    });
    fetchProjectTags((tags) => {
      this.setState({projectTags: tags});
    });
    fetchActiveFooter((aFooter) => {
      this.setState({footer: aFooter});
    });
  }

  handleCategoryButtonClick(categoryId) {
    this.setState({selectedCategoryId: categoryId});
  }

  handleAdd() {}

  handleRemove() {}

  render() {

    const t = this.state.projectTags;
    const p = this.state.projects;
    const footer = this.state.footer;
    if (footer === null) {
      return null;
    }


    return (<div>
      <section id="portfolio" className="section-bg">
        <div className="container-fluid">
          <header className="section-header">
            <h3 className="section-title">Case Studies</h3>
          </header>
          <div className="row">
            <ProjectTags tags={t}/>
          </div>

          <AllProjects projectlist={p} tags={t}/>
        </div>
      </section>
      <Footer
        //Section: Footer
        footer={footer}/>
      {loadJSFiles()}
      </div>);
    }
  }

  export default ProjectListPage;
