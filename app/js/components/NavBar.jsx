import React from 'react';
import ReactDOM from 'react-dom';

import FontIcon from 'material-ui/FontIcon';

function BooleanStatus(props) {
  const value = props.value;
  if (value) {
    return <FontIcon className="material-icons">check</FontIcon>;
  }
  return <FontIcon className="material-icons">close</FontIcon>;
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        <li>
          <label for="isConnected">Is Connected:</label>
          <BooleanStatus value={this.props.isConnected}/>
        </li>
        <li>
          <label for="isAuthenticated">Is Authenticated:</label>
          <BooleanStatus value={this.props.isAuthenticated}/>
        </li>
        <li>
          <label for="status">Is Sealed:</label>
          <BooleanStatus value={this.props.isSealed}/>
        </li>
      </ul>
    );
  }
}

export default NavBar;
