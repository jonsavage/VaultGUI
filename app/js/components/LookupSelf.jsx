import React from 'react';
import ReactDOM from 'react-dom';

export default class LookupSelf extends React.Component {

  componentWillMount() {
    this.lookupSelf();
  }

  state = {
    self: ''
  }

  lookupSelf = () => {
    this.props.tokenLookupSelf()
      .then((result) => {
        this.setState({self: JSON.stringify(result, null, 4)});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <pre>
        <code>
          {this.state.self}
        </code>
      </pre>
    );
  }
}
