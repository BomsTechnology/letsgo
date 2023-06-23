import PlannedAlertScreen from "@screens/alert/PlannedAlertScreen";
import DoneEventsScreen from "@screens/alert/DoneEventsScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from "@screens/alert/NotificationScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "@constants/colors";

const Tab = createMaterialTopTabNavigator();


const AlertTopTabNavigator = () => {
    return (
      <Tab.Navigator
          initialRouteName="TripPlanSchedule"
          screenOptions={{
            tabBarActiveTintColor: Colors.onPrimaryColor,
            tabBarInactiveTintColor: Colors.onWhiteTone,
            tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30 },
            tabBarLabelStyle: { fontSize: 10, fontFamily: 'Poppins_500Medium'},
            tabBarStyle: { backgroundColor: Colors.whiteTone2, borderRadius: 30, elevation: 1 },
          }}
        >
          <Tab.Screen
            name="PlannedAlerts"
            component={PlannedAlertScreen}
            options={{ tabBarLabel: 'Planned Alerts',  }}
          />
          <Tab.Screen
            name="DoneEvents"
            component={DoneEventsScreen}
            options={{ tabBarLabel: 'Done Events' }}
          />
          <Tab.Screen
            name="Notification"
            component={NotificationScreen}
            options={{ tabBarLabel: 'Notification' }}
          />
        </Tab.Navigator>
      );
    };
export default AlertTopTabNavigator;