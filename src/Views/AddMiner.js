import React, { Component } from 'react';

import DropdownField from 'Components/DropdownField';
import Button from 'Components/Button';
import UserData from 'Controllers/UserData';
import Miner from 'Controllers/Miner';
import MinerOptions from 'Controllers/MinerOptions';


class AddMiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMiner: null,
    };

    this.handleAddMiner = this.handleAddMiner.bind(this);
    this.handleChangeMiner = this.handleChangeMiner.bind(this);
  }

  handleAddMiner() {
    const { selectedMiner } = this.state;
    const miner = new Miner(
      'windows',
      selectedMiner.value.type,
      selectedMiner.value.brand,
      'uuid',
      new MinerOptions('allium'),
      '',
    );
    // TODO: Use online data instead of pre-made
    UserData.addMiner(miner);
    // TODO: Install the miner and change page
  }

  /**
   * Called when the "Available Miners" dropdown's value changes
   */
  handleChangeMiner(miner) {
    this.setState({
      selectedMiner: miner,
    });
  }

  render() {
    const { selectedMiner } = this.state;
    // TODO: Fetch online from json? Make a class like UserData
    // TODO: First make an "auto-detect devices" list, and then add a "custom" as a link (not button), if user wants to use any miner from the list rather than the ones supported by device
    const onlineData = [
      { value: { brand: 'amd', type: 'gpu' }, label: 'AMD GPU' },
      { value: { brand: 'nvidia', type: 'gpu' }, label: 'Nvidia GPU' },
    ];
    return (
      <div id="Add-Miner">
        <h1>Add New Miner</h1>
        <form>
          { /* TODO: Make system to fetch different miner types online from json */ }
          <DropdownField id="available-miners" label="Available Miners" options={onlineData} value={selectedMiner} onChange={this.handleChangeMiner} />
          <Button id="add-button" label="Add" type="submit" variant="primary" onClick={this.handleAddMiner} />
        </form>
      </div>
    );
  }
}

export default AddMiner;
