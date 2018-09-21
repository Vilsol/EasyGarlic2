import React, { Component } from 'react';

import DropdownField from 'Components/DropdownField';
import InputField from 'Components/InputField';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        { value: 'cpu', label: 'CPU' },
        { value: 'gpu', label: 'GPU' },
      ],
    };
  }

  render() {
    const { options } = this.state;
    return (
      <div id="Setup">
        <h1>Mining</h1>
        <form>
          <InputField id="mining-address" label="Address" />
          <InputField id="mining-pool" label="Pool" />
          <DropdownField id="mining-process" label="Process" options={options} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Setup;
