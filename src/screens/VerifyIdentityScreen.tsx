import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Colors from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import CustomButton from "@components/buttons/CustomButton";
import { ScrollView } from 'react-native-gesture-handler';
import {useForm, FieldValues} from 'react-hook-form';
import CustomDropdownInput, {
  DropDataProps,
} from "@components/inputFields/CustomDropdownInput";
import DatePicker from "@components/inputFields/DatePicker";
import CustomInput from "@components/inputFields/CustomInput";

const VerifyIdentityScreen = () => {
  const [asError, setAsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [destinationDate, setDestinationDate] = useState(new Date());
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();
  const dataIdentyType: DropDataProps[] = [
    { key: "2", value: "CNI" },
    { key: "3", value: "Passport" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Verify Identity" />
      <ScrollView showsHorizontalScrollIndicator={false}>
      <Text style={styles.title}>
        Which card identity would you want to use?
      </Text>
      <CustomDropdownInput
        placeholder="Select payment option"
        data={dataIdentyType}
        setSelected={setSelected}
        search={false}
        asError={asError}
        errorMessage={errorMessage}
      />
      <Text style={styles.title}>
      Complete your card details
      </Text>
      <Text style={styles.description}>Card ID</Text>
      <CustomInput
        placeholder=""
        name="cardid"
        control={control}
        secureTextEntry={false}
        bgColor={Colors.whiteTone1}
        rules={{
          required: 'The card id is required',
        }}
        />
        <Text style={styles.description}>Delivery Date</Text>
      <DatePicker
        date={destinationDate}
        setDate={setDestinationDate}
        bgColor={Colors.whiteTone1}
        />
        <Text style={styles.description}>Expired Date</Text>
        <DatePicker
        date={departureDate}
        setDate={setDepartureDate}
        bgColor={Colors.whiteTone1}
        />
        <Text style={styles.description}>Delivery Owner</Text>
         <CustomInput
        placeholder=""
        name="adressDestination"
        control={control}
        secureTextEntry={false}
        bgColor={Colors.whiteTone1}
        rules={{
          required: 'The adress is required',
        }}
        />
      <CustomButton
        bgColor={Colors.primaryColor}
        fgColor="#fff"
        isReady={false}
        onPress={() => {}}
        marginVertical={20}
        text="save verification identity"
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyIdentityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
  title: {
    width: "100%",
    fontFamily: "Poppins_600SemiBold",
    marginTop: 20,
    fontSize: 20,
  },
  description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    color: Colors.grayTone1,
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 15
},
});
