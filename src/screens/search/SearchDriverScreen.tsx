import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Driver } from "@mytypes/DriverProps";
import { useNavigation } from "@react-navigation/core";
import { AppStackParamList } from "@navigators/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TripInfoCard from "@components/cards/TripInfoCard";
import { searchDriver } from "@services/useSearch";
import { showError } from "@functions/helperFunctions";

const SearchDriverScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState<Driver[]>([]);
  const [page, setPage] = React.useState(1);
  const [isSearch, setIsSearch] = React.useState(false);
  const [isFullSearch, setIsFullSearch] = React.useState(false);
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const onChangeText = async (value: string) => {
    setPage(1);
    setIsFullSearch(false);
    setIsSearch(true);
    setSearchValue(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      setResults([]);
      setLoading(true);
      console.log(page);
      await searchDriver({ query: value, page: page })
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          showError(error.message);
          setLoading(false);
        });
    }, 1000);
  };

  const searchMores = async () => {
    if (!isFullSearch) {
      setLoading(true);
      console.log(page);
      await searchDriver({ query: searchValue, page: page + 1 })
        .then((data) => {
          setPage(page + 1);
          if (data.length > 0) {
            setResults([...results, ...data]);
          } else {
            setIsFullSearch(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          showError(error.message);
          setLoading(false);
        });
    }
  };
  const geToDriver = (driver: Driver) => {
    navigation.navigate("DriverDetail", {
      driver: driver
    });
  };
  return (
    <View style={styles.container}>
      <View style={[styles.box]}>
        <View style={[styles.inputContainer, { width: "100%" }]}>
          <Ionicons name="person" size={18} color={Colors.primaryColor} />
          <View style={[styles.innerInputContainer]}>
            <TextInput
              placeholderTextColor={Colors.grayTone2}
              style={styles.input}
              value={searchValue}
              onChangeText={onChangeText}
              placeholder="Search"
            />
          </View>
        </View>
      </View>
      {results.length > 0 && (
        
            <View style={{ width: "100%", height: "auto" }}>
              <FlatList
                data={results}
                renderItem={({ item }: { item: Driver }) => (
                  <TripInfoCard
                    onPress={() =>  geToDriver(item)}
                    label={"Driver"}
                    info1={item.businessName}
                    image={item.picture}
                    rate={item.score?.starCount!}
                    title={item.firstName || item.lastName || item.businessName!}
                  />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                keyExtractor={(item, i) => i.toString()}
                onEndReached={searchMores}
              />
            </View>
          )}
          {results.length == 0 && loading == true && (
            <View style={{ height: 10 }}></View>
          )}
          {loading == true && (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                backgroundColor: Colors.whiteTone1,
              }}
            >
              <ActivityIndicator size="large" color={Colors.primaryColor} />
            </View>
          )}
          {isSearch && results.length == 0 && loading == false && (
            <View
              style={{
                width: "100%",
                paddingVertical: 10,
                marginVertical: 10,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontFamily: "Poppins_300Light" }}>No Result</Text>
            </View>
          )}
        </View>
  );
};

export default SearchDriverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
  box: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.whiteTone2,
    borderRadius: 10,
    padding: 10,
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
});
