import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function BooleanStatus(props) {
  const value = props.value;
  if (value) {
    return <FontIcon className="material-icons">check</FontIcon>;
  }
  return <FontIcon className="material-icons">close</FontIcon>;
}

const Status = (props) => (
  <div style={styles.wrapper}>
    <Chip style={styles.chip}>
      <Avatar icon={<BooleanStatus value={props.isConnected}/>} />
      Connection
    </Chip>

    <Chip style={styles.chip}>
      <Avatar icon={<BooleanStatus value={props.isAuthenticated}/>} />
      Authentication
    </Chip>
    <Chip
      style={styles.chip}
      onRequestDelete={
        props.isConnected
        && props.isAuthenticated
        && !props.isSealed
          ? () => props.handleSeal()
          : null}>
      <Avatar icon={<BooleanStatus value={props.isSealed}/>} />
      Seal Status
    </Chip>
  </div>
);

class AppBarComposition extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="VaultGUI"
          iconElementRight={<Status {...this.props}/>}
        />
      </div>
    );
  }
}

export default AppBarComposition;
