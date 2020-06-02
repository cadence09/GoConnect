import React from 'react';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {
  SafeAreaView, View, TouchableOpacity, Text
} from 'react-native';
import HomeStack from './HomeStack';
import FriendsStack from './FriendsStack';
import LogIn from '../screens/LogIn';

const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack
  },
  Friends: {
    screen: FriendsStack
  }
},
{
  contentComponent: (props) => (
    <View style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={{ marginLeft: 16, fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  ),
});

export default RootDrawerNavigator;
