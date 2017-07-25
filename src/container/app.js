import { StackNavigator } from 'react-navigation';
import MainPage from '../components/main/main';
import Main from './router';

const App = StackNavigator({
  Main: { screen: MainPage },
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
