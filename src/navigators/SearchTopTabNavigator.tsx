import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import SearchDriverScreen from "@screens/search/SearchDriverScreen";
import SearchTripScreen from "@screens/search/SearchTripScreen";
import Colors from "@constants/colors";

const SearchTopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.onPrimaryColor,
        tabBarInactiveTintColor: Colors.onWhiteTone,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primaryColor,
          height: "100%",
          borderRadius: 30,
        },
        tabBarLabelStyle: { fontSize: 13, fontFamily: "Poppins_500Medium" },
        tabBarStyle: {
          backgroundColor: Colors.whiteTone2,
          borderRadius: 30,
          elevation: 1,
          marginHorizontal: 30,
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="SearchTrip"
        component={SearchTripScreen}
        options={{ tabBarLabel: "Trip" }}
      />
      <Tab.Screen
        name="SearchDriver"
        component={SearchDriverScreen}
        options={{ tabBarLabel: "Driver" }}
      />
    </Tab.Navigator>
  );
};

export default SearchTopTabNavigator;

const styles = StyleSheet.create({});
