import { StyleSheet } from 'react-native';
import '../../style/string';

module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentHeader: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16.5,
    color: STRING.GreyColor,
    marginBottom: 10,
  },
  listitem: {
    marginLeft: 0,
  },
  selectedlistitem: {
    flex: 1,
    marginLeft: 0,
    backgroundColor: STRING.FeijoaColor,
  },
  listright: {
    marginBottom: 10,
  },
  selected: {
    color: STRING.SanMarino,
  },
  titleText: {
    margin: 12,
    fontWeight: 'bold',
  },
  viewBorder: {
    borderWidth: 3,
    borderColor: STRING.SilverSand,
  },
});
