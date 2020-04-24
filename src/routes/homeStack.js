import { createStackNavigator } from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation'
import Home from '../screens/home';
import Friends from '../screens/friends';
import ShareMessage from '../screens/shareMessage';
import TakePhoto from '../screens/camera';
import LogIn from '../screens/Login';
import SignUp from '../screens/SignUp';

const screens = {
  Login: {
    screen: LogIn,
  },
  SignUp: {
    screen: SignUp,
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'homepage',
      headerStyle: { backgroundColor: 'pink' },
    },
  },
  TakePhoto: {
    screen: TakePhoto,
  },
  ShareMessage: {
    screen: ShareMessage,
  },
  Friends: {
    screen: Friends,
    headerStyle: { backgroundColor: 'pink' }
  }
};
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'yellow',
    headerStyle: { backgroundColor: 'blue' },
  },
  headerStyle: { backgroundColor: 'blue' }
},
{ initialRouteName: 'LogIn' });
export default HomeStack;
// export default createAppContainer(HomeStack)
