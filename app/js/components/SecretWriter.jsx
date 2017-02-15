import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SecretWriter extends React.Component {
  state = {
    path: '',
    data: '',
    resultMessage: ''
  }

  handlePathChange = (event) => {
    this.setState({path: event.target.value});
  };

  handleDataChange = (event) => {
    this.setState({data: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.writeSecret(this.state.path, { value: this.state.data })
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
          <TextField
            floatingLabelText="Data"
            hintText="data"
            value={this.state.data}
            onChange={this.handleDataChange}/>
          <RaisedButton
            type="submit"
            label="Create"
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

export default SecretWriter;
