import { StackNavigator } from 'react-navigation';
import LoginPage from './login';
import Main from './router';

const App = StackNavigator({
  Main: { screen: LoginPage },
  Drawer: { screen: Main },
},
  {
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },
);
export default App;
