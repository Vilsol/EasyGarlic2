import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';

import UserData from 'Controllers/UserData';
import ActionHeader from 'Components/ActionHeader';
import List from 'Components/List';

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
    backgroundColor: 'blue',
  },
});

class Miners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      miners: UserData.getMiners(),
      // selected: 0,
    };

    this.addNewMinerHandler = this.addNewMinerHandler.bind(this);
  }

  addNewMinerHandler() {
    // Change page when clicking on the Add New button
    const { history } = this.props;
    history.push('/add-miner');
  }

  // TODO: Make "selected" system using index etc...
  render() {
    const { miners } = this.state;
    return (
      <div id="Miners">
        <ActionHeader title="Miners" buttonId="add-miner" buttonLabel="Add New" onClick={this.addNewMinerHandler} />
        <div className={css(styles.container)}>
          <List
            className={css(styles.listPanel)}
            items={miners.map((miner, index) => ({ label: miner.name(), value: index }))}
            isOrdered
          />
          <div className={css(styles.viewPanel)}>b</div>
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
