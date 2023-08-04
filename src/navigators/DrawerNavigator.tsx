import React, { useEffect } from "react";
import TabNavigator from "./TabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import IconButton from "@components/buttons/IconButton";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { AppStackParamList } from "@navigators/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Rating from "@components/Rating";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { logout } from "@services/useAuth";
import { showError, showSuccess } from "@functions/helperFunctions";
import MoreOptionsScreen from '@screens/MoreOptionsScreen';
import LanguageScreen from '@screens/LanguageScreen';
import NotificationScreen from '@screens/NotificationScreen';
import SecurityInformationScreen from '@screens/SecurityInformationScreen';
import KeyWordScreen from '@screens/KeyWordScreen';
import TransactionHistoryScreen from '@screens/TransactionHistoryScreen';
import i18n from '../locales/i18n';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const menuIcon = (
    <Ionicons name="chevron-back" size={25} color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone} />
  );

  const signout = async () => {
    await dispatch(logout())
      .unwrap()
      .then((data) => {
        showSuccess("Déconnexion réussie !");
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ flex: 1, paddingTop: 10, paddingHorizontal: 10, backgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2, }}
          >
            <IconButton
              icon={menuIcon}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("@assets/images/avatars/Avatar5.png")}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <View style={{ margin: 10 }}></View>
              <Rating enablerating={false} rate={4} size={12} />

              <Text
                style={{
                  fontSize: 19,
                  marginVertical: 8,
                  color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone,
                  fontFamily: 'Poppins_600SemiBold',
                }}
              >
                { userState.user?.firstName ? 
                i18n.t('welcome-message', {count: 1, name: userState.user?.firstName}).toUpperCase(): 
                  i18n.t('welcome-message', {count: 0}).toUpperCase()
                } 👋
              </Text>
              <View
                style={{
                  height: 40,
                  width: 95,
                  backgroundColor: Colors.primaryColor,
                  borderRadius: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: Colors.whiteTone1,
                    fontFamily: 'Poppins_600SemiBold',
                  }}
                >
                  {userState.user?.role?.includes('POLLER') ? 'POOLER' : "USER"}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 5, paddingTop:15 }}>
              <DrawerItemList {...props} />
            </View>
            <View style={{ 
              height: 100,
              paddingHorizontal:15,
              justifyContent: 'center'
             }}>
              <DrawerItem
                  label={i18n.t('logout')}
                  style={{ 
                    padding:0,
                    paddingVertical:0,
                    margin:0,
                    marginVertical: 0
                  }}
                  labelStyle={{ 
                    fontFamily: 'Poppins_400Regular',
                    color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2
                    }}
                  icon={() => (
                    <Ionicons
                      name="log-out-outline"
                      size={20}
                      color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
                      style={{ position: "absolute", left: 0 }}
                    />
                  )}
                  onPress={() => signout}
                />
            </View>
            <View style={{ 
              paddingVertical: 10,
              paddingHorizontal: 20,
             }}>
              <Text
              style={{
                textAlign: "center",
                fontFamily: 'Poppins_300Light',
                letterSpacing: 3,
                color: Colors.grayTone2,
              }}
              >LETSGO POOLER</Text>
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerPosition: "left",
        drawerStyle: {
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50,
          overflow: 'hidden',
        },
        drawerInactiveTintColor: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2,
        drawerActiveTintColor: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2,
        drawerInactiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2,
        drawerActiveBackgroundColor: settingState.setting.isDarkMode ? Colors.darkTone1 : Colors.whiteTone2,
        //overlayColor: 'transparent',
        drawerItemStyle: {
          padding:0,
          paddingVertical:0,
          margin:0,
          marginVertical: 0
        },
        drawerLabelStyle: {
          lineHeight: 15,
          fontFamily: 'Poppins_400Regular'
        },
      }}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('home')}`,
          drawerIcon: () => (
            <Ionicons
              name="home-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('profile')}`,
          drawerIcon: () => (
            <Ionicons
              name="person-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Security"
        component={SecurityInformationScreen}
        options={{
          headerShown: false,
          drawerLabel:  `${i18n.t('security-information')}`,
          drawerIcon: () => (
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('notification', {count: 1})}`,
          drawerIcon: () => (
            <Ionicons
              name="notifications-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('language', {count: 1})}`,
          drawerIcon: () => (
            <Ionicons
              name="language-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Keywords"
        component={KeyWordScreen}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('keywords')}`,
          drawerIcon: () => (
            <Ionicons
              name="at-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Transaction"
        component={TransactionHistoryScreen}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('transaction-history')}`,
          drawerIcon: () => (
            <Ionicons
              name="cash-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="More"
        component={MoreOptionsScreen}
        options={{
          headerShown: false,
          drawerLabel: `${i18n.t('more')}`,
          drawerIcon: () => (
            <Ionicons
              name="add-outline"
              size={20}
              color={settingState.setting.isDarkMode ? Colors.grayTone3 : Colors.grayTone2}
              style={{ position: "absolute", left: 10 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 200,
    marginTop: 5,
    borderRadius: 6,
    height: 42,
    marginBottom: 15,
  },
  shadowProp: {
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
});
