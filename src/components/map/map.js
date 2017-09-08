import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'native-base';
import style from './styles';


class MapMarker extends React.Component {
  render() {
    const osCheck = (Platform.OS === 'ios');
    return (
      <View style={style.mainContainer}>
        <MapView
          style={style.map}
          mapType="standard"
          scrollEnabled
          liteMode={!osCheck}
          initialRegion={{
            latitude: this.props.username.office_location.long,
            longitude: this.props.username.office_location.lat,
            latitudeDelta: 0.0132,
            longitudeDelta: 0.0211,
          }}
        >
          {this.props.marker.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
            />),
          )}
        </MapView>
        <View style={style.openMap}>
          <TouchableOpacity onPress={() => { this.props.openMap(); }}>
            <Icon name="md-locate" style={style.mapIconColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = MapMarker;
