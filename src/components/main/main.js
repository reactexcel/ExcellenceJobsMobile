import React, { Component } from 'react';
import { Image, View, ActivityIndicator, StatusBar } from 'react-native';
import { Text, Button, Item, Input, Label, Form } from 'native-base';
import style from './styles';
import * as action from '../../action/actions';
import { HEXCOLOR } from '../../style/hexcolor';

class MainPage extends Component {
  render() {
    return (
      <View style={style.outerContainer}>
        <StatusBar backgroundColor={HEXCOLOR.PickledBluewood} barStyle="light-content" />
        <View style={style.innerContainer}>
          <View style={style.viewHeight} >
            <Image source={require('../../image/logo.jpg')} resizeMode="contain" style={style.logo} />
          </View>
          {this.props.isAvailable ? (<View style={style.content}>
            <Form>
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center', color: HEXCOLOR.WhiteColor }}> Enter Your Email</Label>
                <Input style={style.inputStyle} value={this.props.email} onChangeText={(text) => { this.props.changeText(text); }} />
              </Item>
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center', color: HEXCOLOR.WhiteColor }}> Registration Id </Label>
                <Input style={style.inputStyle} value={this.props.registrationid} onChangeText={(text) => { this.props.changeId(text); }} />
              </Item>
              <Button rounded style={style.button} onPress={() => { this.handleSubmit(); }} >
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
