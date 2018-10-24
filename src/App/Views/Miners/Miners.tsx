import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import List, { IListItem } from 'App/Components/List';
import Device, { DeviceBrand, DeviceType } from 'App/Models/Device';
import Miner from 'App/Models/Miner';
import MinerPanel from './Views/MinerPanel';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  panel: {
    flex: '3',
  },
  selector: {
    flex: '1',
  },
});

interface IMinersState {
  miners: Miner[];
  selectedMiner: number;
}

// TODO: Make this auto-fetch miners list
const initialState: IMinersState = {
  miners: [
    new Miner(
      'Test Miner',
      new Device(DeviceType.gpu, DeviceBrand.nvidia),
      'ayy'
    ),
    new Miner(
      'Test1Miner',
      new Device(DeviceType.gpu, DeviceBrand.nvidia),
      'ayy'
    ),
    new Miner(
      'Test2Miner',
      new Device(DeviceType.gpu, DeviceBrand.nvidia),
      'ayy'
    ),
  ],
  selectedMiner: 0,
};

class Miners extends React.Component<{}, IMinersState> {
  public readonly state: IMinersState = initialState;

  public render() {
    const { miners, selectedMiner } = this.state;

    // Create the list of miners for the List object
    const listOfMiners: IListItem[] = miners.map(
      miner =>
        ({
          label: miner.name,
          value: miner.getId(),
        } as IListItem)
    );

    return (
      <div className={`Miners ${css(styles.container)}`}>
        <List
          className={`MinerSelector ${css(styles.selector)}`}
          items={listOfMiners}
          selectedItem={selectedMiner}
          onClickItem={this.handleSelectMiner}
        />
        <MinerPanel
          className={css(styles.panel)}
          miner={miners[selectedMiner]}
          onSaveSettings={this.handleSaveMinerSettings}
        />
      </div>
    );
  }

  /**
   * Called when a miner is selected from the side menu list.
   * Change the view to that miner.
   * @param id The id of the miner that has been selected
   */
  private handleSelectMiner = (id: string) => {
    const { miners } = this.state;
    const index: number = miners.findIndex(x => x.getId() === id);
    this.setState({ selectedMiner: index });
  };

  /**
   * Called when a miner has been modified and saved.
   * Update miner list with the new miner.
   * @param miner The new miner object with its modified settings.
   */
  private handleSaveMinerSettings = (miner: Miner) => {
    // TODO: Update the miner list
    console.log('Update list!');
    console.log(miner);
  };
}

export default Miners;
