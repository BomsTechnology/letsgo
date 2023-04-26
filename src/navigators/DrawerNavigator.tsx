import React from 'react'
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ 
          drawerPosition: 'left'
         }}
      >
        <Drawer.Screen name="Drawer" component={TabNavigator} options={{headerShown: false}}/>
        <Drawer.Screen name="Menu" component={ProfileScreen} />
      </Drawer.Navigator>
    );
}

export default DrawerNavigator