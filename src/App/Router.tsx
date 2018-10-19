import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'App/App';
import Miners from 'App/Views/Miners';
import Mining from 'App/Views/Mining';

class Router extends Component {
  public render() {
    return (
      <BrowserRouter>
        <App>
          <Route exact={true} path="/" component={Mining} />
          <Route exact={true} path="/miners" component={Miners} />
        </App>
      </BrowserRouter>
    );
  }
}

export default Router;
