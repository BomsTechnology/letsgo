import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { Divider } from "@constants/ComponentStyled";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { KeyWordItemProps, keywords } from "@data/keywords";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { addKeyword, removeKeyword } from "@store/features/user/userSlice";

const KeyWordScreen = () => {
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const toggleKeyword = (keyword: string, action: string) => {
    if(action == 'add'){
      dispatch(addKeyword(keyword))
    }else{
      dispatch(removeKeyword(keyword))
    }
  };

  const KeywordItem: React.FC<KeyWordItemProps> = ({ label, action }) => {
    return (
      <TouchableOpacity
        style={[
          styles.keyWordItem,
          {
            backgroundColor:
              action === "remove" ? Colors.primaryColor : Colors.grayTone3,
          },
        ]}
        onPress={() => toggleKeyword(label, action)}
      >
        <Text style={styles.keyWordItemText}>{label}</Text>
        {action === "remove" && (
          <Ionicons name="close" size={20} color={Colors.whiteTone2} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Keywords" />
      <Image
        resizeMode="contain"
        source={require("@assets/images/ico_keyword.png")}
        style={styles.image}
      />
      <Text style={[styles.minText]}>
        Keywords provide personalized, engaging content, enhancing user
        satisfaction and driving app engagement.
      </Text>
      <ScrollView style={{ width: "100%" }}>
        <Text style={styles.title}>My Keywords</Text>
        <View style={styles.keyWordContainer}>
          {userState.user?.keywords &&
            userState.user?.keywords!.map((item, index) => (
              <KeywordItem key={index} label={item} action="remove" />
            ))}
        </View>
        <Divider style={{ marginTop: 20, marginBottom: 10 }} />
        <Text style={styles.title}>More Keywords</Text>
        <View style={styles.keyWordContainer}>
          {keywords.map((item, index) => {
            if (
              !userState.user?.keywords ||
              !userState.user?.keywords!.includes(item)
            ) {
              return <KeywordItem key={index} label={item} action="add" />;
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KeyWordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    height: 150,
    marginBottom: 10,
  },
  minText: {
    fontFamily: "Poppins_400Regular",
    color: Colors.grayTone2,
    width: "100%",
  },
  title: {
    width: "100%",
    fontFamily: "Poppins_700Bold",
    marginTop: 20,
    fontSize: 20,
  },
  keyWordItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  keyWordItemText: {
    color: Colors.whiteTone2,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  keyWordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 5,
  },
});
