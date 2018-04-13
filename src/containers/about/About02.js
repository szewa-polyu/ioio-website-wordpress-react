import React, {Component} from 'react';

class About02 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    var a = this.props.about
    return (<section id="media" className="wow fadeIn">
      <div className="container text-left">
        <h1>{a.feature_media_caption}
        </h1>
        <div className="media-video text-center">
          <video className="media-video text-center" controls>
            <source src={a.feature_media.guid} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        </div>
        <p>{a.feature_media_desc}
        </p>
      </div>
    </section>);
  }
}

export default About02;