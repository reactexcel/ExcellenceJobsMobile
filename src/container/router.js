import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import WelcomePage from './welcome';
import DrawerContent from '../components/drawer/drawercontent';


const Main = DrawerNavigator({
  home: { screen: WelcomePage },
},
  {
    drawerWidth: 250,
    drawerPosition: 'right',
    contentComponent: props => <DrawerContent {...props} />,
  });

export default Main;
