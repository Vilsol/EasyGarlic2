import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

import DropdownField from 'Components/DropdownField';
import InputField from 'Components/InputField';
import Button from 'Components/Button';

import UserData from 'Controllers/UserData';

const styles = StyleSheet.create({
  formItem: {
    marginTop: '1em',
    marginBottom: '1em',
  },
});

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: UserData.getMiners().map(miner => ({ value: miner, label: miner.name() })),
      message: '',
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.startMiners = this.startMiners.bind(this);
  }

  // Used when the DropdownField changes, it will pass in the selected values as a parameter
  handleDropdownChange(selectedOptions) {
    this.selectedMiners = selectedOptions.map(option => option.value);
  }

  startMiners() {
    this.setState({
      message: JSON.stringify(this.selectedMiners, null, '  '),
    });
  }

  render() {
    const { options, message } = this.state;
    return (
      <div id="Setup">
        <h1>Mining</h1>
        <form>
          <InputField id="mining-address" label="Address" />
          <InputField id="mining-pool" label="Pool" />
          <DropdownField id="mining-miners" label="Miners" options={options} onChange={this.handleDropdownChange} />
          <Button className={css(styles.formItem)} id="mining-submit" type="submit" label="Start" variant={['primary', 'big']} onClick={this.startMiners} />
        </form>
        { message
          ? (<pre>{message}</pre>)
          : ''
        }
      </div>
    );
  }
}

export default Setup;
