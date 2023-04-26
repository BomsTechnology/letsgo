import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TripInfoScheduleScreen from '../screens/trip/TripInfoScheduleScreen';
import TripInfoPOIScreen from '../screens/trip/TripInfoPOIScreen';
import TripInfoItineraryScreen from '../screens/trip/TripInfoItineraryScreen';
import Colors from '../constants/colors';


const Tab = createMaterialTopTabNavigator();

const TripInfoTopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TripInfoSchedule"
      screenOptions={{
        tabBarActiveTintColor: Colors.whiteTone1,
        tabBarInactiveTintColor: Colors.grayTone1,
        tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30 },
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium'},
        tabBarStyle: { backgroundColor: Colors.whiteTone1, borderRadius: 30, elevation: 1, marginHorizontal: 30, marginBottom: 10 },
      }}
    >
      <Tab.Screen
        name="TripInfoSchedule"
        component={TripInfoScheduleScreen}
        options={{ tabBarLabel: 'Schedule',  }}
      />
      <Tab.Screen
        name="TripInfoItinerary"
        component={TripInfoItineraryScreen}
        options={{ tabBarLabel: 'Itinerary' }}
      />
      <Tab.Screen
        name="TripInfoPOI"
        component={TripInfoPOIScreen}
        options={{ tabBarLabel: 'POIs' }}
      />
    </Tab.Navigator>
  );
};

export default TripInfoTopTabNavigator;
