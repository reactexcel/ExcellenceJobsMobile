/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ListItem, Text, Body, Right, Icon } from 'native-base';
import { View, FlatList, TouchableWithoutFeedback, ActivityIndicator, TouchableOpacity } from 'react-native';
import style from './styles';
import MapMarker from '../map/map';
import EditForm from '../modal/modal';
import { HEXCOLOR } from '../../style/hexcolor';

class HomePageIos extends Component {
  render() {
    const renderHeader = () => (
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={style.contentHeader}>
            Registration ID :
          </Text>
          <Text style={style.contentHeaderTitles} >
            {this.props.username.registration_id}
          </Text>
        </View>
        <TouchableOpacity onPress={() => { this.props.onJobTitlePress(); }} >
          <View style={style.headerContent} >
            <Text style={style.contentTitle}>
              Job Title :
            </Text>
            <Text style={style.contentTitles}>
              {this.props.username.job_title}
            </Text>
          </View>
        </TouchableOpacity>
        {this.props.jobTitle ? <View style={style.jobTitleDescp}>
          <Text style={style.viewMargin}>
            {this.props.username.job_description}
          </Text>
        </View> : null}
        <View style={style.emailContainer}>
          <Text style={style.mobileTitleText}>Mobile No :  </Text>
          <Text style={style.mobilleNumberText}>
            {this.props.username.mobile_no !== null ? this.props.username.mobile_no : 'Update Your Mobile Number'}
          </Text>
          <Icon style={style.editIcon} onPress={() => { this.props.showModal(); }} name="md-create" />
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
          isSubmit={this.props.isSubmit}
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
        {this.props.refresh ?
          <View style={style.refresh}>
            <ActivityIndicator animating color={HEXCOLOR.BahamaBlue} size="large" />
          </View>
          :
          <View>
            <FlatList
              keyExtractor={item => item.text}
              data={this.props.userinfo}
              keyboardShouldPersistTaps="always"
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
                      </Right> : <Right style={style.listright}>
                        <Icon name="md-checkmark-circle-outline" active style={style.selected} />
                      </Right> }
                  </ListItem>
                </View>
                {this.props.isClicked == true && item.status == '1' ? <View style={style.itemDetails}>
                  <TouchableWithoutFeedback onPress={() => { this.props.onListItemPress(item); }}>
                    <View style={style.viewMargin}>
                      <Text style={style.jobtitle}>
                      Interview Details
                      </Text>
                      <Text style={style.viewMargin} >{item.info}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View> : null}
              </View>)}
            />
          </View>
        }
      </View>
    );
  }
}

export default HomePageIos;
