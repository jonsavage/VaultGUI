import React from 'react';
import ReactDOM from 'react-dom';

export default class Policies extends React.Component {
  componentWillMount() {
    this.loadPolicies();
  }

  state = {
    policies: '',
  }

  loadPolicies = () => {
    console.log("loadong policies");
    this.props.getPolicies()
      .then((result) => {
        console.log(result);
        this.setState({policies: JSON.stringify(result, null, 4)});
      });
  };

  render() {
    return (
      <pre>
        <code>
          {this.state.policies}
        </code>
      </pre>
    );
  }
}
