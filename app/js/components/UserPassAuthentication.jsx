import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class UserPassAuthentication extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  };

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.username, this.state.password);
    event.preventDefault();
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.handleUsernameChange}/>
          <TextField
            floatingLabelText="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type="password"/>
          <RaisedButton
            type="submit"
            label="Connect"
            primary={true}/>
        </form>
    );
  }
}

export default UserPassAuthentication;
