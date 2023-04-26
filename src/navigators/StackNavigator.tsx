import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoginScreen from '@screens/auth/LoginScreen';
import ProfileScreen from '@screens/ProfileScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import OTPScreen from '@screens/auth/OTPScreen';
import ResultSearchScreen from '@screens/trip/ResultSearchScreen';
import TripInfoScreen from '@screens/trip/TripInfoScreen';
import UserRoleScreen from '@screens/auth/UserRoleScreen';
import FavoriteDestinationScreen from '@screens/auth/FavoriteDestinationScreen';
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
import ReservationTicketDetailScreen from '@screens/ticket/ReservationTicketDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '@navigators/DrawerNavigator';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
    <Stack.Screen name="UserRole" component={UserRoleScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FavoriteDestination" component={FavoriteDestinationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ResultSearch" component={ResultSearchScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TripInfo" component={TripInfoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PlannerDetail" component={PlannerDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="DriverDetail" component={DriverDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="VehiculeDetail" component={VehiculeDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SeatDetail" component={SeatDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SelectPayMode" component={SelectPayModeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="OMPayMode" component={OMPayModeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MOMOPayMode" component={MOMOPayModeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CardPayMode" component={CardPayModeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CashPayMode" component={CashPayModeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TicketList" component={TicketListScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReservationTicketDetail" component={ReservationTicketDetailScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
};

export default StackNavigator;