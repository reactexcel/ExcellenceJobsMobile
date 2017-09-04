import { StackNavigator } from 'react-navigation';
import LoginPage from './login';
import WelcomePage from './welcome';

const Root = StackNavigator({
  Main: { screen: LoginPage },
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
