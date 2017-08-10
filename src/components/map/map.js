import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('window');
import { Button, Icon } from 'native-base';
import style from './styles';

class MapMarker extends React.Component {
  render() {
    return (
      <View style={style.mainContainer}>
        <MapView
          style={style.map}
          mapType="standard"
          scrollEnabled={false}
          showsMyLocationButton
          initialRegion={{
            latitude: 28.5959817,
            longitude: 77.325999,
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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 200, marginRight: 15 }}>
          <TouchableOpacity onPress={() => { this.props.openMap(); }}>
            <Icon name="md-map" style={{ color: '#1e3750' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = MapMarker;
