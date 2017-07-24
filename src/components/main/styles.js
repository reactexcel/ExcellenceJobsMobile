import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  logo: {
    height: 150,
    width: 200,
    alignSelf: 'center',
    marginTop: 40,
    // backgroundColor: 'grey',
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
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  label: {
    marginLeft: 5,
    justifyContent: 'center',
  },
});

export default style;
