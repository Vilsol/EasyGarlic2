import { css, StyleSheet } from 'aphrodite';
import React, { ReactNode } from 'react';

import Navbar from 'App/Components/Navbar';
import Colors from 'Models/Colors';

interface IProps {
  children?: ReactNode;
}

const styles = StyleSheet.create({
  main: {
    color: Colors.textBlack,
    // Top needs to be pushed down by the navbar
    marginTop: '3.375em',
    padding: '0.25em 1em',
  },
});

class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="App">
        <Navbar />
        <main className={css(styles.main)}>{this.props.children || ''}</main>
      </div>
    );
  }
}

export default App;
