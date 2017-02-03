import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ConnectionForm extends React.Component {
  state = {url: ''};

  handleChange = (event) => {
    this.setState({url: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.url)
      .catch((err) => console.log(err));

    event.preventDefault();
  };

  render() {
    return (
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
    );
  }
}

export default ConnectionForm;
