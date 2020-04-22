import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import FriendsStack from './friendsStack';
// import {createAppContainer} from 'react-navigation'

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    // navigationOptions:{
    //     drawerLockMode: 'locked-closed'
    //   }
  },
  Friends: {
    screen: FriendsStack,
    // navigationOptions:{
    //     drawerLockMode: 'locked-closed'
    //   }
  },
});

export default createAppContainer(RootDrawerNavigator);
