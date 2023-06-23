import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TripInfoScheduleScreen from '@screens/trip/info/TripInfoScheduleScreen';
import TripInfoPOIScreen from '@screens/trip/info/TripInfoPOIScreen';
import TripInfoItineraryScreen from '@screens/trip/info/TripInfoItineraryScreen';
import Colors from '@constants/colors';


const Tab = createMaterialTopTabNavigator();

import { AppStackParamList } from '@navigators/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AppStackParamList, 'TripInfo'>;
const TripInfoTopTabNavigator = ({route}: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="TripInfoSchedule"
      screenOptions={{
        tabBarActiveTintColor: Colors.onPrimaryColor,
        tabBarInactiveTintColor: Colors.onWhiteTone,
        tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30 },
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium'},
        tabBarStyle: { backgroundColor: Colors.whiteTone2, borderRadius: 30, elevation: 1, marginHorizontal: 30, marginBottom: 10 },
      }}
    >
      <Tab.Screen
        name="TripInfoSchedule"
        options={{ tabBarLabel: 'Schedule',  }}
      >
        {(props) => <TripInfoScheduleScreen {...props} from={route.params.from} />}
      </Tab.Screen>
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
