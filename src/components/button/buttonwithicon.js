import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';

class IconWithButton extends Component {
  render() {
    return (
      <Button full style={this.props.style.callButton} onPress={this.props.handlePress} >
        <Icon name={this.props.iconName} style={this.props.style.contactIcon} />
        {/* <Text style={this.props.style.contact} > {this.props.textContent}</Text> */}
      </Button>
    );
  }
}

export default IconWithButton;
