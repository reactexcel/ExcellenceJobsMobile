import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
import { HEXCOLOR } from '../../style/hexcolor';

module.exports = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    // margin: 5,
    flex: 1,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    height: (Platform.OS === 'ios') ? height - 390 : 250,
    borderWidth: 0.5,
    borderColor: HEXCOLOR.GreyColor,
    borderRadius: 2,
    elevation: 10,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  iconCricle: {
    borderRadius: 40,
    paddingTop: 10.5,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'white',
  },
  openMap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  mapIconColor: {
    color: HEXCOLOR.CloudBurst,
    fontSize: 23,
  },
});
