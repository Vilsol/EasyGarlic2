import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';

import InputField from 'Components/InputField';
import Miner from 'Controllers/Miner';
import Button from 'Components/Button';
import DropdownField from 'Components/DropdownField';

// Styles for the entire form and its content
const styles = StyleSheet.create({
  container: {
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  title: {
    marginTop: 0,
  },
  actionButton: {
    ':not(:first-child)': {
      marginLeft: '0.5em',
    },
    ':not(:last-child)': {
      marginRight: '0.5em',
    },
  },
});

class MinerSettings extends Component {
  constructor(props) {
    super(props);
    const { miner } = props;
    this.state = {
      // Make a deep clone of the miner value so that it doesn't auto-update the settings
      minerValue: cloneDeep(miner),
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDevice = this.handleChangeDevice.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  /**
   * Called when the "Name" input field changes
   * @param {string} value The value of the name input field
   */
  handleChangeName(value) {
    // Update the miner's name
    const { minerValue } = this.state;
    minerValue.name = value;
    this.setState({ minerValue });
  }

  /**
   * Called when the "Device" dropdown changes
   * @param {Object} pair The label/value pair passed from the dropdown
   */
  handleChangeDevice(pair) {
    // Get the device from the value
    const { value } = pair;
    const { minerValue } = this.state;
    // Whether or not the current miner is using the default name
    const isUsingDefaultName = (minerValue.name === minerValue.getDefaultName());

    // Change the device and brand
    minerValue.device = value.device;
    minerValue.brand = value.brand;
    // If it previously used the default name, update it to reflect changes
    if (isUsingDefaultName) {
      minerValue.name = minerValue.getDefaultName();
    }

    this.setState({ minerValue });
  }

  /**
   * Called when the "Save" button is clicked.
   */
  handleSaveButton() {
    const { onSave } = this.props;
    // Get the current miner value to pass as parameter
    const { minerValue } = this.state;
    // Call the onSave prop (set miner = minerValue)
    onSave(minerValue);
    /*
      Since onSave sets miner = minerValue,
      the miner prop passed to MinerSettings will be the same as minerValue.
      This will cause any modification to minerValue to be reflected to the miner prop.
      To fix it, make another deep clone so they are no longer equal.
      Make a clone of the current minerValue so that prop's miner != state's minerValue
    */
    this.setState({ minerValue: cloneDeep(minerValue) });
  }

  /**
   * Called when the "Reset" button is clicked.
   */
  handleResetButton() {
    // Re-clone from props
    const { miner } = this.props;
    this.setState({ minerValue: cloneDeep(miner) });
  }

  render() {
    const { className } = this.props;
    const { minerValue } = this.state;
    // TODO: Make system to analyze available devices (nvidia gpu, intel cpu, etc...)
    const deviceOptions = [
      { value: { brand: 'amd', device: 'gpu' }, label: 'AMD GPU' },
      { value: { brand: 'nvidia', device: 'gpu' }, label: 'Nvidia GPU' },
    ];
    return (
      <div className={`${css(styles.container)} ${className}`}>
        <form>
          <h2 className={css(styles.title)}>{minerValue.name}</h2>
          <InputField id="miner-name" label="Name" value={minerValue.name} onChange={this.handleChangeName} />
          {/* TODO: Change defaultOption from 0 to whichever value is selected in the deviceOptions so that it autosets */}
          <DropdownField id="miner-device" label="Device" options={deviceOptions} onChange={this.handleChangeDevice} defaultIndex={0} />
          <div>
            <Button className={css(styles.actionButton)} id="save" label="Save" type="submit" variant={['primary', 'inline']} onClick={this.handleSaveButton} />
            <Button className={css(styles.actionButton)} id="reset" label="Reset" type="button" variant={['secondary', 'inline']} onClick={this.handleResetButton} />
          </div>
        </form>
      </div>
    );
  }
}

MinerSettings.propTypes = {
  className: PropTypes.string,
  miner: PropTypes.shape(Miner).isRequired,
  onSave: PropTypes.func,
};

MinerSettings.defaultProps = {
  className: '',
  onSave: () => {},
};

export default MinerSettings;
