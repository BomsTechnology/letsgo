import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import CustomButton from '../../components/buttons/CustomButton';
import StepHeader from '../../components/StepHeader';
import CustomPhoneNumberInput from '../../components/inputFields/CustomPhoneNumberInput';
import Checkbox from 'expo-checkbox';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { countryCodeProps } from "../../data/CountryCode"
import {useForm, FieldValues} from 'react-hook-form';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<countryCodeProps | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const numberPhone = watch("phonenumber");

  const login = () => {
    navigation.navigate('OTP' as never);
  }; 


  return (
    <SafeAreaView style={styles.container}>
      
        <StepHeader elementsNumber={4} currentStep={1} />
        <Text style={styles.title}>What's your phone number ?</Text>
        <Text style={styles.description}>Well text you a verification code</Text>
        <CustomPhoneNumberInput 
            selectedCountry={selectedCountry}  
            placeholder="Enter your Phone number"
            name="phonenumber"
            control={control}
            rules={{
              required: 'Phone number is required',
              minLength: {
                value: 9,
                message: 'Phone number should be least 9 characters long',
              },
              maxLength: {
                value: 9,
                message: 'Phone number should be max 9 characters long',
              },
            }}
          />
            <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={numberPhone && isChecked}
                onPress={handleSubmit(login)}
                text="Send a verification code"
              />

        <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginVertical: 10
           }}>

        <TouchableOpacity
          style={{ 
            flexDirection: 'row'
           }}
        >
          <Text style={{ 
              color: Colors.grayTone1,
              fontFamily: 'Poppins_500Medium',
              fontSize: 14
           }}>Terms of use</Text>
          <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.grayTone1}
                /> 
        </TouchableOpacity>
        <TouchableOpacity
          style={{ 
            flexDirection: 'row'
           }}
        >
          <Text style={{ 
              color: Colors.grayTone1,
              fontFamily: 'Poppins_500Medium',
              fontSize: 14
           }}>Terms of use</Text>
          <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.grayTone1}
                /> 
        </TouchableOpacity>

        </View>


        <TouchableOpacity
        onPress={() => setChecked(!isChecked)}
        style={{ 
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingHorizontal: 10,
          marginTop: 10
         }}
        >
          <Checkbox
            style={{ 
              width: 15,
              height: 15,
             }}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? Colors.primaryColor : undefined}
          />
          <Text style={[styles.description, {fontSize: 14, paddingHorizontal: 15}]}>
            By Checking this box, I agree to be terms of use and acknowledge the privacy note
          </Text>
        </TouchableOpacity>
      
      </SafeAreaView>
  )
}

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
      fontSize: 16
  },
  paragraph: {
    fontSize: 15,
  },
});

export default LoginScreen;