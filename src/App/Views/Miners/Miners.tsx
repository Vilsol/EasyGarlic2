import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import ActionHeader from 'App/Components/ActionHeader';
import IEnumerableItem from 'App/Components/IEnumerableItem';
import List from 'App/Components/List';
import Miner from 'App/Models/Miner';
import UserData from 'App/Services/UserData';
import MinerPanel from './Views/MinerPanel';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    height: 'calc(100vh - 6.80em)',
  },
  panel: {
    flex: '3',
  },
  selector: {
    flex: '1',
    height: '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
  },
  title: {},
});

interface IMinersState {
  miners: Miner[];
  selectedMiner: number;
}

const initialState: IMinersState = {
  miners: UserData.getMiners(),
  selectedMiner: 0,
};

class Miners extends React.Component<{}, IMinersState> {
  public readonly state: IMinersState = initialState;

  public render() {
    const { miners, selectedMiner } = this.state;

    // Create the list of miners for the List object
    const listOfMiners: IEnumerableItem[] = miners.map(miner => {
      return {
        label: miner.name,
        value: miner.getId(),
      } as IEnumerableItem;
    });

    return (
      <div className={`Miners`}>
        <ActionHeader
          title="Miners"
          buttonId="add-new-miner"
          buttonLabel="Add Miner"
          onClick={this.handleClickAddMiner}
        />
        <div className={css(styles.flexContainer)}>
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
      </div>
    );
  }

  /**
   * Called when the Add New Miner button is clicked.
   * Add a new miner.
   */
  private handleClickAddMiner = () => {
    // TODO: Add new miner
  };

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
    const { miners, selectedMiner } = this.state;
    miners[selectedMiner] = Miner.ObjectToMiner(miner);
    UserData.setMiners(miners);
    this.setState({ miners });
  };
}

export default Miners;
