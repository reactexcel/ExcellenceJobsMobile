import React, { Component } from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { Text, Button, Item, Input, Label, Form } from 'native-base';
import styles from './style';
import { HEXCOLOR } from '../../style/hexcolor';

class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
    };
  }
  componentWillMount() {
    const number = this.props.number;
    if (number !== null && number.length === 13) {
      this.setState({ number: number.substr(3, 10) });
    } else {
      this.setState({ number });
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.props.modal}
          onRequestClose={() => { this.props.closeModal(); }}
        >
          <View
            style={styles.form}
            elevation={3}
          >
            <Text style={styles.title}>Update Mobile Number</Text>
            <Form>
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center', paddingTop: 5 }}> Mobile Number</Label>
                <Input keyboardType="numeric" value={this.state.number} onChangeText={(number) => { this.setState({ number }); }} />
              </Item>
              {this.props.isSubmit ?
                <View style={styles.buttonContainer}>
                  <ActivityIndicator animating color={HEXCOLOR.BahamaBlue} size="small" />
                </View>
                :
                <View style={styles.buttonContainer}>
                  <Button transparent onPress={() => { this.props.numberSubmit(this.state.number); }}>
                    <Text >Submit</Text>
                  </Button>
                  <Button transparent onPress={() => { this.props.closeModal(); }}>
                    <Text >Cancel</Text>
                  </Button>
                </View>
              }
            </Form>
          </View>
        </Modal>
      </View>
    );
  }
}

export default EditForm;
