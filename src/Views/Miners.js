import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

import UserData from 'Controllers/UserData';
import ActionHeader from 'Components/ActionHeader';
import List from 'Components/List';
import MinerSettings from 'Views/MinerSettings';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  listPanel: {
    order: 1,
    flex: 1,
    // TODO: Add this if want the viewPanel to resize while the listPanel remains constant
    // flexBasis: 'auto',
  },
  viewPanel: {
    order: 2,
    flex: 3,
  },
});

class Miners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miners: UserData.getMiners(),
      selected: 0,
    };

    this.addNewMinerHandler = this.addNewMinerHandler.bind(this);
    this.selectMinerHandler = this.selectMinerHandler.bind(this);
    this.handleSaveMiner = this.handleSaveMiner.bind(this);
  }

  /**
   * Called when the "Add New" button has been clicked
   */
  addNewMinerHandler() {
    // Change page when clicking on the Add New button
    const { history } = this.props;
    history.push('/add-miner');
  }

  /**
   * Called when a miner has been selected from the list
   * @param {number} index The index of the miner that has been selected
   */
  selectMinerHandler(index) {
    this.setState({ selected: index });
  }

  /**
   * Called when a miner's settings are to be saved.
   * @param {Miner} miner The miner that is being saved
   */
  handleSaveMiner(miner) {
    const { miners, selected } = this.state;
    // Treat React state as Immutable, so create a copy.
    // I know this is not necessary, but I want to follow React guidelines.
    const copyMiners = miners.slice(0);
    copyMiners[selected] = miner;
    UserData.setMiners(copyMiners);
    this.setState({ miners: copyMiners });
  }

  render() {
    const { miners, selected } = this.state;
    return (
      <div id="Miners">
        { /* TODO: Remove the Action Header and move the "Add New" button to the end of the list, don't make a new page, just add one to the list and open it as selected */}
        <ActionHeader title="Miners" buttonId="add-miner" buttonLabel="Add New" onClick={this.addNewMinerHandler} />
        <div className={css(styles.container)}>
          <List
            className={css(styles.listPanel)}
            items={miners.map((miner, index) => ({ label: miner.name, value: index }))}
            onClickItem={this.selectMinerHandler}
            isOrdered
          />
          <MinerSettings
            className={css(styles.viewPanel)}
            miner={miners[selected]}
            onSave={this.handleSaveMiner}
          />
        </div>
      </div>
    );
  }
}

Miners.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Miners);
