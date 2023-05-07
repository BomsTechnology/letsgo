import React, { useEffect, useState, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '@constants/colors';
import CustomButton from '@components/buttons/CustomButton';
import StepHeader from '@components/StepHeader';
import CustomPhoneNumberInput from '@components/inputFields/CustomPhoneNumberInput';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import { countryCodeProps } from "@data/CountryCode"
import {useForm, FieldValues} from 'react-hook-form';
import CheckboxField from '@components/inputFields/CheckboxField';
import { AuthContext } from '../../context/AuthContext';
import { ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigators/AuthStackNavigator';
import LoadingButton from '@components/buttons/LoadingButton';


const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [selectedCountry, setSelectedCountry] = useState<countryCodeProps | undefined>(undefined);
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const numberPhone = watch("phonenumber");

  const signin = async () => {
    setLoading(true);
    let phoneNumber = `${selectedCountry!.callingCode}${numberPhone}`;
    let res = await login(phoneNumber, 'POLLER'); 
    setLoading(false);
    navigation.navigate('OTP', {
      verificationId: res.verificationId
    })
  }; 


  return (
    <SafeAreaView style={styles.container}>
      
        <StepHeader elementsNumber={3} currentStep={1} />
        <Text style={styles.title}>What's your phone number ?</Text>
        <Text style={styles.description}>Will send you a verification code</Text>
        <CustomPhoneNumberInput 
            setSelectedCountry={setSelectedCountry}
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
          
          { !loading ? 
              <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={numberPhone && isChecked}
                onPress={handleSubmit(signin)}
                marginVertical={10}
                text="Send a verification code"
              /> :
              <LoadingButton />
          }

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


        <CheckboxField 
          text="By Checking this box, I agree to be terms of use and acknowledge the privacy note"
          isChecked={isChecked}
          setChecked={setChecked}
          />
      
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