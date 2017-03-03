'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
import {Treebeard} from 'react-treebeard';

import styles from './Styles/SecretsTree';

class NodeViewer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let json = "";
    if (this.props.node && this.props.node.content) {
      json = JSON.stringify(this.props.node.content, null, 4);
    }

    let path = "";
    if (this.props.node && this.props.node.path) {
      path = JSON.stringify(this.props.node.path, null, 4);
    }
    return (
      <div>
        <p>
          Path: <code> {" " + path} </code>
        </p>
        <div style={styles.viewer.base}>
          {json}
        </div>
      </div>
    );
  }
}

NodeViewer.propTypes = {
  node: React.PropTypes.object
};

export default class SecretsTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.loadMounts();
  }

  loadMounts = () => {
    this.props.getMounts().then((result) => {
      var keys = Object.keys(result);
      for (var i = 0; i < keys.length; i++) {
        var name = keys[i];
        var newParentNode = this.constructNewParent(name, name);
        this.injectRootNodeIntoTree(newParentNode);
      }
    });
  };

  injectRootNodeIntoTree = (rootToAdd) => {
    var data = this.state.data;
    data.push(rootToAdd);
    this.setState(data : data);
  }

  loadSecret = (node) => {
    this.props.getSecrets(node.path).then((result) => {
      node.content = result.data;
      this.triggerTreeReload();
    }).catch((err) => {
      console.log("error");
    });
  }

  loadChildren = (node) => {
    this.props.listSecrets(node.path).then((result) => {
      var keys = result.data.keys;
      for (var i = 0; i < keys.length; i++) {
        var name = keys[i];
        if (this.isParent(name)) {
          var name = keys[i];
          if (!this.nodeContainsChild(node, name)) {
            var newParentNode = this.constructNewParent(name, node.path + name);
            node.children.push(newParentNode);
          }
        } else {
          if (!this.nodeContainsChild(node, name)) {
            var newChildNode = this.constructNewChild(name, node.path + name);
            node.children.push(newChildNode);
          }
        }
      }
      this.setLoadingToFalseForNode(node);
      this.triggerTreeReload();
    }).catch((err) => {
      console.log(err);
      node.contents = err;
      this.setLoadingToFalseForNode(node);
      this.triggerTreeReload();
    });
  }

  setLoadingToFalseForNode = (node) => {
    node.loading = false;
  }

  triggerTreeReload = () => {
    var data = this.state.data;
    this.setState(data : data);
  }

  nodeContainsChild = (node, name) => {
    if (!node.children)
      return false;

    for (var i = 0; i < node.children.length; i++) {
      if (node.children[i].name == name)
        return true;
      }
    }

  constructNewParent = (name, path) => {
    return {name: name, children: [], loading: true, path: path};
  }

  constructNewChild = (name, path) => {
    return {name: name, path: path};
  }

  isParent = (name) => {
    return name.endsWith('/');
  }

  onToggle = (node, toggled) => {
    if (this.nodeIsAParent(node)) {
      this.loadChildren(node);
    }
    this.loadSecret(node);

    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  }

  nodeIsAParent = (node) => {
    return node.children != null;
  }

  render() {
    return (
      <StyleRoot>
        <div style={styles.component}>
            <Treebeard
              data={this.state.data}
              onToggle={this.onToggle}/>
        </div>
        <div style={styles.component}>
          <NodeViewer
            node={this.state.cursor}/>
        </div>
      </StyleRoot>
    );
  }
}
