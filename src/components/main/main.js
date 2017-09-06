import React, { Component } from 'react';
import { Image, View, ActivityIndicator, StatusBar, Animated, Easing, TouchableHighlight } from 'react-native';
import { Text, Button, Item, Input, Label, Form, Icon } from 'native-base';
import style from './styles';
import { HEXCOLOR } from '../../style/hexcolor';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      call: false,
    },
    this.springValue = new Animated.Value(0.3);
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
  }
  componentWillReceiveProps(props) {
    if (props.isAvailable && !this.state.call) {
      this.animate();
      this.setState({ call: true });
    }
  }
  animate() {
    this.animatedValue1.setValue(0);
    this.animatedValue2.setValue(0);
    const createAnimation = function (value, duration, easing, delay = 1200) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay,
        },
      );
    };
    Animated.parallel([
      createAnimation(this.animatedValue1, 1000, Easing.ease),
      createAnimation(this.animatedValue2, 50, Easing.ease, 2000),
    ]).start();
  }
  render() {
    const scaleText = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0.01, 0.95],
    });
    const introButton = this.animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [220, 0],
    });
    return (
      <View style={style.outerContainer}>
        <StatusBar backgroundColor={HEXCOLOR.PickledBluewood} barStyle="light-content" />
        <View style={style.innerContainer}>
          <Animated.View style={{ top: introButton, position: 'absolute' }}>
            <TouchableHighlight onPress={() => { this.animate(); }} >
              <Animated.Image
                resizeMode="contain"
                style={{
                  flex: 1,
                  height: 150,
                  width: 220,
                  alignSelf: 'center',
                }}
                source={require('../../image/logo.png')}
              />
            </TouchableHighlight>
          </Animated.View>
          {this.props.isAvailable ? (<Animated.View style={{ transform: [{ scale: scaleText }], marginLeft: 10, marginRight: 20, marginTop: 128 }}>
            <Form>
              <Item floatingLabel >
                <Icon
                  name="ios-contact-outline"
                  style={{ color: 'white', marginTop: 2.5 }}
                />
                <Label style={{ marginLeft: 5, paddingTop: 1.8, justifyContent: 'center', color: HEXCOLOR.WhiteColor }}> Registration No </Label>
                <Input
                  style={style.inputS_handleSubmittyle}
                  value={this.props.registrationid}
                  onSubmitEditing={() => { this.props.handleKeyboardSubmit(); }}
                  onChangeText={(text) => { this.props.changeId(text); }}
                />

              </Item>
              <Button rounded style={style.button} onPress={() => { this.props.handleSubmit(); }} >
                <Text style={style.buttonText}>Go</Text>
              </Button>
            </Form>
          </Animated.View>) :
            (
              this.props.bundle ?
                <View style={{ marginTop: 320 }}>
                  <ActivityIndicator animating color={HEXCOLOR.BahamaBlue} size="large" />
                </View> :
                <View style={[{ marginTop: 320 }, this.state.call && { marginTop: 150 }]}>
                  <ActivityIndicator animating color={HEXCOLOR.BahamaBlue} size="large" />
                </View>
            )
          }
        </View>
      </View>
    );
  }
}
export default MainPage;
