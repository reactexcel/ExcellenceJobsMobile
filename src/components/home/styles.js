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
    fontSize: 19.5,
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
  buttonText: {
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  contact: {
    fontWeight: 'bold',
    marginBottom: 1,
  },
  contactIcon: {
    color: HEXCOLOR.WhiteColor,
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
  line: {
    borderWidth: 0.5,
    borderColor: 'white',
    marginTop: 4,
    marginBottom: 4,
  },
  callButton: {
    flex: 1,
    // borderRightWidth: 1,
    // borderColor: HEXCOLOR.GreyColor,
    backgroundColor: HEXCOLOR.CloudBurst,
  },
  emailContainer: {
    // flex: 1,
    // paddingBottom: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  emailButton: {
    marginRight: 10,
    marginTop: 30,
    borderRadius: 55,
    width: 50,
    height: 50,
    backgroundColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
