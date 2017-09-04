import { StyleSheet } from 'react-native';
import { HEXCOLOR } from '../../style/hexcolor';

module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContent: {
    margin: 10,
    marginBottom: 8,
    flexDirection: 'row',
  },
  jobTitleDescp: {
    margin: 5,
  },
  contentHeaderTitles: {
    paddingTop: 10,
    paddingLeft: 8,
    fontSize: 18.5,
    color: HEXCOLOR.GreyColor,
  },
  contentHeader: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 8,
    fontSize: 19.5,
    fontWeight: 'bold',
  },
  contentTitle: {
    fontSize: 18.5,
    fontWeight: 'bold',
  },
  contentTitles: {
    paddingLeft: 8,
    fontSize: 18.5,
    color: HEXCOLOR.GreyColor,
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
    margin: 8,
    fontSize: 17.5,
    fontWeight: 'bold',
  },
  mobileTitleText: {
    marginLeft: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  mobilleNumberText: {
    fontSize: 16,
    paddingTop: 1,
    color: HEXCOLOR.GreyColor,
  },
  editIcon: {
    paddingTop: 2,
    marginLeft: 10,
    fontSize: 18.5,
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
    marginLeft: 4.5,
    paddingRight: 3,
    marginRight: 5,
  },
  line: {
    borderWidth: 0.5,
    borderColor: 'white',
    marginTop: 4,
    marginBottom: 4,
  },
  callButton: {
    flex: 1,
    backgroundColor: HEXCOLOR.CloudBurst,
  },
  emailContainer: {
    marginTop: 2,
    flexDirection: 'row',
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
  mapContainer: {
    backgroundColor: 'white',
  },
  viewContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  refresh: {
    flex: 1,
    justifyContent: 'center',
  },
});
