import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class RootTokenAuthentication extends React.Component {
  state = {token: ''};

  handleChange = (event) => {
    this.setState({token: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.token);
    event.preventDefault();
  };

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Root Token"
            value={this.state.token}
            onChange={this.handleChange}/>
          <RaisedButton
            type="submit"
            label="Connect"
            primary={true}/>
        </form>
    );
  }
}

export default RootTokenAuthentication;
