import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
import { ActivityIndicator, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppStackNavigator from "@navigators/AppStackNavigator";
import AuthStackNavigator from "@navigators/AuthStackNavigator";
import { RootState, useAppSelector, useAppDispatch } from "@store/store";
import AppFirstOpenStackNavigator from "./AppFirstOpenStackNavigator";
import { checkAuth } from '@services/useAuth';
import { showError, showSuccess } from "@functions/helperFunctions";

export type AppStackParamList = {
  Home: undefined;
  ResultSearch: { destination: string; price: number };
  TripInfo: { from: string };
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
  OnBoarding: undefined;
  Login: { phoneNumber?: string };
  OTP: { phoneNumber: string };
  FavoriteDestination: undefined;
  Draft: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const checkIsAuth = async () => {
    setLoading(true);
    await dispatch(checkAuth())
    .unwrap()
    .finally(() => {
        setLoading(false);
    })
    .then((data) => {
    })
    .catch((error) => {
    });
    
};
  useEffect(() => {
        checkIsAuth();
    }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          {authState.token != null && authState.isFirstLogin == true
            ? AppFirstOpenStackNavigator(Stack)
            : authState.token != null && authState.isFirstLogin == false
            ? AppStackNavigator(Stack)
            : AuthStackNavigator(Stack)}
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
