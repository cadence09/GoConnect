import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeStack from './homeStack';
import { createAppContainer } from 'react-navigation';
import FriendsStack from './friendsStack';
// import {createAppContainer} from 'react-navigation'

const RootDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:HomeStack
    },
    Friends :{
        screen:FriendsStack
    }
})

export default createAppContainer(RootDrawerNavigator)