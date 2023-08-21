import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@constants/colors";
import { useNavigation } from "@react-navigation/core";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";

type Props = NativeStackScreenProps<AppStackParamList, "ResultSearch">;

import CardResultSearch from "@components/cards/CardResultSearchPlaned";
import SimpleHeader from "@components/SimpleHeader";
import NoResult from "@components/NoResult";
import CustomButton from "@components/buttons/CustomButton";
import { makeRouting, setCurrLocation } from "@services/useLocalization";
import {
  searchPlace,
  setDeparture,
  setDestination,
} from "@services/useSearchPlace";
import Constants from "expo-constants";
import { Keyboard } from "react-native";
import { showError } from "@functions/helperFunctions";
import { PlaceProps } from "../../types/PlaceProps";
import { useForm } from "react-hook-form";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import CustomInput from "@components/inputFields/CustomInput";
import SeatInput from "@components/inputFields/SeatInput";
import SearchPlaceItem from "@components/SearchPlaceItem";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

const ResultSearchScreen = ({ route }: Props) => {
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const bottomBoxRef = useRef<View>(null);
  const dispatch = useAppDispatch();
  const [departureValue, setDepartureValue] =
    React.useState("Position Actuelle");
  const [destinationValue, setDestanationValue] = React.useState("");
  const [currentSearch, setCurrentSearch] = React.useState("destination");
  const [results, setResults] = useState<PlaceProps[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [nb, setNb] = useState(route.params.nbSeat);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const { control, handleSubmit, watch, setValue } = useForm();

  const money = watch("money");
  const homeIcon = <Ionicons name="home" size={22} color={Colors.grayTone1} />;
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

  useEffect(() => {
    setValue("money", route.params.price);
    if (!localisationState.departure) {
      getCurrentLocation();
    }
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

  const next = () => {
    navigation.navigate("TripInfo", {
      from: "search",
    });
  };

  const goToPlan = () => {
    navigation.push("TripPlan");
  };

  const getCurrentLocation = async () => {
    await dispatch(setCurrLocation())
      .unwrap()
      .then(async (data) => {
        await dispatch(setDeparture(data))
          .unwrap()
          .then((loc) => {})
          .catch((error) => {
            showError("Une erreur est survenue lors du chargement des données");
          });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader
        LeftbuttonIcon={homeIcon}
        LeftbuttonAction={() => navigation.push("Home")}
        text="Search Trips"
      />
      <View style={[styles.box]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={[styles.inputContainer, { width: "49%" }]}>
            <Ionicons name="ios-locate" size={18} color={Colors.primaryColor} />
            <View style={[styles.innerInputContainer]}>
              <TextInput
                placeholder="Departure"
                placeholderTextColor={Colors.grayTone2}
                style={styles.input}
                onBlur={handleBlur}
                onChangeText={(text) => onChangeText(text, "departure")}
                value={
                  localisationState.departure
                    ? localisationState.departure!.properties.name
                    : departureValue
                }
              />
            </View>
            {departureValue != "" && (
              <TouchableOpacity onPress={() => clearSearch("departure")}>
                <Ionicons name="close" size={18} color={Colors.grayTone2} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[styles.inputContainer, { width: "49%" }]}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.secondaryColor}
            />
            <View style={[styles.innerInputContainer]}>
              <TextInput
                placeholder="Destination"
                placeholderTextColor={Colors.grayTone2}
                style={styles.input}
                onChangeText={(text) => onChangeText(text, "destination")}
                onBlur={handleBlur}
                value={
                  localisationState.destination
                    ? localisationState.destination!.properties.name
                    : destinationValue
                }
              />
            </View>
            {destinationValue != "" && (
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
          <View style={{ width: "49%" }}>
            <SeatInput nb={nb} setNb={setNb} />
          </View>
          <View style={{ width: "49%" }}>
            <CustomInput
              placeholder="Budget"
              name="money"
              control={control}
              secureTextEntry={false}
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
        </View>
      </View>
      <View
        style={{
          position: "relative",
          flex: 1,
        }}
      >
        <View
          style={[
            styles.containerBoxSearch,
            {
              zIndex: showSearch ? 9999 : -1,
            },
          ]}
        >
          {showSearch && (
            <TouchableOpacity
              style={[styles.shadowProp, styles.closeBtn]}
              onPress={() => setShowSearch(false)}
            >
              <Ionicons name="close" size={25} color={Colors.primaryColor} />
            </TouchableOpacity>
          )}

          {isLoading && showSearch ? (
            <View
              style={[
                styles.shadowProp,
                styles.searchBox,
                styles.centerContainer,
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
              ]}
            >
              <FontAwesome5 name="sad-cry" size={50} color={Colors.grayTone2} />
              <Text style={[styles.textBold, { color: Colors.grayTone2 }]}>
                No Result
              </Text>
            </View>
          ) : results.length > 0 && showSearch ? (
            <View style={[styles.shadowProp, styles.searchBox]}>
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
        </View>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 10,
            marginLeft: 5,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Select a Planed trip
        </Text>
        <CardResultSearch onPress={next} />

        {/*   <NoResult 
          message={`There are no trip available to the address ${route.params.destination}`} 
          image={require('@assets/images/traveller.png')}
          actionButton={goToPlan}
          buttonLabel='Plan this trip'
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  box: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.whiteTone2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
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
  input: {
    flex: 1,
    height: 40,
    color: Colors.grayTone1,
    fontFamily: "Poppins_300Light",
    fontSize: 13,
  },
  shadowProp: {
    shadowColor: "#171717",
    elevation: 4,
    backgroundColor: Colors.whiteTone2,
    borderRadius: 10,
  },

  containerBoxSearch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    top: 0,
  },
  searchBox: {
    marginVertical: 10,
    borderRadius: 10,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.whiteTone2,
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

export default ResultSearchScreen;
