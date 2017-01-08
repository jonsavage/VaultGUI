import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ConnectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.url);
    event.preventDefault();
  }

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
