import React, { Component } from 'react';





/*
function new_script(src) {
  return new Promise(function(resolve, reject){
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};
// Promise Interface can ensure load the script only once.
var my_script = new_script('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js');
*/
class Scripts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'start'
    };
  }

  componentDidMount () {
    /*
          const script = document.createElement("script");

          script.src = "https://use.typekit.net/foobar.js";
          script.async = true;

          document.body.appendChild(script);
          */
      }
/*
  do_load = () => {
    var self = this;
    my_script.then(function() {
      self.setState({'status': 'done'});
    }).catch(function() {
      self.setState({'status': 'error'});
    })
  }
*/
  render() {
    /*
    var self = this;
    if (self.state.status === 'start') {
      self.state.status = 'loading';
      setTimeout(function () {
        self.do_load()
      }, 0);
    }
*/
    return (
<div></div>

    );
  }
}

export default Scripts;
