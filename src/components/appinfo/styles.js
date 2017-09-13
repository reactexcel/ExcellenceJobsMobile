import { StyleSheet } from 'react-native';
import { HEXCOLOR } from '../../style/hexcolor';


const style = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#9DD6EB',
  },
  headerText: {
    color: HEXCOLOR.WhiteColor,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentText: {
    color: HEXCOLOR.WhiteColor,
    textAlign: 'center',
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
    color: HEXCOLOR.WhiteColor,
    fontSize: 30,
    fontWeight: 'bold',
  },

  info: {
    flex: 0.5,
    alignItems: 'center',
    // padding: 40,
  },
  title: {
    color: HEXCOLOR.WhiteColor,
    fontSize: 30,
    paddingBottom: 20,
  },
  description: {
    color: HEXCOLOR.WhiteColor,
    fontSize: 20,
  },
});

export default style;
