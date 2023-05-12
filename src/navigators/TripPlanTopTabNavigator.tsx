import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TripPlanScheduleScreen from '@screens/trip/planned/TripPlanScheduleScreen';
import TripPlanMoreScreen from '@screens/trip/planned/TripPlanMoreScreen';
import Colors from '@constants/colors';


const Tab = createMaterialTopTabNavigator();

const TripPlanTopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TripPlanSchedule"
      screenOptions={{
        tabBarActiveTintColor: Colors.onPrimaryColor,
        tabBarInactiveTintColor: Colors.onWhiteTone,
        tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30 },
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium'},
        tabBarStyle: { backgroundColor: Colors.whiteTone2, borderRadius: 30, elevation: 1, marginHorizontal: 20, marginVertical: 10 },
      }}
    >
      <Tab.Screen
        name="TripPlanSchedule"
        component={TripPlanScheduleScreen}
        options={{ tabBarLabel: 'Schedule',  }}
      />
      <Tab.Screen
        name="TripPlanMore"
        component={TripPlanMoreScreen}
        options={{ tabBarLabel: 'More' }}
      />
    </Tab.Navigator>
  );
};

export default TripPlanTopTabNavigator;
