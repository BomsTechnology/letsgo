import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, FieldValues } from "react-hook-form";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import CustomInput from "@components/inputFields/CustomInput";
import DatePicker from "@components/inputFields/DatePicker";
import Colors from "@constants/colors";
import TimePicker from "@components/inputFields/TimePicker";

const TripPlanScheduleScreen = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [departureTime, setDepartureTime] = useState(new Date());

  const [destinationDate, setDestinationDate] = useState(new Date());
  const [destinationTime, setDestinationTime] = useState(new Date());

  const moneyIcon = (
    <FontAwesome5 name="search-dollar" size={20} color={Colors.primaryColor} />
  );
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.secondaryColor,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="location-outline"
              size={25}
              color={Colors.whiteTone2}
            />
          </View>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            Destination
          </Text>
        </View>

        <Text style={styles.description}>Adress</Text>
        <CustomInput
          placeholder="Enter the Adress"
          name="adressDestination"
          control={control}
          secureTextEntry={false}
          bgColor={Colors.whiteTone1}
          rules={{
            required: "The adress is required",
          }}
        />

        <Text style={styles.description}>Date</Text>
        <DatePicker
          date={destinationDate}
          setDate={setDestinationDate}
          bgColor={Colors.whiteTone1}
        />

        <Text style={styles.description}>Budget</Text>
        <CustomInput
          placeholder="Your budget"
          name="money"
          control={control}
          secureTextEntry={false}
          prefixType="icon"
          sufixType="text"
          prefix={moneyIcon}
          keyboardType="numeric"
          sufix="X A F"
          bgColor="#fff"
          rules={{
            required: "The price is required",
          }}
        />

        <Text style={styles.description}>Time</Text>
        <TimePicker
          date={destinationTime}
          setDate={setDestinationTime}
          bgColor={Colors.whiteTone1}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.primaryColor,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="locate" size={25} color={Colors.whiteTone2} />
          </View>
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontSize: 20,
              marginLeft: 10,
            }}
          >
            Departure
          </Text>
        </View>

        <Text style={styles.description}>Adress</Text>
        <CustomInput
          placeholder="Enter the Adress"
          name="adressDeparture"
          control={control}
          secureTextEntry={false}
          bgColor={Colors.whiteTone1}
          rules={{
            required: "The adress is required",
          }}
        />

        <Text style={styles.description}>Date</Text>
        <DatePicker
          date={departureDate}
          setDate={setDepartureDate}
          bgColor={Colors.whiteTone1}
        />

        <Text style={styles.description}>Time</Text>
        <TimePicker
          date={departureTime}
          setDate={setDepartureTime}
          bgColor={Colors.whiteTone1}
        />
        <View style={{ marginVertical: 20 }}></View>
      </ScrollView>
    </View>
  );
};

export default TripPlanScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  description: {
    fontFamily: "Poppins_300Light",
    textAlign: "left",
    color: Colors.grayTone1,
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 15,
  },
});
