import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
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

interface optionsProps {
  id: string;
  icon: JSX.Element;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const MoreOptionsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toogleIsDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const options: optionsProps[] = [
    {
      id: "1",
      label: "Dispute Resolution Center",
      icon: (
        <Ionicons
          name="chatbubbles-outline"
          size={25}
          color={Colors.grayTone1}
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
          color={Colors.grayTone1}
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
          color={Colors.grayTone1}
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
          color={Colors.grayTone1}
        />
      ),
      onPress: () => navigation.navigate("InviteFriend"),
    },
  ];

  const optionsItemRender = ({ item }: { item: optionsProps }) => {
    return (
      <TouchableOpacity style={styles.faqItem} onPress={item.onPress}>
        {item.icon}
        <Text style={styles.faqText}>{item.label}</Text>
        <Ionicons
          name="chevron-forward"
          size={30}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="More Options" />
      <TouchableOpacity style={styles.faqItem} onPress={toogleIsDarkMode}>
      <MaterialCommunityIcons
          name="theme-light-dark"
          size={25}
          color={Colors.grayTone1}
        />
      <Text style={styles.faqText}>Theme</Text>
        <View style={styles.faqItem}>
          <Text style={styles.minText}>
            {!isDarkMode ? "White Mode" : "Dark Mode"}
          </Text>
          <Switch
            trackColor={{
              false: Colors.grayTone3,
              true: Colors.primaryShade1,
            }}
            thumbColor={isDarkMode ? Colors.primaryColor : Colors.grayTone2}
            ios_backgroundColor={Colors.grayTone3}
            onValueChange={toogleIsDarkMode}
            value={isDarkMode}
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
  );
};

export default MoreOptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
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
  faqItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  minText: {
    fontFamily: "Poppins_400Regular",
    color: Colors.grayTone3,
  }
});
