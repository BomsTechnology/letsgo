import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { FlatList } from "react-native-gesture-handler";

interface historyItemProps {
  id: string;
  date: string;
  amount: string;
  planner: string;
  driver: string;
}

const TransactionHistoryScreen = () => {
  const transactions = [
    {
      id: "1",
      date: "April 12, 2021",
      amount: "XAF 500",
      planner: "Planner 1",
      driver: "Driver 1",
    },
    {
      id: "2",
      date: "April 12, 2021",
      amount: "XAF 500",
      planner: "Planner 1",
      driver: "Driver 1",
    },
    {
      id: "3",
      date: "April 12, 2021",
      amount: "XAF 500",
      planner: "Planner 1",
      driver: "Driver 1",
    },
  ];
  const historyItem = ({ item }: { item: historyItemProps }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontFamily: "Poppins_400Regular",
            color: Colors.grayTone2,
            fontSize: 15,
            maxWidth: "50%",
          }}
        >
          {item.date}
        </Text>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            maxWidth: "50%",
          }}
        >
          <Text
            style={{
              textAlign: "right",
              fontFamily: "Poppins_500Medium",
              color: Colors.secondaryColor,
              fontSize: 20,
            }}
          >
            {item.amount}
          </Text>
          <Text
            style={{
              textAlign: "right",
              fontFamily: "Poppins_500Medium",
              color: Colors.grayTone2,
              fontSize: 15,
            }}
          >
            {item.planner}, {item.driver}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Transaction History" />
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            height: 60,
            borderRadius: 15,
            width: 150,
            elevation: 10,
            backgroundColor: Colors.whiteTone2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              color: Colors.grayTone1,
              fontSize: 20,
            }}
          >
            XAF 3000
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: Colors.grayTone1,
            fontSize: 16,
            marginTop: 20,
          }}
        >
          As Total Your Payment
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: Colors.grayTone2,
            fontSize: 16,
          }}
        >
          XAF 500 paid for your last trip
        </Text>

        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            color: Colors.grayTone1,
            fontSize: 16,
            marginTop: 40,
            width: "100%",
            textAlign: "left",
          }}
        >
          Recent Payments
        </Text>
        <FlatList
          data={transactions}
          showsHorizontalScrollIndicator={false}
          renderItem={historyItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          style={{ width: "100%", marginTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
});
