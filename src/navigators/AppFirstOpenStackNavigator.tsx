import React from 'react';
import ProfileScreen from '@screens/ProfileScreen';
import ResultSearchScreen from '@screens/trip/ResultSearchScreen';
import TripInfoScreen from '@screens/trip/info/TripInfoScreen';
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
import FavoriteDestinationScreen from '@screens/auth/FavoriteDestinationScreen';
import TripPlanScreen from '@screens/trip/planned/TripPlanScreen';
import TripPublishScreen from '@screens/trip/TripPublishScreen';

export type AppFirstOpenStackParamList = {
  Home: undefined;
  ResultSearch: { destination: string, price: number };
  FavoriteDestination: undefined;
  TripInfo: {from: string};
  TripPlan: undefined;
  TripPublish: undefined;
  PlannerDetail: undefined;
  DriverDetail: undefined;
  VehiculeDetail: undefined;
  SeatDetail: undefined;
  SelectPayMode: undefined;
  OMPayMode: undefined;
  MOMOPayMode: undefined;
  CardPayMode: undefined;
  CashPayMode: undefined;
  TicketList: undefined;
  TicketDetail: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<AppFirstOpenStackParamList>();

const AppFirstOpenStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="FavoriteDestination" component={FavoriteDestinationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ResultSearch" component={ResultSearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripInfo" component={TripInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripPublish" component={TripPublishScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlannerDetail" component={PlannerDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DriverDetail" component={DriverDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripPlan" component={TripPlanScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VehiculeDetail" component={VehiculeDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SeatDetail" component={SeatDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectPayMode" component={SelectPayModeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OMPayMode" component={OMPayModeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MOMOPayMode" component={MOMOPayModeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CardPayMode" component={CardPayModeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CashPayMode" component={CashPayModeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TicketList" component={TicketListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TicketDetail" component={TicketDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
};

export default AppFirstOpenStackNavigator;