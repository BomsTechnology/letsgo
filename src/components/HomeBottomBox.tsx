import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import SearchPlaceItem from "./SearchPlaceItem";
import { FlatList } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { makeRouting, setCurrLocation } from "@services/useLocalization";
import { PlaceProps } from "../types/PlaceProps";
import {
  searchPlace,
  setDeparture,
  setDestination,
} from "@services/useSearchPlace";
import { showError } from "@functions/helperFunctions";
import Colors from "@constants/colors";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { AppStackParamList } from "@navigators/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useWindowDimensions } from "react-native";
import RoutingProps from "../types/RoutingProps";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import CustomButton from "./buttons/CustomButton";
import CustomInput from "./inputFields/CustomInput";
import Constants from "expo-constants";
import SeatInput from "./inputFields/SeatInput";

interface HomeBottomBoxProps {
  boxVisble: boolean;
  setBoxVisble: Function;
  setRouting: Function;
}

const HomeBottomBox = ({ boxVisble, setBoxVisble, setRouting }: HomeBottomBoxProps) => {
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const bottomBoxRef = useRef<View>(null);
  const dispatch = useAppDispatch();
  const [departureValue, setDepartureValue] =
    React.useState("Position Actuelle");
  const [destinationValue, setDestanationValue] = React.useState("");
  const [currentSearch, setCurrentSearch] = React.useState("destination");
  const [searchHeight, setSearchHeight] = useState(0);
  const [results, setResults] = useState<PlaceProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [nb, setNb] = useState(1);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { height, width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const { control, handleSubmit, watch } = useForm();

  const money = watch("money");
  const moneyIcon = (
    <FontAwesome5 name="search-dollar" size={16} color={Colors.primaryColor} />
  );

  const onChangeText = async (value: string, type: string) => {
    /* if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }*/
    if (type === "departure") {
      setCurrentSearch(type);
      setDepartureValue(value);
    }
    if (type === "destination") {
      setCurrentSearch(type);
      setDestanationValue(value);
    }
    setShowSearch(true);
    /*typingTimeoutRef.current = setTimeout(async () => {*/
    await search();
    /*}, 1000);*/
  };

  const handleBlur = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      //setResults([]);
    }
  };

  const selectPlace = async (item: PlaceProps) => {
    if (currentSearch === "departure") {
      await dispatch(setDeparture(item))
        .unwrap()
        .then(async (data) => {
          setDepartureValue(data!.properties.name);
        });
    }
    if (currentSearch === "destination") {
      await dispatch(setDestination(item))
        .unwrap()
        .then(async (data) => {
          setDestanationValue(data!.properties.name);
        });
    }
    setResults([]);
    setShowSearch(false);
  };

  

  const search = async () => {
    setIsLoading(true);
    if (currentSearch === "departure") {
      await searchPlace(departureValue)
        .then((data) => {
          data.unshift(localisationState.currentLocation!);
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showError(JSON.stringify(error));
        });
    }
    if (currentSearch === "destination") {
      await searchPlace(destinationValue)
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          showError(JSON.stringify(error));
        });
    }
  };

  const gosearch = () => {
    navigation.navigate("ResultSearch", {
      nbSeat: nb,
      price: money,
    });
  };

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

  

  const clearSearch = async (type: string) => {
    setIsLoading(false);
    setResults([]);
    switch (type) {
      case "departure":
        setDepartureValue("");
        dispatch(setDeparture(null));
        break;
      case "destination":
        setDestanationValue("");
        dispatch(setDestination(null));
        break;
    }
  };

  const getRouting = async () => {
  if (localisationState.departure && localisationState.destination) {
    await makeRouting({
      stops: [
        {
          lat: localisationState.departure?.geometry.coordinates[1]!,
          lon: localisationState.departure?.geometry.coordinates[0]!,
        },
        {
          lat: localisationState.destination?.geometry.coordinates[1]!,
          lon: localisationState.destination?.geometry.coordinates[0]!,
        },
      ],
      isPathRequest: true,
      responseType: "GEOJSON",
      includeInstructions: true,
    })
      .then((data) => {
        setRouting(data);
      })
      .catch((error) => {
        showError(error);
      });
  }
}

useEffect(() => {
  getRouting();
}, [localisationState]);
  return (
    <View style={[styles.containerBoxSearch]}>
      {showSearch && (
        <TouchableOpacity
          style={[styles.shadowProp, styles.closeBtn]}
          onPress={() => setShowSearch(false)}
        >
          <Ionicons name="close" size={25} color={Colors.primaryColor} />
        </TouchableOpacity>
      )}
      {!showSearch && (
        <TouchableOpacity
          style={[
            styles.shadowProp,
            styles.closeBtn,
            {
              backgroundColor: Colors.primaryColor,
              top: 0,
            },
          ]}
          onPress={() => setBoxVisble(false)}
        >
          <Ionicons name="close" size={25} color={Colors.secondaryColor} />
        </TouchableOpacity>
      )}

      {isLoading && showSearch ? (
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
      ) : !localisationState.destination &&
        results.length === 0 &&
        showSearch ? (
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
      ) : results.length > 0 && showSearch ? (
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
      {boxVisble && (
        <View ref={bottomBoxRef} style={[settingState.setting.isDarkMode ? styles.bottomBox_DARK : styles.bottomBox, styles.shadowProp]}>
          <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>Hi Traveller</Text>
          <Text style={[settingState.setting.isDarkMode ? styles.description_DARK : styles.description]}>Where are you going today ?</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={[settingState.setting.isDarkMode ? styles.inputContainer_DARK : styles.inputContainer, { width: "49%" }]}>
              <Ionicons
                name="ios-locate"
                size={18}
                color={Colors.primaryColor}
              />
              <View style={[styles.innerInputContainer]}>
                <TextInput
                  placeholder="Departure"
                  placeholderTextColor={Colors.grayTone2}
                  style={settingState.setting.isDarkMode ? styles.input_DARK : styles.input}
                  onBlur={handleBlur}
                  onChangeText={(text) => onChangeText(text, "departure")}
                  value={localisationState.departure ? localisationState.departure!.properties.name : departureValue}
                />
              </View>
              {departureValue != "" && (
                <TouchableOpacity onPress={() => clearSearch("departure")}>
                  <Ionicons name="close" size={18} color={Colors.grayTone2} />
                </TouchableOpacity>
              )}
            </View>
            <View style={[settingState.setting.isDarkMode ? styles.inputContainer_DARK : styles.inputContainer, { width: "49%" }]}>
              <Ionicons
                name="location-outline"
                size={18}
                color={Colors.secondaryColor}
              />
              <View style={[styles.innerInputContainer]}>
                <TextInput
                  placeholder="Destination"
                  placeholderTextColor={Colors.grayTone2}
                  style={settingState.setting.isDarkMode ? styles.input_DARK : styles.input}
                  onChangeText={(text) => onChangeText(text, "destination")}
                  onBlur={handleBlur}
                  value={localisationState.destination ? localisationState.destination!.properties.name : destinationValue}
                />
              </View>
              {destinationValue != ""  && (
                <TouchableOpacity onPress={() => clearSearch("destination")}>
                  <Ionicons name="close" size={18} color={Colors.grayTone2} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "stretch",
              marginTop: 5,
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "32%" }}>
            <SeatInput nb={nb} setNb={setNb} />
            </View>
            <View style={{ width: "32%" }}>
              <CustomInput
                placeholder="Budget"
                name="money"
                control={control}
                secureTextEntry={false}
                sufixType="text"
                prefix={moneyIcon}
                bgColor={settingState.setting.isDarkMode ? Colors.darkTone4 : Colors.whiteTone3}
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

            <View
              style={{
                width: "32%",
              }}
            >
              <CustomButton
                bgColor={Colors.primaryColor}
                fgColor="#fff"
                isReady={localisationState.departure != null && localisationState.destination != null && money}
                onPress={gosearch}
                text="recherche"
                marginVertical={0}
                fontSize={13}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeBottomBox;

const styles = StyleSheet.create({
  innerInputContainer: {
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 10,
    backgroundColor: Colors.whiteTone3,
  },
  inputContainer_DARK: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 10,
    backgroundColor: Colors.darkTone4,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.grayTone1,
    fontFamily: "Poppins_300Light",
    fontSize: 13,
  },
  input_DARK: {
    flex: 1,
    height: 40,
    color: Colors.onPrimaryColor,
    fontFamily: "Poppins_300Light",
    fontSize: 13,
  },
  title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 18,
    textAlign: "left",
    color: Colors.onWhiteTone,
  },
  title_DARK: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: 18,
    textAlign: "left",
    color: Colors.onPrimaryColor,
  },
  description: {
    fontFamily: "Poppins_300Light",
    textAlign: "left",
    color: Colors.grayTone1,
    fontSize: 14,
    marginBottom: 10,
  },
  description_DARK: {
    fontFamily: "Poppins_300Light",
    textAlign: "left",
    color: Colors.onPrimaryColor,
    fontSize: 14,
    marginBottom: 10,
  },
  bottomBox: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.whiteTone2,
    position: "relative",
  },
  bottomBox_DARK: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.darkTone1,
    position: "relative",
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 4,
    borderRadius: 10,
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
  searchBox_DARK: {
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    backgroundColor: Colors.darkTone1,
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
  closeBtn: {
    position: "absolute",
    zIndex: 99999,
    top: 5,
    right: 5,
    backgroundColor: Colors.secondaryColor,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
