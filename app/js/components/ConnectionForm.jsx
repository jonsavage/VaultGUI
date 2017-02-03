import React from 'react';
import ReactDOM from 'react-dom';

import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ConnectionForm extends React.Component {
  state = {
    url: '',
    snackbar: {
      open: false,
      message: ''
    }
  };

  handleChange = (event) => {
    this.setState({url: event.target.value});
  };

  handleSnackbarRequestClose = () => {
    this.setState({
      snackbar: {
        open: false,
        message: ''
      }
    });
  };

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.url)
      .catch((err) =>
        this.setState(
          {
            snackbar: {
              open: true,
              message: err
            }
          }));

    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Server Url"
            hintText="http://vaultserver.com:8200"
            value={this.state.url}
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

export default ConnectionForm;
