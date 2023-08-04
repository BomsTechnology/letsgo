import { StyleSheet, Text, View, TouchableOpacity, Share } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Divider } from "@constants/ComponentStyled";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "@components/buttons/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { showError, showSuccess } from "@functions/helperFunctions";
import * as Clipboard from 'expo-clipboard';
import { RootState, useAppSelector } from "@store/store";

const InviteFriendScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const handleShare = async () => {
    try {
      let res = await Share.share({
        message: "https://letsgo.yowyob.com/share?=app",
      });
      if (res.action == Share.sharedAction) {
        if (res.activityType) {
          console.log("Shared with activity type of: " + res.activityType);
        } else {
          console.log("Shared");
        }
      } else if (res.action == Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      console.log(error);
      showError(`${error}`);
    }
  };

  const handleCopy = () => {
    Clipboard.setString("https://letsgo.yowyob.com/share?=app");
    showSuccess('Copy success');
  };

  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text="Invite Friends" />
      <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>Scan QR Code</Text>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <QRCode
          backgroundColor={settingState.setting.isDarkMode ? Colors.darkTone4 : Colors.onPrimaryColor}
          value="https://letsgo.yowyob.com/share?=app"
          logo={require("@assets/images/ico_logo.png")}
          size={250}
          color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.onWhiteTone}
          logoBackgroundColor={Colors.onPrimaryColor}
        />
      </View>
      <Divider
        style={{
          marginTop: 20,
        }}
      />
      <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>OR Share Link</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginBottom: 20,
          marginTop: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 2,
            backgroundColor: settingState.setting.isDarkMode ? Colors.darkTone4 : Colors.whiteTone3,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor: Colors.primaryColor,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1,
            }}
          >
            https://letsgo.yowyob.com/share?=app
          </Text>
        </View>
        <TouchableOpacity onPress={handleCopy} style={{ alignItems: "center" }}>
          <Ionicons name="copy" size={25} color={settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1} />
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone2,
              fontSize: 10,
            }}
          >
            Copy Link
          </Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        bgColor={Colors.primaryColor}
        fgColor={Colors.onPrimaryColor}
        isReady={true}
        onPress={handleShare}
        text="Share link"
      />
    </SafeAreaView>
  );
};

export default InviteFriendScreen;

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
  title: {
    width: "100%",
    fontFamily: "Poppins_700Bold",
    marginTop: 20,
    fontSize: 20,
    color: Colors.onWhiteTone
  },
  title_DARK: {
    width: "100%",
    fontFamily: "Poppins_700Bold",
    marginTop: 20,
    fontSize: 20,
    color: Colors.onPrimaryColor
  },
});
