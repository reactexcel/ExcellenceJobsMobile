import React, { Component } from 'react';
import {
  ScrollView,
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { NavigationActions } from 'react-navigation';
import FCM from 'react-native-fcm';

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
};
class DrawerContent extends Component {
  handlechange() {
    const email = { email: '' };
    const data = '';
    AsyncStorage.setItem('user', JSON.stringify(email));
    AsyncStorage.setItem('userdata', JSON.stringify(data));
    FCM.removeAllDeliveredNotifications();
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main' }),
      ],
      key: 'Main',
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Button transparent info onPress={() => { this.handlechange(); }}>
            <Text style={{ fontSize: 16 }}>Change Email</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default DrawerContent;
