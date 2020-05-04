import { createStackNavigator } from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation'
import Home from '../screens/Home';
import Friends from '../screens/Friends';
import ShareMessage from '../screens/ShareMessage';
import TakePhoto from '../screens/Camera';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import Sharing from '../screens/Sharing';
import FriendsRequest from '../screens/FriendsRequest';

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
  Sharing: {
    screen: Sharing,
  },
  ShareMessage: {
    screen: ShareMessage,
  },
  FriendsRequest: {
    screen: FriendsRequest,
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
