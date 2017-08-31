import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { Text, Button, Icon, Item, Input, Label, Form } from 'native-base';

class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
    };
  }
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.props.modal}
          onRequestClose={() => { this.props.closeModal(); }}
        >
          <View
            style={{
              marginTop: 220,
              marginBottom: 90,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 5,
              backgroundColor: 'white',
            }}
            elevation={3}
          >
            <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 18 }}>Update Mobile Number</Text>
            <Form>
              <Item floatingLabel >
                <Label style={{ marginLeft: 5, justifyContent: 'center' }}> Mobile Number</Label>
                <Input keyboardType="numeric" maxLength={10} value={this.state.number} onChangeText={(number) => { this.setState({ number }); }} />
              </Item>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button transparent onPress={() => { this.props.numberSubmit(this.state.number); }}>
                  <Text >Submit</Text>
                </Button>
                <Button transparent onPress={() => { this.props.closeModal(); }}>
                  <Text >Cancel</Text>
                </Button>
              </View>
            </Form>

          </View>
        </Modal>
      </View>
    );
  }
}

export default EditForm;
