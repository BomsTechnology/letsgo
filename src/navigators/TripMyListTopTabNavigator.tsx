import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '@constants/colors';
import TripPublishedScreen from '@screens/trip/mytrip/TripPublishedScreen';
import TripReservedScreen from '@screens/trip/mytrip/TripReservedScreen';
import TripConfirmedScreen from '@screens/trip/mytrip/TripConfirmedScreen';
import TripCompletedScreen from '@screens/trip/mytrip/TripCompletedScreen';


const Tab = createMaterialTopTabNavigator();

const TripMyListTopTabNavigator = () => {
    return (
        <Tab.Navigator
          initialRouteName="TripPlanSchedule"
          screenOptions={{
            tabBarActiveTintColor: Colors.onPrimaryColor,
            tabBarInactiveTintColor: Colors.onWhiteTone,
            tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30 },
            tabBarLabelStyle: { fontSize: 10, fontFamily: 'Poppins_500Medium', },
            tabBarStyle: { backgroundColor: Colors.whiteTone2, borderRadius: 30, elevation: 1, marginHorizontal: 10,  },
          }}
        >
          <Tab.Screen
            name="TripPublished"
            component={TripPublishedScreen}
            options={{ tabBarLabel: 'Published',  }}
          />
          <Tab.Screen
            name="TripReserved"
            component={TripReservedScreen}
            options={{ tabBarLabel: 'Reserved' }}
          />
          <Tab.Screen
            name="TripConfirmed"
            component={TripConfirmedScreen}
            options={{ tabBarLabel: 'Confirmed' }}
          />
          <Tab.Screen
            name="TripCompleted"
            component={TripCompletedScreen}
            options={{ tabBarLabel: 'Completed' }}
          />
        </Tab.Navigator>
      );
}

export default TripMyListTopTabNavigator;