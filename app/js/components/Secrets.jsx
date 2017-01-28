import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Secrets extends React.Component {
  state = {
    mountPoint: '',
    secrets: ''
  }

  handleChange = (event) => {
    this.setState({mountPoint: event.target.value});
  };

  handleSubmit = (event) => {
    this.props.getSecrets(this.state.mountPoint)
      .then((result) => {
        this.setState({secrets: JSON.stringify(result.data, null, 4)});
      })
      .catch((err) => {
        this.setState({secrets: err.toString()});
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h2>Read Secrets:</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Mount Point"
            hintText="secret/"
            value={this.state.mountPoint}
            onChange={this.handleChange}/>
          <RaisedButton
            type="submit"
            label="Read"
            primary={true}/>
        </form>
        <pre>
          <code>
            {this.state.secrets}
          </code>
        </pre>
      </div>
    );
  }
}

export default Secrets;
