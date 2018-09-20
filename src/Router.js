import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'App';
import Setup from 'Views/Setup';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Route exact path="/" component={Setup} />
        </App>
      </BrowserRouter>
    );
  }
}

export default Router;
