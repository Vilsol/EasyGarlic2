import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

import Navbar from 'Components/Navbar';

const styles = StyleSheet.create({
  main: {
    marginTop: '3em',
    padding: '1em',
  },
});

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={css(styles.app)} id="App">
        <Navbar />
        <main className={css(styles.main)}>
          { children || '' }
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
