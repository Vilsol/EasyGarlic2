import { css, StyleSheet } from 'aphrodite';
import React, { ReactNode } from 'react';

import Navbar from 'App/Components/Navbar';
import Colors from 'Services/Colors';

interface IAppProps {
  children?: ReactNode;
}

const styles = StyleSheet.create({
  main: {
    color: Colors.textBlack,
    // Top needs to be pushed down by the navbar
    marginTop: '3.375em',
  },
});

class App extends React.Component<IAppProps> {
  public render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Navbar />
        <main className={css(styles.main)}>{children || ''}</main>
      </div>
    );
  }
}

export default App;
