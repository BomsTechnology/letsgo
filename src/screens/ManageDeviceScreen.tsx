import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Divider } from "@constants/ComponentStyled";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import DeviceItem, { deviceItemProps } from "@components/DeviceItem";
import { RootState, useAppSelector } from "@store/store";
import ConfirmModal from "@components/modal/ConfirmModal";


const ManageDeviceScreen = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const [currentDevice, setCurrentDevice] = useState<deviceItemProps | null>(null);
  const [otherDevices, setOtherDevices] = useState<deviceItemProps[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currTitle, setCurrTitle] = React.useState("");
  const [currMessage, setCurrMessage] = React.useState("");
  const [currCancelLbl, setCurrCancelLbl] = React.useState("");
  const [currConfirmLbl, setCurrConfirmLbl] = React.useState("");
  const [currConfirmAction, setCurrConfirmAction] = React.useState<() => void | null>();        
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
  
  useEffect(() => {
    setCurrentDevice(devices.filter((device) => device.isCurrent)[0]);
    setOtherDevices(devices.filter((device) => !device.isCurrent));
  }, []);

  const closeSession = (item: string) => {
    cancelModal();
  }

  const blockDevice = (item: string) => {
    cancelModal();
  }

  const closeAllSession = () => {
    setOtherDevices([]);
    cancelModal();
  }

  const openCloseAllSessions = () => {
    setCurrConfirmAction(() => {
      return () => {
        closeAllSession()
      }
    });
    openModal(
      "Close All Sessions",
      `Closing all Sessions will immediately revoke access and prevent any further interactions or usage from these devices. Do you want to proceed ?`,
      'No, Keep it',
      "Yes, Sure To Close ALL",
    )
  }

  const openCloseSession = (item: deviceItemProps) => {
    setCurrConfirmAction(() => {
      return () => {
        closeAllSession()
      }
    });
    openModal(
      "Close Session",
      `Closing your account session in ${item.name} seen at ${item.lastLoggin} will result in immediate log out and termination of access. Please ensure that you have saved any important data and completed any pending actions before proceeding. Do you want to proceed ?`,
      'No, Keep it',
      "Yes, Sure To Close",
    )
  }

  const openBlockDevice = (item: deviceItemProps) => {
    setCurrConfirmAction(() => {
      return () => {
        closeAllSession()
      }
    });
    openModal(
      "Block device",
      `Blocking the device ${item.name}   seen at ${item.lastLoggin} will immediately revoke access and prevent any further interactions or usage from this device. Do you want to proceed ?`,
      'No, Keep it',
      "Yes, Sure To Block",
    )
  }

  const cancelModal = () => {
    setModalVisible(false);
    setCurrMessage('');
    setCurrTitle('');
    setCurrConfirmLbl('')
    setCurrCancelLbl('');
  }

  const openModal = (title: string, message: string, cancelBtnLabel: string, confirmBtnLabel: string) => {
    setCurrMessage(message);
    setCurrTitle(title);
    setCurrConfirmLbl(confirmBtnLabel)
    setCurrCancelLbl(cancelBtnLabel);
    setModalVisible(true);
  }


  

  return (
    <>
    <ConfirmModal 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      cancelBtnAction={cancelModal}
      confirmBtnAction={currConfirmAction!}
      title={currTitle}
      message={currMessage}
      btnColor={Colors.accentOrange}
      cancelBtnLabel={currCancelLbl}
      confirmBtnLabel={currConfirmLbl}
    />
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text="Manage Devices" />

      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_device.png")}
          style={styles.image}
        />
        <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>Current Device</Text>
        {currentDevice && <DeviceItem props={currentDevice} closeAction={openCloseSession} blockAction={openBlockDevice}  />}
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
            <Text style={[settingState.setting.isDarkMode ? styles.title_DARK : styles.title, { width: "auto" }]}>
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
                {otherDevices.length > 9 ? otherDevices.length : `0${otherDevices.length}`}
              </Text>
            </View>
          </View>
          <TouchableOpacity
          onPress={openCloseAllSessions}
            style={{
              flexDirection: "row",
              maxWidth: "50%",
              alignItems: "center",
            }}
          >
            <Ionicons name="close" size={25} color={Colors.accentOrange} />
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: Colors.accentOrange,
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
            ({item} : {item: deviceItemProps}) => <DeviceItem props={item} closeAction={openCloseSession} blockAction={openBlockDevice}/>
          }
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={{ width: "100%", marginTop: 5 }}
        />
      </View>
    </SafeAreaView>
    </>
  );
};

export default ManageDeviceScreen;

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
    color: Colors.onWhiteTone,
    fontSize: 20,
  },
  title_DARK: {
    width: "100%",
    fontFamily: "Poppins_700Bold",
    color: Colors.onPrimaryColor,
    fontSize: 20,
  },
  image: {
    height: 150,
    marginBottom: 20,
  },
});
