import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import { Image } from "react-native";
import { List } from "react-native-paper";

const FaqScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="FAQs and Help" />
      <Image
        resizeMode="contain"
        source={require("@assets/images/ico_faq.png")}
        style={styles.image}
      />
      <View style={{ width: "100%" }}>
        <List.Section>
          <List.Accordion
            title="Uncontrolled Accordion"
            style={styles.listAccordion}
            titleStyle={styles.listAccordionTitle}
          >
            <List.Item
              title="First item"
              style={styles.listItem}
              titleStyle={styles.listItemTitle}
            />
          </List.Accordion>
          <List.Accordion
            title="Uncontrolled Accordion"
            style={styles.listAccordion}
            titleStyle={styles.listAccordionTitle}
          >
            <List.Item
              title="First item"
              style={styles.listItem}
              titleStyle={styles.listItemTitle}
            />
          </List.Accordion>
        </List.Section>
      </View>
    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    padding: 20,
    alignItems: "center",
  },
  image: {
    height: 150,
    marginBottom: 10,
  },
  listAccordion: {
    backgroundColor: Colors.whiteTone2,
  },
  listAccordionTitle: {
    fontFamily: "Poppins_500Medium",
    color: Colors.grayTone1,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayTone3,
  },
  listItemTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
});
