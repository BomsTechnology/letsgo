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
import { RootState, useAppSelector,  } from "@store/store";

const VerifyIdentityScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
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
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text="Verify Identity" />
      <ScrollView showsHorizontalScrollIndicator={false}>
      <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>
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
      <Text style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}>
      Complete your card details
      </Text>
      <Text style={settingState.setting.isDarkMode ? styles.description_DARK : styles.description}>Card ID</Text>
      <CustomInput
        placeholder=""
        name="cardid"
        control={control}
        secureTextEntry={false}
        bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
        rules={{
          required: 'The card id is required',
        }}
        />
        <Text style={settingState.setting.isDarkMode ? styles.description_DARK : styles.description}>Delivery Date</Text>
      <DatePicker
        date={destinationDate}
        setDate={setDestinationDate}
        bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
        />
        <Text style={settingState.setting.isDarkMode ? styles.description_DARK : styles.description}>Expired Date</Text>
        <DatePicker
        date={departureDate}
        setDate={setDepartureDate}
        bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
        />
        <Text style={settingState.setting.isDarkMode ? styles.description_DARK : styles.description}>Delivery Owner</Text>
         <CustomInput
        placeholder=""
        name="adressDestination"
        control={control}
        secureTextEntry={false}
        bgColor={settingState.setting.isDarkMode ? Colors.darkTone2 : Colors.whiteTone1}
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
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
  title: {
    width: "100%",
    fontFamily: "Poppins_600SemiBold",
    color: Colors.onWhiteTone,
    marginTop: 20,
    fontSize: 20,
  },
  description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    color: Colors.onWhiteTone,
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 15
},
title_DARK: {
  width: "100%",
  fontFamily: "Poppins_600SemiBold",
  color: Colors.onPrimaryColor,
  marginTop: 20,
  fontSize: 20,
},
description_DARK: {
  fontFamily: 'Poppins_300Light',
  textAlign: 'left',
  color: Colors.onPrimaryColor,
  fontSize: 14,
  marginHorizontal: 5,
  marginTop: 15
},
});
