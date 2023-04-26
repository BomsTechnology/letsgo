import React from 'react'
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import PlanScreen from '@screens/PlanScreen';
import NotificationScreen from '@screens/NotificationScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
          } else {
            iconName = focused ? 'location' : 'location-outline';
          }

          return <Ionicons name={iconName} size={18} color={color} style={{ alignSelf: 'center', marginTop:0 }} />;
        },
        tabBarActiveTintColor: Colors.onPrimaryColor,
        tabBarInactiveTintColor: Colors.onWhiteTone,
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium', alignSelf: 'center' },
        tabBarStyle: { backgroundColor: 'transparent', position:'absolute', bottom:0, elevation: 0, borderTopWidth:0, paddingHorizontal: 10, marginBottom: 15 },
        tabBarInactiveBackgroundColor: Colors.whiteTone2,
        tabBarActiveBackgroundColor: Colors.secondaryColor,
        headerTransparent: true,
        tabBarItemStyle: {
            borderRadius: 10, 
            marginHorizontal: 5, 
            flexDirection: 'row-reverse', 
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 0,
            shadowColor: '#171717',
            elevation: 4,
          }
      })}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                  headerShown: false,
                }} 
              />
            <Tab.Screen 
                name="Trip" 
                component={PlanScreen} 
                options={{ 
                  tabBarLabel: 'Trips', 
                  headerShown:false, 
                }}
              />
            <Tab.Screen 
                name="Notification" 
                component={NotificationScreen} 
                options={{ 
                  tabBarLabel: 'Alerts', 
                  headerShown:false 
                }}
              />
        </Tab.Navigator>
    )
}

export default TabNavigator