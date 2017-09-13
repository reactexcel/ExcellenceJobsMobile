import React, { Component } from 'react';
import { Alert, View, Text, Dimensions, Image, StatusBar } from 'react-native';
import AppIntro from 'react-native-app-intro';
import style from './styles';
import { HEXCOLOR } from '../../style/hexcolor';

const { width, height } = Dimensions.get('window');


class AppInfo extends Component {
  render() {
    return (
      <View>
        <AppIntro
          onDoneBtnClick={this.props.doneBtnHandle}
          onSkipBtnClick={this.props.onSkipBtnHandle}
          onSlideChange={this.props.onSlideChangeHandle}
          defaultIndex={this.props.index}
        >
          <View style={[style.slide, { backgroundColor: HEXCOLOR.Orange }]}>
            <View
              style={{
                position: 'absolute',
                top: 20,
                left: 10,
                width,
                height,
              }}
              level={10}
            >
              <Image
                style={{ height: 59 * 1.0,
                  width: 209 * 1.5 }}
                source={require('../../image/logo.png')}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: 84,
                left: 20,
                width,
                height,
              }}
              level={10}
            >
              <Image
                style={{ height: 150 * 1.0,
                  width: 200 * 1.5 }}
                source={require('../../image/mainpage.png')}
              />
            </View>
            <View style={{ marginBottom: 105, justifyContent: 'center' }}>
              <View ><Text style={style.headerText}>Welcome To Excellence Jobs</Text></View>
              <View style={{ marginTop: 5 }}>
                <Text style={style.contentText}>
                Excellence Jobs is used to provide information to the candidate regarding the application status for the respective profile they have applied for.
                </Text>
              </View>
            </View>
          </View>
          <View style={[style.slide, { backgroundColor: HEXCOLOR.Blue }]}>
            <View
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                width,
                height,
              }}
              level={10}
            >
              <Image
                style={{ height: 300 * 1.0,
                  width: 200 * 1.5 }}
                source={require('../../image/mail.png')}
              />
            </View>
            <View style={{ marginBottom: 105, justifyContent: 'center' }}>
              <View ><Text style={style.headerText}>Mails</Text></View>
              <View style={{ marginTop: 5 }}>
                <Text style={style.contentText}>
                Mail your query to HR regarding your Job profile or interview details.
                </Text>
              </View>
            </View>
          </View>
          <View style={[style.slide, { backgroundColor: HEXCOLOR.LightGreen }]}>

            <View
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                width,
                height,
              }}
              level={10}
            >
              <Image
                style={{ height: 345,
                  width: 300 }}
                source={require('../../image/notify.png')}
              />
            </View>
            <View style={{ marginBottom: 105, justifyContent: 'center' }}>
              <View ><Text style={style.headerText}>Notifications</Text></View>
              <View style={{ marginTop: 5 }}>
                <Text style={style.contentText}>
                Get notifications for interview round and selection proccess.
                </Text>
              </View>
            </View>
          </View>
          <View style={[style.slide, { backgroundColor: HEXCOLOR.CloudBurst }]}>
            <View
              style={{
                position: 'absolute',
                top: 55,
                left: 5,
                width,
                height,
              }}
              level={10}
            >
              <Image
                style={{ height: 180,
                  width: 320 }}
                source={require('../../image/calling.png')}
              />
            </View>
            <View style={{ marginBottom: 105, justifyContent: 'center' }}>
              <View ><Text style={style.headerText}>Phone Call</Text></View>
              <View style={{ marginTop: 5 }}>
                <Text style={style.contentText}>
                Talk to HR directly.
                </Text>
              </View>
            </View>
          </View>
        </AppIntro>
      </View>
    );
  }
}

export default AppInfo;
