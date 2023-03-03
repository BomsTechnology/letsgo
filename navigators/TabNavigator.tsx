import React from 'react'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlanScreen from '../screens/PlanScreen';
import NotificationScreen from '../screens/NotificationScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator>
            <Tab.Screen name="Tab" component={HomeScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Notification" component={PlanScreen} />
            <Tab.Screen name="Plan" component={NotificationScreen} />
        </Tab.Navigator>
    )
}

export default TabNavigator