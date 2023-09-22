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
import { getLastKnownPosition, setCurrLocation } from "@services/useLocalization";
import { setDeparture } from "@services/useSearch";
import { getLocalSetting } from "@services/useSetting";
import SettingProps from "../types/SettingProps";
import i18n from '../locales/i18n'
import { countryCodeProps } from "@data/CountryCode";
import { Driver } from "@mytypes/DriverProps";

export type AppStackParamList = {
  Home: undefined;
  SearchScreen: { nbSeat: number; price: number };
  TripInfo: { from: string };
  TripPlan: undefined;
  TripPublish: undefined;
  PlannerDetail: undefined;
  DriverDetail: { driver: Driver };
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
  Login: { countryCode?: countryCodeProps, phoneNumber?: string };
  OTP: { countryCode: countryCodeProps, phoneNumber: string };
  FavoriteDestination: undefined;
  Draft: undefined;
  InviteFriend: undefined;
  ManageDevice: undefined;
  Chat: undefined;
  Faq: undefined;
  TwoWayCheck: undefined;
  VerifyIdentity: undefined;
  ChangeCredential: undefined;
  KeyWords: undefined;
  Language: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [setting, setSetting] = useState<SettingProps | null>(null);
  const checkIsAuth = async () => {
    setLoading(true);
    const setg = await getLocalSetting();
    i18n.locale = setg.language;
    setSetting(setg);
    await dispatch(checkAuth(setg))
      .unwrap()
      .then(async (data) => {
        setLoading(false);
        showSuccess(`Hello Traveller`);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: setting && setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2 }}>
        <ActivityIndicator size={"large"} color={setting && setting.isDarkMode ? Colors.secondaryColor : Colors.primaryColor} />
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
