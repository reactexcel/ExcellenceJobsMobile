import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1e3750',
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
    color: 'white',
  },
  inputStyle: {
    color: 'white',
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
