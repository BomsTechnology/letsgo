import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import Colors from "@constants/colors";
import { FlatList } from "react-native-gesture-handler";
import { RootState, useAppSelector,  } from "@store/store";

interface historyItemProps {
  id: string;
  date: string;
  amount: string;
  planner: string;
  driver: string;
}

const TransactionHistoryScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
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
        style={styles.historyItem}
      >
        <Text
          style={ settingState.setting.isDarkMode ? styles.historyItemDate_DARK : styles.historyItemDate}
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
            style={styles.historyItemPrice}
          >
            {item.amount}
          </Text>
          <Text
            style={settingState.setting.isDarkMode ? styles.historyItemInfo_DARK : styles.historyItemInfo}
          >
            {item.planner}, {item.driver}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text="Transaction History" />
      <View style={{ alignItems: "center" }}>
        <View
          style={settingState.setting.isDarkMode ? styles.totalPrice_DARK : styles.totalPrice }
        >
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1,
              fontSize: 20,
            }}
          >
            XAF 3000
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1,
            fontSize: 16,
            marginTop: 20,
          }}
        >
          As Total Your Payment
        </Text>
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: settingState.setting.isDarkMode ? Colors.grayTone4 : Colors.grayTone2,
            fontSize: 16,
          }}
        >
          XAF 500 paid for your last trip
        </Text>

        <Text
          style={{
            fontFamily: "Poppins_600SemiBold",
            color: settingState.setting.isDarkMode ? Colors.onPrimaryColor : Colors.grayTone1,
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
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyItemDate: {
    textAlign: "left",
    fontFamily: "Poppins_400Regular",
    color: Colors.grayTone2,
    fontSize: 15,
    maxWidth: "50%",
  },
  historyItemDate_DARK: {
    textAlign: "left",
    fontFamily: "Poppins_400Regular",
    color: Colors.grayTone3,
    fontSize: 15,
    maxWidth: "50%",
  },
  historyItemPrice: {
    textAlign: "right",
    fontFamily: "Poppins_500Medium",
    color: Colors.secondaryColor,
    fontSize: 20,
  },
  historyItemInfo: {
    textAlign: "right",
    fontFamily: "Poppins_500Medium",
    color: Colors.grayTone2,
    fontSize: 15,
  },
  historyItemInfo_DARK: {
    textAlign: "right",
    fontFamily: "Poppins_500Medium",
    color: Colors.grayTone3,
    fontSize: 15,
  },
  totalPrice: {
    height: 60,
    borderRadius: 15,
    width: 150,
    elevation: 10,
    backgroundColor: Colors.whiteTone1,
    alignItems: "center",
    justifyContent: "center",
  },
  totalPrice_DARK: {
    height: 60,
    borderRadius: 15,
    width: 150,
    elevation: 10,
    backgroundColor: Colors.darkTone4,
    alignItems: "center",
    justifyContent: "center",
  }
});
