import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@components/buttons/CustomButton";

const SecurityInformationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Security Information" />

      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_security.png")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.item}>
          <Text style={styles.text}>Two-way Check</Text>
          <View style={styles.item}>
            <Text style={styles.minText}>Off</Text>
            <Ionicons
              name="chevron-forward"
              size={30}
              color={Colors.primaryColor}
            />
          </View>
        </TouchableOpacity>
        <Text style={[styles.minText, {fontSize: 13, marginTop: 5}]}>Two-way Check offers an additional layer of security for your account, even if someone knows your password </Text>
        <CustomButton
          bgColor={Colors.primaryColor}
          fgColor="#fff"
          isReady={true}
          onPress={()=>{}}
          marginVertical={30}
          text="change password"
        />
        <CustomButton
          bgColor={Colors.primaryShade1}
          fgColor="#fff"
          isReady={true}
          onPress={()=>{}}
          text="verify identity"
        />
      </View>
    </SafeAreaView>
  );
};

export default SecurityInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  image: {
    height: 150,
    marginBottom: 20,
  },
  text: {
    flex: 1,
    textAlign: "left",
    color: Colors.grayTone1,
    marginLeft: 5,
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  minText: {
    fontFamily: "Poppins_400Regular",
    color: Colors.grayTone2,

  },
});
