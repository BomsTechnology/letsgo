import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import SearchTopTabNavigator from "@navigators/SearchTopTabNavigator";
import Colors from "@constants/colors";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";

type Props = NativeStackScreenProps<AppStackParamList, "SearchScreen">;

const SearchScreen = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const homeIcon = <Ionicons name="home" size={22} color={Colors.grayTone1} />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
      <SimpleHeader
        LeftbuttonIcon={homeIcon}
        LeftbuttonAction={() => navigation.push("Home")}
        text="Search"
      />
      </View>
      <SearchTopTabNavigator />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 20,
  },
});
