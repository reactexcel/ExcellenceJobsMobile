import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { HEXCOLOR } from '../../style/hexcolor';

module.exports = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 11,
    width: width - 12,
    height: height - 435.5,
    borderWidth: 0.5,
    borderColor: HEXCOLOR.GreyColor,
    borderRadius: 2,
    elevation: 10,
  },
  map: {
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  openMap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 160,
    marginRight: 15,
  },
  mapIconColor: {
    color: HEXCOLOR.CloudBurst,
  },
});
