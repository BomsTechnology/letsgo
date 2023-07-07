import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Divider } from "@constants/ComponentStyled";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import DeviceItem, { deviceItemProps } from "@components/DeviceItem";



const ManageDeviceScreen = () => {
  const devices: deviceItemProps[] = [
    {
      id: "1",
      deviceOs: "ANDROID",
      name: "Google Pixel 6 Pro",
      isCurrent: true,
      loginMethod: "Phone login method",
      country: "Cameroon",
      state: "Online",
      lastLoggin: "May 30, 2023 12:04 PM",
    },
    {
      id: "2",
      deviceOs: "IOS",
      name: "Iphone 14 pro max",
      isCurrent: false,
      loginMethod: "Phone login method",
      country: "Cameroon",
      state: "Offline",
      lastLoggin: "May 30, 2023 12:04 PM",
    },
    {
      id: "3",
      deviceOs: "WEB",
      name: "Google Chrome (Ubuntu)",
      isCurrent: false,
      loginMethod: "Email login method",
      country: "Cameroon",
      state: "Offline",
      lastLoggin: "May 30, 2023 12:04 PM",
    },
  ];

  const currentDevice = devices.filter((device) => device.isCurrent)[0];
  const otherDevices = devices.filter((device) => !device.isCurrent);

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Manage Devices" />

      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_device.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Current Device</Text>
        <DeviceItem props={currentDevice}  />
        <Divider style={{ marginTop: 10 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              maxWidth: "50%",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 5,
            }}
          >
            <Text style={[styles.title, { width: "auto" }]}>
              Active Sessions
            </Text>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                backgroundColor: Colors.primaryColor,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  color: Colors.whiteTone2,
                }}
              >
                03
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              maxWidth: "50%",
              alignItems: "center",
            }}
          >
            <Ionicons name="close" size={25} color={Colors.secondaryColor} />
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: Colors.secondaryColor,
              }}
            >
              Close Sessions
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={otherDevices}
          showsHorizontalScrollIndicator={false}
          renderItem={
            ({item} : {item: deviceItemProps}) => <DeviceItem props={item}/>
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={{ width: "100%", marginTop: 5 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ManageDeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
  title: {
    width: "100%",
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },
  image: {
    height: 150,
    marginBottom: 20,
  },
});
