import { createStackNavigator } from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation'
import Home from '../screens/home';
import Friends from '../screens/friends';
import ShareMessage from '../screens/shareMessage';
import TakePhoto from '../screens/camera';
import Login from '../screens/login';
import SignUp from '../screens/signUp';

const screens = {
  Login: {
    screen: Login,
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
  },
};
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: 'yellow',
    headerStyle: { backgroundColor: 'blue' },
  },
});

export default HomeStack;
// export default createAppContainer(HomeStack)
