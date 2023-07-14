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
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import SearchModal from "@components/modal/SearchModal";
import Map from "@components/Map";
import { TextInput } from "react-native";
import { PlaceProps } from "../types/PlaceProps";
import { searchPlace, setDestination } from "@services/useSearchPlace";
import { showError } from "@functions/helperFunctions";
import SearchPlaceItem from "@components/SearchPlaceItem";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import Constants from "expo-constants";
const HomeScreen = () => {
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const bottomBoxRef = useRef<View>(null);
  const dispatch = useAppDispatch();
  const [destinationValue, setDestanationValue] = useState("");
  const [searchHeight, setSearchHeight] = useState(0);
  const [results, setResults] = useState<PlaceProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { height, width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();

  const money = watch("money");
  const moneyIcon = (
    <FontAwesome5 name="search-dollar" size={16} color={Colors.primaryColor} />
  );
  const menuIcon = <Ionicons name="menu" size={25} color={Colors.whiteTone1} />;
  const locateIcon = (
    <Ionicons name="ios-locate" size={25} color={Colors.onWhiteTone} />
  );
  const searchIcon = (
    <Ionicons name="search" size={25} color={Colors.onWhiteTone} />
  );

  const onChangeText = async (value: string) => {
    setDestanationValue(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      await searchPlace(destinationValue)
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showError(JSON.stringify(error));
        });
    }, 1000);
    dispatch(setDestination(null));
  };

  const handleBlur = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      //setResults([]);
    }
  };

  const selectPlace = async (item: PlaceProps): Promise<void> => {
    setDestanationValue(item.properties.name);
    setResults([]);
    dispatch(setDestination(item));
  };

  const search = () => {
    navigation.navigate("ResultSearch", {
      destination: localisationState.destination!.properties.name,
      price: money,
    });
  };

  const onPress = () => {};
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setSearchHeight(
          height - (e.endCoordinates.height + Constants.statusBarHeight + 272)
        );
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      (e) => {
        setSearchHeight(height - (Constants.statusBarHeight + 272));
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
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
          <IconButton icon={searchIcon} onPress={() => setModalVisible(true)} />
        </View>

        <Map />

        <View style={[styles.containerBoxSearch]}>
          {isLoading ? (
            <View
              style={[
                styles.shadowProp,
                styles.searchBox,
                styles.centerContainer,
                { height: searchHeight },
              ]}
            >
              <ActivityIndicator size={"large"} color={Colors.primaryColor} />
            </View>
          ) : !localisationState.destination && results.length === 0 ? (
            <View
              style={[
                styles.shadowProp,
                styles.searchBox,
                styles.centerContainer,
                { height: searchHeight },
              ]}
            >
              <FontAwesome5 name="sad-cry" size={50} color={Colors.grayTone2} />
              <Text style={[styles.textBold, { color: Colors.grayTone2 }]}>
                No Result
              </Text>
            </View>
          ) : results.length > 0 ? (
            <View
              style={[
                styles.shadowProp,
                styles.searchBox,
                { height: searchHeight },
              ]}
            >
              {
                <FlatList
                  data={results}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }: { item: PlaceProps }) => (
                    <SearchPlaceItem
                      onPress={() => selectPlace(item)}
                      item={item}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  style={{ flex: 1, marginTop: 20, paddingHorizontal: 10 }}
                />
              }
            </View>
          ) : null}
          <View
            ref={bottomBoxRef}
            style={[styles.bottomBox, styles.shadowProp]}
          >
            <Text style={styles.title}>Hi Traveller</Text>
            <Text style={[styles.description]}>
              Where are you going today ?
            </Text>
            <View>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Colors.secondaryColor}
                />
                <View style={[styles.innerInputContainer]}>
                  <TextInput
                    placeholder="Type your Destination"
                    placeholderTextColor={Colors.grayTone2}
                    style={styles.input}
                    onChangeText={(text) => onChangeText(text)}
                    onBlur={handleBlur}
                    value={destinationValue}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                marginTop: 5,
              }}
            >
              <View style={{ width: "60%" }}>
                <CustomInput
                  placeholder="Your budget"
                  name="money"
                  control={control}
                  secureTextEntry={false}
                  prefixType="icon"
                  sufixType="text"
                  prefix={moneyIcon}
                  bgColor={Colors.whiteTone3}
                  shadow={false}
                  keyboardType="numeric"
                  marginVertical={0}
                  fontSize={13}
                  sufix="X A F"
                  rules={{
                    required: "The price is required",
                  }}
                />
              </View>
              <View style={{ width: "36%" }}>
                <CustomButton
                  bgColor={Colors.primaryColor}
                  fgColor="#fff"
                  isReady={localisationState.destination && money}
                  onPress={handleSubmit(search)}
                  marginVertical={0}
                  fontSize={12}
                  text="Search"
                />
              </View>
            </View>
          </View>
        </View>
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
  bottomBox: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.whiteTone2,
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 4,
    backgroundColor: Colors.whiteTone2,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 18,
    textAlign: "left",
    color: Colors.onWhiteTone,
  },
  description: {
    fontFamily: "Poppins_300Light",
    textAlign: "left",
    color: Colors.grayTone1,
    fontSize: 14,
    marginBottom: 10,
  },
  innerInputContainer: {
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
    gap: 10,
    backgroundColor: Colors.whiteTone3,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.grayTone1,
    fontFamily: "Poppins_300Light",
    fontSize: 13,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBold: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    letterSpacing: 2,
    marginTop: 10,
    textTransform: "uppercase",
  },
  containerBoxSearch: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "auto",
    position: "absolute",
    bottom: 80,
    zIndex: 99,
    overflow: "hidden",
  },
  searchBox: {
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    backgroundColor: Colors.whiteTone2,
  },
});

export default HomeScreen;
