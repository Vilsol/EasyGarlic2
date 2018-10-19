import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from 'App/Home/Home';

class Router extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" component={Home} />
      </BrowserRouter>
    );
  }
}

export default Router;
