import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';

// Garlicoin yellow: #ffca42
// GitHub black (aka Bluck): #24292e

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    minHeight: '1.5em',
    backgroundColor: '#24292e',

    display: 'flex',
  },
  item: {
    color: '#ffca42',
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
      color: '#f0ad00',
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
      <nav id="Navbar" className={css(styles.nav)} aria-label="main navigation">
        <span className={css(styles.item, styles.logo, styles.lastOnLeft)}>EasyGarlic</span>
        <Link className={css(styles.item, styles.link)} to="/">Mining</Link>
        <Link className={css(styles.item, styles.link)} to="/settings">Settings</Link>
        <Link className={css(styles.item, styles.link)} to="/about">About</Link>
      </nav>
    );
  }
}

export default Setup;
