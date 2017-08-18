/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ListItem, Text, Body, Right, Icon, Card, CardItem } from 'native-base';
import { View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import style from './styles';
import MapMarker from '../map/map';

class HomePage extends Component {
  render() {
    const renderHeader = () => (
      <View>
        <Text style={style.contentHeader}>
        Registration ID : {this.props.username.registration_id}
        </Text>
        <View style={style.viewContainer}>
          <Text style={style.titleText}>
        Application Status
          </Text>
        </View>
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
        <View style={style.mapContainer}>
          <MapMarker {...this.props} openMap={this.props.openMap} />
        </View>
      </View>
    );
  }
}

export default HomePage;
