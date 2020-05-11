import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeStack from './HomeStack';
import FriendsStack from './FriendsStack';
import LogIn from '../screens/LogIn';
// import {createAppContainer} from 'react-navigation'

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Friends: {
    screen: FriendsStack
  }

});
// const AppNavigator = createSwitchNavigator(
//   {
//      Auth: {
//       screen: LogIn,
//     },
//     App: RootDrawerNavigator,
//     // Auth: {
//     //   screen: LogIn,
//     // },
//   }
//   // ,
//   // {
//   //   initialRouteName: 'Auth',
//   // },
// );

export default createAppContainer(RootDrawerNavigator);
// export default createAppContainer(AppNavigator);