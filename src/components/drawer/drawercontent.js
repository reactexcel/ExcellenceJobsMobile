import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Icon } from 'native-base';

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
};
class DrawerContent extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1 }}>
          <Button transparent info>
            <Text style={{ fontSize: 16 }}>Change Email</Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default DrawerContent;
