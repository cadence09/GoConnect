import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './HomeStack';
import FriendsStack from './FriendsStack';
// import {createAppContainer} from 'react-navigation'

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Friends: {
    screen: FriendsStack
  }
});


export default createAppContainer(RootDrawerNavigator);
