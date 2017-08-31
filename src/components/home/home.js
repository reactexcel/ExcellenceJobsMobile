/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ListItem, Text, Body, Right, Icon } from 'native-base';
import { View, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';
import style from './styles';
import MapMarker from '../map/map';
import EditForm from '../modal/modal';

class HomePage extends Component {
  render() {
    const renderHeader = () => (
      <View>
        <Text style={style.contentHeader}>
          Registration ID : {this.props.username.registration_id}
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ fontSize: 19 }}>Mobile No. :- </Text>
          <Text style={{ fontSize: 16, marginTop: 3 }}>
            {this.props.username.mobile_no !== null ? this.props.username.mobile_no : 'Update Your Mobile Number'}
          </Text>
          <Icon style={{ marginLeft: 5 }} onPress={() => { this.props.showModal(); }} name="ios-create-outline" />
        </View>
        <View style={style.viewContainer}>
          <Text style={style.titleText}>
            Application Status
          </Text>
        </View>
        <EditForm
          modal={this.props.modal}
          closeModal={this.props.closeModal}
          numberSubmit={this.props.numberSubmit}
          handleNumberChange={this.props.handleNumberChange}
          number={this.props.number}
        />
      </View>
    );
    const renderFooter = () => (
      <View style={style.mapContainer}>
        <MapMarker {...this.props} openMap={this.props.openMap} />
      </View>
    );
    return (
      <View style={style.mainContainer}>
        <View>
          <FlatList
            keyExtractor={item => item.text}
            data={this.props.userinfo}
            refreshing={this.props.refreshing}
            onRefresh={() => { this.props.handleRefresh(); }}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            renderItem={({ item, index }) => (<View style={{ flex: 1 }}>
              <View >
                <ListItem key={index} onPress={() => { this.props.onListItemPress(item); }} style={item.status == '1' ? style.selectedlistitem : style.listitem} >
                  <Body>
                    <Text>{item.text}</Text>
                    <Text note>{item.scheduled_date} {item.scheduled_date.length > 0 ? 'at' : null } {item.scheduled_time}</Text>
                  </Body>
                  {item.status == '1' ?
                    <Right style={style.listright}>
                      <Icon name="star" active style={style.selected} />
                    </Right> : null}
                </ListItem>
              </View>
              {this.props.isClicked == true && item.status == '1' ? <View style={style.itemDetails}>
                <TouchableWithoutFeedback onPress={() => { this.props.onListItemPress(item); }}>
                  <View style={style.viewMargin}>
                    <Text style={style.jobtitle}>
                       Job Description
                    </Text>
                    <Text style={style.viewMargin} >{item.info}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View> : null}
            </View>)}
          />
        </View>
      </View>
    );
  }
}

export default HomePage;
