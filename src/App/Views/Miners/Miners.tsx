import { css, StyleSheet } from 'aphrodite';
import React from 'react';

import IEnumerableItem from 'App/Components/IEnumerableItem';
import List from 'App/Components/List';
import Miner from 'App/Models/Miner';
import UserData from 'App/Services/UserData';
import Colors from 'Models/Colors';
import MinerPanel from './Views/MinerPanel';

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.backgroundGrey,
    padding: '1em',
  },
  flexContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    height: 'calc(100vh - 5.25em)',
  },
  panel: {
    margin: '0 auto',
    maxHeight: 'calc(100% - 3em)',
    width: '75%',

    backgroundColor: 'white',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
  },
  panelContainer: {
    flex: '3',
    height: '100%',
  },
  selector: {
    flex: '1',
    height: '100%',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
  },
  title: {
    margin: 0,
    paddingBottom: '0.25em',
    paddingLeft: '0.25em',
    paddingTop: '0.5em',
  },
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
    listOfMiners.push({
      label: '+ Add Miner',
      value: 'add_miner',
    } as IEnumerableItem);

    return (
      <div className={`Miners ${css(styles.body)}`}>
        <div className={css(styles.flexContainer)}>
          <div className={css(styles.selector)}>
            <h1 className={css(styles.title)}>Miners</h1>
            <List
              className={`MinerSelector `}
              items={listOfMiners}
              selectedItem={selectedMiner}
              onClickItem={this.handleSelectMiner}
            />
          </div>
          <div className={css(styles.panelContainer)}>
            <MinerPanel
              className={css(styles.panel)}
              miner={miners[selectedMiner]}
              onSaveSettings={this.handleSaveMinerSettings}
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Called when the Add New Miner button is clicked.
   * Add a new miner.
   */
  private addMiner = () => {
    // TODO: Add new miner
  };

  /**
   * Called when a miner is selected from the side menu list.
   * Change the view to that miner.
   * @param id The id of the miner that has been selected
   */
  private handleSelectMiner = (id: string) => {
    const { miners } = this.state;
    // If clicked on Add Miner button
    if (id === 'add_miner') {
      // TODO: Add New Miner
      this.addMiner();
    }
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
