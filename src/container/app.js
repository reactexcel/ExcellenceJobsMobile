import { StackNavigator } from 'react-navigation';
import MainPage from '../components/main/main';
import Home from '../components/home/home';

const App = StackNavigator({
  Main: { screen: MainPage },
  Home: { screen: Home },
},
{
  headerMode: 'screen',
  navigationOptions: {
    header: null,
  },
},
);
export default App;
