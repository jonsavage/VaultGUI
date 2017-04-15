import React from 'react';
import ReactDOM from 'react-dom';

import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class RootTokenAuthentication extends React.Component {
  state = {
    token: '',
    snackbar: {
      open: false,
      message: ''
    }
  };

  handleChange = (event) => {
    this.setState({token: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.token)
      .then((result) => console.log(result))
      .catch((err) =>
        this.setState(
          {
            snackbar: {
              open: true,
              message: "Invalid Token"
            }
          }));

    event.preventDefault();
  };

  handleSnackbarRequestClose = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  };

  render() {
    return (
      <div>
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
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarRequestClose}/>
      </div>
    );
  }
}
