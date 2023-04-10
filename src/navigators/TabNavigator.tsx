import React from 'react'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import NotificationScreen from '../screens/NotificationScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Plan" component={NotificationScreen} />
            <Tab.Screen name="Notification" component={PlanScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator