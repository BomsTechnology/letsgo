import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { Switch } from "react-native";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { setThemeMode } from "@services/useSetting";
import i18n from "../locales/i18n";
import { showError, showSuccess } from "@functions/helperFunctions";
import { logout } from "@services/useAuth";
import ConfirmModal from "@components/modal/ConfirmModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface optionsProps {
  id: string;
  icon: JSX.Element;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const MoreOptionsScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const settingState = useAppSelector((state: RootState) => state.setting);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const toogleIsDarkMode = async (val: boolean) => {
    setIsDark(val);
    await dispatch(setThemeMode(settingState.setting))
    .unwrap()
    .then(async (data) =>  {
      await AsyncStorage.setItem("setting", JSON.stringify(data));
    });
  };

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

  useEffect(() => {
    setIsDark(settingState.setting.isDarkMode);
  }, []);

  const options: optionsProps[] = [
    {
      id: "1",
      label: "Dispute Resolution Center",
      icon: (
        <Ionicons
          name="chatbubbles-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("Chat"),
    },
    {
      id: "2",
      label: "FAQs & Help",
      icon: (
        <Ionicons
          name="help-circle-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("Faq"),
    },
    {
      id: "3",
      label: "Manage Devices",
      icon: (
        <Ionicons
          name="phone-portrait-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("ManageDevice"),
    },
    {
      id: "4",
      label: "Invite Friends",
      icon: (
        <Ionicons
          name="person-add-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("InviteFriend"),
    },
    {
      id: "5",
      label: `${i18n.t("language", { count: 1 })}`,
      icon: (
        <Ionicons
          name="language-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("Language"),
    },
    {
      id: "6",
      label: `${i18n.t("keywords")}`,
      icon: (
        <Ionicons
          name="at-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => navigation.navigate("KeyWords"),
    },
    {
      id: "7",
      label: `${i18n.t("logout")}`,
      icon: (
        <Ionicons
          name="log-out-outline"
          size={25}
          color={
            settingState.setting.isDarkMode
              ? Colors.grayTone3
              : Colors.grayTone1
          }
        />
      ),
      onPress: () => setModalVisible(true),
    },
  ];

  const optionsItemRender = ({ item }: { item: optionsProps }) => {
    return (
      <TouchableOpacity style={styles.faqItem} onPress={item.onPress}>
        {item.icon}
        <Text
          style={
            settingState.setting.isDarkMode
              ? styles.faqText_DARK
              : styles.faqText
          }
        >
          {item.label}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={30}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
    <ConfirmModal 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      cancelBtnAction={() => setModalVisible(false)}
      confirmBtnAction={() => signout()}
      title={`${i18n.t("logout")}`}
      message={"Are you sure you want to disconnect?"}
      btnColor={Colors.accentOrange}
      cancelBtnLabel='No, Keep it'
      confirmBtnLabel={`${i18n.t("logout")}`}
    />
      <SafeAreaView
        style={
          settingState.setting.isDarkMode
            ? styles.container_DARK
            : styles.container
        }
      >
        <SimpleHeader text="More Options" />
        <TouchableOpacity style={styles.faqItem} onPress={() => toogleIsDarkMode(!isDark)}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={25}
            color={
              settingState.setting.isDarkMode
                ? Colors.grayTone3
                : Colors.grayTone1
            }
          />
          <Text
            style={
              settingState.setting.isDarkMode
                ? styles.faqText_DARK
                : styles.faqText
            }
          >
            Theme
          </Text>
          <View style={styles.faqItem}>
            <Text style={styles.minText}>
              {!settingState.setting.isDarkMode ? "White Mode" : "Dark Mode"}
            </Text>
            <Switch
              trackColor={{
                false: Colors.grayTone3,
                true: Colors.primaryShade1,
              }}
              thumbColor={
                settingState.setting.isDarkMode
                  ? Colors.primaryColor
                  : Colors.grayTone2
              }
              ios_backgroundColor={Colors.grayTone3}
              onValueChange={(val) => toogleIsDarkMode(val)}
              value={isDark}
            />
          </View>
        </TouchableOpacity>
        <FlatList
          data={options}
          showsHorizontalScrollIndicator={false}
          renderItem={optionsItemRender}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          style={{ flex: 1, marginTop: 20 }}
        />
      </SafeAreaView>
    </>
  );
};

export default MoreOptionsScreen;

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
  faqText: {
    flex: 1,
    textAlign: "left",
    color: Colors.grayTone1,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  faqText_DARK: {
    flex: 1,
    textAlign: "left",
    color: Colors.onPrimaryColor,
    marginLeft: 5,
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
  },
  faqItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  minText: {
    fontFamily: "Poppins_400Regular",
    color: Colors.grayTone3,
  },
});
