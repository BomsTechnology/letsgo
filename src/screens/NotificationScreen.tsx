import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootState, useAppSelector,  } from "@store/store";
const NotificationScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const [enabledGeneralNotif, setEnabledGeneralNotif] = React.useState(true);
  const [enabledEscortService, setEnabledEscortService] = React.useState(false);
  const [enabledDriverSubscription, setEnabledDriverSubscription] =
    React.useState(true);
  const [enabledSpecialOffer, setEnabledSpecialOffer] = React.useState(true);
  const [enabledAppUpdate, setEnabledAppUpdate] = React.useState(false);
  const [enabledTipAvailable, setEnabledTipAvailable] = React.useState(false);
  const [enabledNewServiceAvailable, setEnabledNewServiceAvailable] =
    React.useState(false);

  const toggleGeneralNotif = () => {
    setEnabledGeneralNotif((previousState) => !previousState);
  };
  const toggleEscortService = () => {
    setEnabledEscortService((previousState) => !previousState);
  };
  const toggleDriverSubscription = () => {
    setEnabledDriverSubscription((previousState) => !previousState);
  };
  const toggleSpecialOffer = () => {
    setEnabledSpecialOffer((previousState) => !previousState);
  };
  const toggleAppUpdate = () => {
    setEnabledAppUpdate((previousState) => !previousState);
  };
  const toggleTipAvailable = () => {
    setEnabledTipAvailable((previousState) => !previousState);
  };
  const toggleNewServiceAvailable = () => {
    setEnabledNewServiceAvailable((previousState) => !previousState);
  };
  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text="Notifications" />

      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_notification.png")}
          style={styles.image}
        />
        <ScrollView style={{ marginTop: 20, width: "100%" }}>
          <TouchableOpacity onPress={toggleGeneralNotif} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>General Notifications</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledGeneralNotif ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleGeneralNotif}
              value={enabledGeneralNotif}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEscortService} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>Escort Service</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledEscortService ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleEscortService}
              value={enabledEscortService}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDriverSubscription} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>Driver Subscription</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledDriverSubscription ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleDriverSubscription}
              value={enabledDriverSubscription}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSpecialOffer} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>Special Offers</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledSpecialOffer ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleSpecialOffer}
              value={enabledSpecialOffer}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleAppUpdate} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>App Updates</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledAppUpdate ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleAppUpdate}
              value={enabledAppUpdate}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTipAvailable} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>New Tips Available</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledTipAvailable ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleTipAvailable}
              value={enabledTipAvailable}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNewServiceAvailable} style={styles.item}>
            <Text style={settingState.setting.isDarkMode ? styles.text_DARK : styles.text}>New Service Available</Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={enabledNewServiceAvailable ? Colors.primaryColor : Colors.grayTone2}
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={toggleNewServiceAvailable}
              value={enabledNewServiceAvailable}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
  image: {
    height: 150,
  },
  text: {
    flex: 1,
    textAlign: "left",
    color: Colors.onWhiteTone,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  text_DARK: {
    flex: 1,
    textAlign: "left",
    color: Colors.onPrimaryColor,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
