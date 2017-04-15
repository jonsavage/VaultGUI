import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UnsealProgressBar from './UnsealProgressBar';

export default class Unseal extends React.Component {
  state = {key: ''};

  handleChange = (event) => {
    this.setState({key: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.onSubmit(this.state.key);
    event.preventDefault();

    this.setState({key: ""});
  };

  render() {
    return (
      <div>
        <h2>Unseal </h2>
        <UnsealProgressBar value={this.props.progress / this.props.threshold * 100}/>
        <label>Key Count:</label>{this.props.keyCount}
        <label>Progress:</label>{this.props.progress}
        <label>Threshold:</label>{this.props.threshold}

        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Key"
            value={this.state.key}
            onChange={this.handleChange}/>
          <RaisedButton
            type="submit"
            label="Submit"
            primary={true}/>
        </form>
      </div>
    );
  }
}
