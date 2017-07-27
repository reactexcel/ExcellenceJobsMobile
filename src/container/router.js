import React from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import HomePage from '../components/home/home';
import DrawerContent from '../components/drawer/drawercontent';


const Main = DrawerNavigator({
  home: { screen: HomePage },
},
{
  drawerWidth: 250,
  drawerPosition: 'right',
  contentComponent: props => <DrawerContent {...props} />,
});

export default Main;
