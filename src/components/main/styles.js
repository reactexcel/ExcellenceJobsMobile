import { StyleSheet } from 'react-native';
import '../../style/string';

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: STRING.CloudBurst,
  },
  innerContainer: {
    flex: 1,
  },
  viewHeight: {
    height: 180,
  },
  textinputLabel: {
    marginLeft: 5,
    justifyContent: 'center',
    color: STRING.WhiteColor,
  },
  inputStyle: {
    color: STRING.WhiteColor,
  },
  buttonText: {
    alignSelf: 'center',
  },
  logo: {
    flex: 1,
    height: 180,
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
    marginTop: 30,
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
