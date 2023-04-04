import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepHeader from '../../components/StepHeader';
import CustomButton from '../../components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/inputFields/CustomInput';
import {useForm, FieldValues} from 'react-hook-form';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';

const FavoriteDestinationScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();

  const destination = watch('destination');
  const money = watch('money');
  const destinationIcon = ( <Ionicons name="location-outline" size={20} color={Colors.secondaryColor} /> );
  const moneyIcon = ( <FontAwesome5 name="search-dollar" size={20} color={Colors.primaryColor} /> );
  const save = () => {
    navigation.navigate('ResultSearch' as never);
  }; 

  return (
    <SafeAreaView style={styles.container}>
      <StepHeader elementsNumber={4} currentStep={4} />
      <Text style={styles.title}>Hi Travailler !</Text>

      <Text style={styles.description}>What is your favorite destination</Text>
      <CustomInput
        placeholder="Enter the adress"
        name="destination"
        control={control}
        secureTextEntry={false}
        prefixType='icon'
        prefix={destinationIcon}
        rules={{
          required: 'The adress is required',
        }}
        />

      <Text style={styles.description}>What is your budget usually paid for this destination</Text>
      <CustomInput
        placeholder="300"
        name="money"
        control={control}
        secureTextEntry={false}
        prefixType='icon'
        sufixType='text'
        prefix={moneyIcon}
        keyboardType='numeric'
        sufix="X A F"
        rules={{
          required: 'The price is required',
        }}
        />

      <CustomButton 
          bgColor={Colors.primaryColor}
          fgColor='#fff'
          isReady={destination && money}
          onPress={handleSubmit(save)}
          text="Search"
        />
    </SafeAreaView>
  );
};

export default FavoriteDestinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingHorizontal: 20,
    paddingVertical: 40
},
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 35,
    marginBottom: 15,
    textAlign: 'left',
    color: '#000',
},
description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    color: Colors.grayTone1,
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 15
},
paragraph: {
  fontSize: 15,
},
});