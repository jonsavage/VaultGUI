import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SecretLister extends React.Component {
  state = {
    path: '',
    secretMounts: ''
  }

  handleChange = (event) => {
    this.setState({path: event.target.value});
  };


  handleSubmit = (event) => {
    this.props.listSecrets(this.state.path)
      .then((result) => {
        this.setState({secretMounts: JSON.stringify(result.data, null, 4)});
      })
      .catch((err) => {
        this.setState({secretMounts: err.toString()});
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Path"
            hintText="path/to/mountpoint"
            value={this.state.path}
            onChange={this.handleChange}/>
          <RaisedButton
            type="submit"
            label="Read"
            primary={true}/>
        </form>
        <pre>
          <code>
            {this.state.secretMounts}
          </code>
        </pre>
      </div>
    );
  }
}

export default SecretLister;
