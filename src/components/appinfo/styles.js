import { StyleSheet } from 'react-native';
import { HEXCOLOR } from '../../style/hexcolor';


const style = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  headerText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentText: {
    color: '#fff',
    textAlign: 'center',
    // justifyContent: 'center',
    fontSize: 17,
    alignSelf: 'center',
    padding: 5,
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    width: 75 * 2,
    height: 63 * 2,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  info: {
    flex: 0.5,
    alignItems: 'center',
    // padding: 40,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 20,
  },
});

export default style;
