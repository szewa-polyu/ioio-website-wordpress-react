import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import $ from 'jquery';
import {menuCanvas} from 'containers/SidebarMenuCanvas';

import routes from 'globals/routes';
import {fetchActiveDarkSidebar, fetchActiveAboutLab} from 'websiteApi';
import './DarkSidebar.css';

function SocialMedia(props) {
  const social_media_items = props.items.map((item, index) => {
    return (<a href={item.link} key={index} className="youtube">{item.my_name}</a>);
  });

  return (
    <div>
      {social_media_items}
    </div>
  );
}

class DarkSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: null,
            about: null
    }
    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    fetchActiveDarkSidebar((aSidebar) => {
      this.setState({sidebar: aSidebar});
    });
    //  $('<canvas id="menu-canvas" width="1000px" height="500px"></canvas>').insertAfter($("#sidebar").parent().find('.menu-item').last());

    fetchActiveAboutLab((anAbout) => {
      this.setState({about: anAbout});
    });
  }

  handleMenuToggle(e) {
    e.preventDefault();

    let attr = $("#sidebar[class*='active']")
    //console.log(attr.length)

    $("#sidebar").toggleClass("active");
    menuCanvas();
  }

  handleMenuClose(e) {
    $("#sidebar").removeClass("active");

    window.setTimeout(function() {
      //$('html, body').scrollTop(0);
      $('html, body').animate({scrollTop: "0"});
    }, 0);
  }

  render() {
    const sidebar = this.state.sidebar;
    if (sidebar === null) {
      return null;
    }

    const about = this.state.about;
    if (about === null) {
      return null;
    }

    return (<nav id="sidebar" className="menu-transition" role="navigation">

      <a id="menu-toggle" role="button" className="menu-transition" onClick={this.handleMenuToggle}>
        <div id="menu-toggle-div">
          <h3>Index</h3>
        </div>
        <div className="close-symbol"></div>
      </a>

      <Link id="logo-toggle" role="button" className="menu-transition" to={routes.lab} onClick={this.handleMenuClose}>
        <img className="logo menu-transition" src={sidebar.logo_image.guid} alt=""/>
        <h4 id="sidebar-top-logo-text">IOIO CREATIVE</h4>
      </Link>

      <div className="container">
        <span>{about.page_subtitle}</span>
      </div>
      <div className="container-fluid ">
        {/*
        <Link className="menu-item menu-transition menu-close" to={routes.labAbout} onClick={this.handleMenuClose}>About</Link><br/>
        <Link className="menu-item menu-transition menu-close" to={routes.projects} onClick={this.handleMenuClose}>Research 0</Link><br/>
        <Link className="menu-item menu-transition menu-close" to={routes.projects} onClick={this.handleMenuClose}>Experiment</Link><br/>

        <Link className="menu-item menu-transition menu-close" to={routes.labContacts} onClick={this.handleMenuClose}>Contact</Link><br/>
        <a className="menu-item menu-transition menu-language menu-close" href="#">English</a><br/>
        <a className="menu-item menu-transition menu-language menu-close" href="#">中文</a>
        */
        }
        <canvas id="menu-canvas" width="1000px" height="500px"></canvas>

        <div className="info-section container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 sidebar-info">
              <h4>
                {sidebar.bottom_section_left_title}
              </h4>
              <p>
                {sidebar.address}
              </p>
            </div>
            <div className="col-lg-3 col-md-3 sidebar-contact-method">
              <p>
                <strong>{sidebar.phone}</strong>
                <br/>
                <strong>{sidebar.email}</strong>
                <br/>
              </p>
            </div>
            <div className="col-lg-3 col-md-3 ">
              <div className="social-links">
                <SocialMedia items={sidebar.social_media}/>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 sidebar-hiring">
              <h4>
                {sidebar.hiring_title}
              </h4>
              <p>
                {sidebar.hiring_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>);
  }
}

export default DarkSidebar;
