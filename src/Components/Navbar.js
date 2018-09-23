import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

import { Colors } from 'Config';

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    minHeight: '1.5em',
    backgroundColor: Colors.black,

    display: 'flex',
  },
  fixed: {
    position: 'fixed',
    top: 0,
  },
  item: {
    color: Colors.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
    userSelect: 'none',

    marginBottom: '1em',
    marginLeft: '1em',
    marginRight: '1em',
    marginTop: '1.25em',
  },
  link: {
    cursor: 'pointer',
    ':hover': {
      color: Colors.primaryDarker,
    },
  },
  logo: {
    cursor: 'default',
  },
  lastOnLeft: {
    marginRight: 'auto',
  },
});

class Setup extends Component {
  render() {
    return (
      <nav id="Navbar" className={css(styles.nav, styles.fixed)} aria-label="main navigation">
        <span className={css(styles.item, styles.logo, styles.lastOnLeft)}>EasyGarlic</span>
        <Link className={css(styles.item, styles.link)} to="/">Mining</Link>
        <Link className={css(styles.item, styles.link)} to="/miners">Miners</Link>
        <Link className={css(styles.item, styles.link)} to="/settings">Settings</Link>
      </nav>
    );
  }
}

export default Setup;
