import { createStackNavigator } from 'react-navigation-stack';
import Friends from '../screens/Friends';

const screens = {
  Friends: {
    screen: Friends
  }
};

const FriendsStack = createStackNavigator(screens);
export default FriendsStack;
