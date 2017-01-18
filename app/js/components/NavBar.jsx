import React from 'react';
import ReactDOM from 'react-dom';

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

function BooleanStatus(props) {
  const value = props.value;
  if (value) {
    return <FontIcon className="material-icons">check</FontIcon>;
  }
  return <FontIcon className="material-icons">close</FontIcon>;
}

class NavBar extends React.Component {

  render() {
    const canSeal = this.props.isConnected
                      && this.props.isAuthenticated
                      && !this.props.isSealed;

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
          <RaisedButton
            label="Seal"
            disabled={!canSeal}
            onClick={this.props.sealHandler}/>
        </li>

      </ul>
    );
  }
}

export default NavBar;
