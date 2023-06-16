import React from 'react';
import ProfileScreen from '@screens/ProfileScreen';
import ResultSearchScreen from '@screens/trip/ResultSearchScreen';
import TripInfoScreen from '@screens/trip/info/TripInfoScreen';
import TripPlanScreen from '@screens/trip/planned/TripPlanScreen';
import PlannerDetailScreen from '@screens/planner/PlannerDetailScreen';
import DriverDetailScreen from '@screens/driver/DriverDetailScreen';
import VehiculeDetailScreen from '@screens/vehicule/VehiculeDetailScreen';
import SeatDetailScreen from '@screens/seat/SeatDetailScreen';
import SelectPayModeScreen from '@screens/payment/SelectPayModeScreen';
import OMPayModeScreen from '@screens/payment/OMPayModeScreen';
import MOMOPayModeScreen from '@screens/payment/MOMOPayModeScreen';
import CardPayModeScreen from '@screens/payment/CardPayModeScreen';
import CashPayModeScreen from '@screens/payment/CashPayModeScreen';
import TicketListScreen from '@screens/ticket/TicketListScreen';
import TicketDetailScreen from '@screens/ticket/TicketDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '@navigators/DrawerNavigator';
import TripPublishScreen from '@screens/trip/TripPublishScreen';
import OTPScreen from '@screens/auth/OTPScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import FavoriteDestinationScreen from '@screens/auth/FavoriteDestinationScreen';




const Stack = createNativeStackNavigator();

const StackNavigator = (stack: any) => {
  return (
    <>
      <stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      <stack.Screen name="ResultSearch" component={ResultSearchScreen} options={{ headerShown: false }} />
      <stack.Screen name="TripInfo" component={TripInfoScreen} options={{ headerShown: false }} />
      <stack.Screen name="TripPlan" component={TripPlanScreen} options={{ headerShown: false }} />
      <stack.Screen name="TripPublish" component={TripPublishScreen} options={{ headerShown: false }} />
      <stack.Screen name="PlannerDetail" component={PlannerDetailScreen} options={{ headerShown: false }} />
      <stack.Screen name="DriverDetail" component={DriverDetailScreen} options={{ headerShown: false }} />
      <stack.Screen name="VehiculeDetail" component={VehiculeDetailScreen} options={{ headerShown: false }} />
      <stack.Screen name="SeatDetail" component={SeatDetailScreen} options={{ headerShown: false }} />
      <stack.Screen name="SelectPayMode" component={SelectPayModeScreen} options={{ headerShown: false }} />
      <stack.Screen name="OMPayMode" component={OMPayModeScreen} options={{ headerShown: false }} />
      <stack.Screen name="MOMOPayMode" component={MOMOPayModeScreen} options={{ headerShown: false }} />
      <stack.Screen name="CardPayMode" component={CardPayModeScreen} options={{ headerShown: false }} />
      <stack.Screen name="CashPayMode" component={CashPayModeScreen} options={{ headerShown: false }} />
      <stack.Screen name="TicketList" component={TicketListScreen} options={{ headerShown: false }} />
      <stack.Screen name="TicketDetail" component={TicketDetailScreen} options={{ headerShown: false }} />
      <stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </>
  );
};

export default StackNavigator;