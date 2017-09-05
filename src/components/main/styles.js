import { StyleSheet, Dimensions } from 'react-native';
import { HEXCOLOR } from '../../style/hexcolor';

const { width, height } = Dimensions.get('window');
const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: HEXCOLOR.CloudBurst,
    justifyContent: 'space-around',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  newInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeight: {
    height: 140,
  },
  imageHeight: {
    width,
    flex: 0,
  },
  textinputLabel: {
    marginLeft: 5,
    justifyContent: 'center',
    color: HEXCOLOR.WhiteColor,
  },
  inputStyle: {
    color: HEXCOLOR.WhiteColor,
  },
  buttonText: {
    alignSelf: 'center',
  },
  logo: {
    flex: 1,
    height: 150,
    width: 220,
    alignSelf: 'center',
    // marginTop: 5,
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 70,
  },
  button: {
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  content: {
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    marginLeft: 5,
    justifyContent: 'center',
  },
});

export default style;
