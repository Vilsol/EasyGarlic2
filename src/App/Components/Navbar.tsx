import { css, StyleSheet } from 'aphrodite';
import React from 'react';
import { Link } from 'react-router-dom';

import Colors from 'Models/Colors';

const styles = StyleSheet.create({
  fixed: {
    position: 'fixed',
    top: 0,
  },
  item: {
    color: Colors.primary,
    fontWeight: 'bold',
    textDecoration: 'none',
    userSelect: 'none',

    marginBottom: '1em',
    marginLeft: '1em',
    marginRight: '1em',
    marginTop: '1.25em',
  },
  lastOnLeft: {
    marginRight: 'auto',
  },
  link: {
    ':hover': {
      color: Colors.primaryDarker,
    },
    cursor: 'pointer',
  },
  nav: {
    backgroundColor: Colors.textBlack,
    minHeight: '1.5em',
    width: '100%',

    display: 'flex',
  },
});

class Navbar extends React.Component {
  public render() {
    return (
      <nav
        id="Navbar"
        className={css(styles.nav, styles.fixed)}
        aria-label="main navigation"
      >
        <Link
          className={css(styles.item, styles.link, styles.lastOnLeft)}
          to="/"
        >
          EasyGarlic
        </Link>
        <Link className={css(styles.item, styles.link)} to="/">
          Mining
        </Link>
        <Link className={css(styles.item, styles.link)} to="/miners">
          Miners
        </Link>
        <Link className={css(styles.item, styles.link)} to="/settings">
          Settings
        </Link>
      </nav>
    );
  }
}

export default Navbar;
