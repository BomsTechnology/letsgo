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
import { checkAuth } from "@services/useAuth";
import { showError, showSuccess } from "@functions/helperFunctions";
import Colors from "@constants/colors";
import { setCurrLocation } from "@services/useLocalization";
import * as Location from "expo-location";


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
  InviteFriend: undefined;
  ManageDevice: undefined;
  Chat: undefined;
  Faq: undefined;
  TwoWayCheck: undefined;
  VerifyIdentity: undefined;
  ChangeCredential: undefined;
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
      .finally(async () => {
        setLoading(false);
      })
      .then(async (data) => {
        getPermissions();
        showSuccess(`Hello Traveller`);
      })
      .catch((error) => {});
  };

  const getPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      showError("Please grant location permission");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    await dispatch(setCurrLocation({
      type: "CurrentLocation",
      properties: {
        name: "Position actuelle"
      },
      geometry: {
        "coordinates": [
          location.coords.latitude,
          location.coords.longitude
        ],
        "type": "Point"
      }
    })).then((data) => {
      
    });
  }


  useEffect(() => {
    checkIsAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.primaryColor}/>
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
