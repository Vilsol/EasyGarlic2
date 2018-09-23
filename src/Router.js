import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'App';
import Setup from 'Views/Setup';
import Miners from 'Views/Miners';
import AddMiner from 'Views/AddMiner';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route exact path="/" component={Setup} />
          <Route exact path="/miners" component={Miners} />
          <Route exact path="/add-miner" component={AddMiner} />
        </App>
      </BrowserRouter>
    );
  }
}

export default Router;
