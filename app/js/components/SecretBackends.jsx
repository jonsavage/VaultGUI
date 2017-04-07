import React from 'react';
import ReactDOM from 'react-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


export default class SecretBackends extends React.Component {
  state = {
    path: '',
    mounts: ''
  }

  componentWillMount = () => {
    this.loadMounts();
  };

  loadMounts = () => {
    this.props.getMounts()
      .then((result) => {
        this.setState({mounts: JSON.stringify(result, null, 4)});
      });
  };

  handlePathChange = (event) => {
    this.setState({path: event.target.value});
  };

  mountSecretBackend = () => {
    this.props.mountSecretBackend(this.state.path)
      .then(() => this.loadMounts())
      .catch((err) => {
        console.log(err);
      });
  };

  unmountSecretBackend = () => {
    this.props.unmountSecretBackend(this.state.path)
    .then(() => this.loadMounts())
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <div>
          <TextField
            floatingLabelText="Mount Point"
            value={this.state.path}
            onChange={this.handlePathChange}/>
          <RaisedButton
            label="Create"
            primary={true}
            onTouchTap={this.mountSecretBackend}/>
          <RaisedButton
            label="Delete"
            primary={true}
            onTouchTap={this.unmountSecretBackend}/>
        <pre>
          <code>
            {this.state.mounts}
          </code>
        </pre>
      </div>
    );
  }
}
