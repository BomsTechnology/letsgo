import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import VehiculeDetailIndexScreen from '../screens/vehicule/VehiculeDetailIndexScreen';
import VehiculeDetailSeatScreen from '../screens/vehicule/VehiculeDetailSeatScreen';
import Colors from '../constants/colors';


const Tab = createMaterialTopTabNavigator();

const VehiculeDetailTopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="VehiculeDetailIndex"
      screenOptions={{
        tabBarActiveTintColor: Colors.whiteTone1,
        tabBarInactiveTintColor: Colors.grayTone1,
        tabBarIndicatorStyle: {backgroundColor: Colors.primaryColor, height: '100%', borderRadius: 30,  },
        tabBarLabelStyle: { fontSize: 13, fontFamily: 'Poppins_500Medium' },
        tabBarStyle: { backgroundColor: Colors.whiteTone1, borderRadius: 30, elevation: 1, marginHorizontal: 30, marginBottom: 10 },
      }}
    >
      <Tab.Screen
        name="VehiculeDetailIndex"
        component={VehiculeDetailIndexScreen}
        options={{ tabBarLabel: 'Detail',  }}
      />
      <Tab.Screen
        name="VehiculeDetailSeat"
        component={VehiculeDetailSeatScreen}
        options={{ tabBarLabel: 'Seat' }}
      />
  
    </Tab.Navigator>
  );
};

export default VehiculeDetailTopTabNavigator;
