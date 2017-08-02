import { StyleSheet } from 'react-native';
import { HEXCOLOR } from '../../style/hexcolor';


module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentHeader: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16.5,
    color: HEXCOLOR.GreyColor,
    marginBottom: 10,
  },
  listitem: {
    marginLeft: 0,
  },
  selectedlistitem: {
    flex: 1,
    marginLeft: 0,
    borderBottomWidth: 0,
    backgroundColor: HEXCOLOR.FeijoaColor,
  },
  listright: {
    marginBottom: 10,
  },
  selected: {
    color: HEXCOLOR.SanMarino,
  },
  titleText: {
    margin: 12,
    fontWeight: 'bold',
  },
  viewBorder: {
    borderWidth: 3,
    borderColor: HEXCOLOR.SilverSand,
  },
  itemDetails: {
    flex: 1,
    backgroundColor: HEXCOLOR.FeijoaColor,
  },
  jobtitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  viewMargin: {
    marginLeft: 10,
  },
});
