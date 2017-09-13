import { StackNavigator } from 'react-navigation';
import LoginPage from './login';
import WelcomePage from './welcome';
import AppIntro from './appintro';

const Root = StackNavigator({
  Main: { screen: LoginPage },
  AppIntro: { screen: AppIntro },
  Drawer: { screen: WelcomePage },
},
{
  headerMode: 'screen',
  navigationOptions: {
    header: null,
  },
},
);
export default Root;
