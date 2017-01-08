import React from 'react';
import ReactDOM from 'react-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li>
          <label for="isConnected">Is Connected:</label>
          <label id="isConnected">{this.props.isConnected.toString()}</label>
        </li>
        <li>
          <label for="isAuthenticated">Is Authenticated:</label>
          <label id="isAuthenticated">{this.props.isAuthenticated.toString()}</label>
        </li>
        <li>
          <label for="status">Is Sealed:</label>
          <label id="status">{this.props.isSealed && this.props.isSealed.toString()}</label>
        </li>
      </ul>
    );
  }
}

export default NavBar;
