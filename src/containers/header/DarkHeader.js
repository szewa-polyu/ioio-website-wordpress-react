import React, {Component} from 'react';

import LabWorkLabSwitch from 'containers/workLabSwitch/LabWorkLabSwitch';

export default class DarkHeader extends Component {
  render() {
    return (
      <div>
        <LabWorkLabSwitch />
      </div>
    );
  }
}