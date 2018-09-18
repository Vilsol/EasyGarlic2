import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  title: {
    color: '#333',
    'font-family': 'sans-serif',
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className={`App-title ${css(styles.title)}`}>Easy Garlic</h1>
        </header>
      </div>
    );
  }
}

export default App;
