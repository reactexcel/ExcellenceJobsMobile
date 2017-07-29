import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentHeader: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16.5,
    // fontWeight: 'bold',
    color: 'grey',
    marginBottom: 10,
  },
  listitem: {
    marginLeft: 0,
  },
  selectedlistitem: {
    flex: 1,
    marginLeft: 0,
    backgroundColor: '#87D37C',
  },
  listright: {
    marginBottom: 10,
  },
  selected: {
    color: '#446CB3',
  },
  titleText: {
    margin: 12,
    fontWeight: 'bold',
  },
  viewBorder: {
    borderWidth: 3,
    borderColor: '#BDC3C7' },
});
