import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Colors from "@constants/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { RootState, useAppSelector } from "@store/store";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "@components/buttons/IconButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import SearchModal from "@components/modal/SearchModal";
import Map, { MapMethods } from "@components/Map";
import HomeBottomBox from "@components/HomeBottomBox";
import RoutingProps from "../types/RoutingProps";

const HomeScreen: React.FC = () => {
  const settingState = useAppSelector((state: RootState) => state.setting);
  const { height, width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [routing, setRouting] = React.useState<RoutingProps | null>(null);
  const mapRef = React.useRef<MapMethods>(null);
  const menuIcon = <Ionicons name="menu" size={25} color={Colors.whiteTone1} />;
  const searchIcon = (
    <Ionicons
      name="search"
      size={25}
      color={
        settingState.setting.isDarkMode
          ? Colors.onPrimaryColor
          : Colors.onWhiteTone
      }
    />
  );
  const locateIcon = (
    <Ionicons
      name="ios-locate"
      size={25}
      color={
        settingState.setting.isDarkMode
          ? Colors.onPrimaryColor
          : Colors.onWhiteTone
      }
    />
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const onPress = () => {
    if (mapRef.current) {
      mapRef.current.goToCurrentPosition();
    }
  };

  const gosearch = () => {
    navigation.navigate("SearchScreen", {
      nbSeat: 1,
      price: 300,
    });
  };
  return (
    <>
      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <SafeAreaView
        style={[
          styles.container,
          {
            height: height,
          },
        ]}
      >
        <View style={[styles.headerBtnBox]}>
          <IconButton
            icon={menuIcon}
            bgColor={Colors.primaryColor}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
          <IconButton icon={locateIcon} onPress={onPress} />
          <IconButton icon={searchIcon} onPress={gosearch} />
        </View>

        <Map setRouting={setRouting} routing={routing} ref={mapRef} />

        <HomeBottomBox setRouting={setRouting} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteTone1,
    position: "relative",
  },
  headerBtnBox: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 99,
  },
});

export default HomeScreen;
