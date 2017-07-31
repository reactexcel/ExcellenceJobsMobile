import { StyleSheet } from 'react-native';
import '../../style/string';

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: STRING.CloudBurst,
  },
  drawerLogo: {
    flex: 1,
    height: 180,
    width: 175,
    alignSelf: 'center',
  },
  drawerText: {
    fontSize: 16,
    color: STRING.WhiteColor,
  },
});
export default style;
