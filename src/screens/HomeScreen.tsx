import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Keyboard,
  Dimensions,
  LayoutChangeEvent,
} from "react-native";
import Colors from "@constants/colors";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import CustomButton from "@components/buttons/CustomButton";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import CustomInput from "@components/inputFields/CustomInput";
import { useForm, FieldValues } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "@components/buttons/IconButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import SearchModal from "@components/modal/SearchModal";
import Map from "@components/Map";
import HomeBottomBox from "@components/HomeBottomBox";

const HomeScreen = () => {
  const { height, width } = useWindowDimensions();
  const [showBox, setShowBox] = React.useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const menuIcon = <Ionicons name="menu" size={25} color={Colors.whiteTone1} />;
  const searchIcon = <Ionicons name="search" size={25} color={Colors.onWhiteTone} />;
      const locateIcon = (
        <Ionicons name="ios-locate" size={25} color={Colors.onWhiteTone} />
      );
      const navigation =
        useNavigation<NativeStackNavigationProp<AppStackParamList>>();
        const onPress = () => {};
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
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          />
          <IconButton icon={locateIcon} onPress={onPress} />
          <IconButton icon={searchIcon} onPress={() => setShowBox(true)} />
        </View>

        <Map  />

        <HomeBottomBox boxVisble={showBox} setBoxVisble={setShowBox}  />

        
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
