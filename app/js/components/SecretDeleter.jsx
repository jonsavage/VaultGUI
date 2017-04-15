import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class SecretDeleter extends React.Component {
  state = {
    path: '',
    resultMessage: ''
  }

  handlePathChange = (event) => {
    this.setState({path: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.deleteSecret(this.state.path)
      .then((result) => {
        this.setState({resultMessage: 'success'});
      })
      .catch((err) => {
        this.setState({resultMessage: err.toString()});
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Path"
            hintText="path/to/<key>"
            value={this.state.path}
            onChange={this.handlePathChange}/>
          <RaisedButton
            type="submit"
            label="Delete"
            primary={true}/>
        </form>
        <pre>
          <code>
            {this.state.resultMessage}
          </code>
        </pre>
      </div>
    );
  }
}
