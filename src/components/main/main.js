import React, { Component } from 'react';
import { Image, View, ActivityIndicator, StatusBar } from 'react-native';
import { Text, Button, Item, Input, Label, Form, Icon } from 'native-base';
import style from './styles';
import { HEXCOLOR } from '../../style/hexcolor';

class MainPage extends Component {
  render() {
    return (
      <View style={style.outerContainer}>
        <StatusBar backgroundColor={HEXCOLOR.PickledBluewood} barStyle="light-content" />
        <View style={style.innerContainer}>
          <View style={style.viewHeight} >
            <Image source={require('../../image/logo.png')} resizeMode="contain" style={style.logo} />
          </View>
          {this.props.isAvailable ? (<View style={style.content}>
            <Form>
              <Item floatingLabel >
                <Icon
                  name="ios-contact-outline"
                  style={{ color: 'white' }}
                />
                <Label style={{ marginLeft: 5, paddingTop: 2, justifyContent: 'center', color: HEXCOLOR.WhiteColor }}> Registration Id </Label>
                <Input
                  style={style.inputStyle}
                  value={this.props.registrationid}
                  onSubmitEditing={() => { this.props.handleKeyboardSubmit(); }}
                  onChangeText={(text) => { this.props.changeId(text); }}
                />

              </Item>
              <Button rounded style={style.button} onPress={() => { this.props.handleSubmit(); }} >
                <Text style={style.buttonText}>Go</Text>
              </Button>
            </Form>
          </View>) : (
            <ActivityIndicator animating color={HEXCOLOR.BahamaBlue} size="large" />
          )}
        </View>
      </View>
    );
  }
}
export default MainPage;
