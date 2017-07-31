import { StyleSheet } from 'react-native';
import { HEXCOLOR } from '../../style/hexcolor';

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: HEXCOLOR.CloudBurst,
  },
  drawerLogo: {
    flex: 1,
    height: 180,
    width: 175,
    alignSelf: 'center',
  },
  drawerText: {
    fontSize: 16,
    color: HEXCOLOR.WhiteColor,
  },
});
export default style;
