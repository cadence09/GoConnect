import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeStack from './HomeStack';
import FriendsStack from './FriendsStack';


const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Friends: {
    screen: FriendsStack
  }
});

export default RootDrawerNavigator;
