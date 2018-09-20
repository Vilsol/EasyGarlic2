import React, { Component } from 'react';

class Setup extends Component {
  render() {
    return (
      <div id="Setup">
        <form>
          <div>
            <label htmlFor="address">
              Address:
              <input id="address" type="text" name="address" autoComplete="off" />
            </label>
          </div>
          <div>
            <label htmlFor="pool">
              Pool:
              <input id="pool" type="text" name="pool" autoComplete="off" />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Setup;
