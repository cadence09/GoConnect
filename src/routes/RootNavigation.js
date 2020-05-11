import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import RootDrawerNavigator from './Drawers';
const AppStack = createStackNavigator({
    Login: {
      screen: LogIn,
      
    },
  SignUp: {
    screen: SignUp,
  },
    Drawer: {
      screen: RootDrawerNavigator,
     
    }
  });

export default createAppContainer(AppStack);

// {
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: '#59AFD2'
//     },
//   }
// }