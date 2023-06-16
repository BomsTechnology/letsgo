import { Keyboard, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Colors from '@constants/colors';
import StepHeader from '@components/StepHeader';
import OTPInput from '@components/inputFields/OTPInput';
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '@components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/core';
import { AppStackParamList } from '@navigators/AppNavigator';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingButton from '@components/buttons/LoadingButton';
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { showError, showSuccess } from '@functions/helperFunctions';
import { login, verifyOTP } from '@services/useAuth';


type Props = NativeStackScreenProps<AppStackParamList, 'OTP'>;
const OTPScreen = ({route}: Props) => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const insets = useSafeAreaInsets();
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(120);

  const maximumCodeLength = 6;
  const verify = async () => {
    dispatch(verifyOTP(otpCode, authState.verificationId!));
    if(!authState.loading && authState.error){
      showError(authState.error);
    }else if(!authState.loading && !authState.error){
      showSuccess('Connexion reussi :)');
      //navigation.replace("FavoriteDestination");
    }
  };

  const goBack = async () => {
    navigation.replace("Login", {phoneNumber: route.params.phoneNumber});
  };

  const resend = () => { 
    if(canResend == true){
      dispatch(login(route.params.phoneNumber));
      if(!authState.loading && authState.error){
        showError(authState.error);
      }else if(!authState.loading && !authState.error){
        setCanResend(false);
        showSuccess('Code de vérification envoyé avec succès !');
        setSecondsLeft(120);
      }
    }
  }; 

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      }else{
        setCanResend(true);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
      <Pressable style={[styles.container, {paddingTop: insets.top + 40,
        paddingBottom: insets.bottom + 40}]} onPress={Keyboard.dismiss}>
      <StepHeader elementsNumber={3} currentStep={2} />
      
      <Text style={styles.title}>What's the code?</Text>
      <Text style={styles.description}>Type the 4-digit code we just sent to *****{route.params.phoneNumber.substring(route.params.phoneNumber.length - 4)}</Text>
      <TouchableOpacity onPress={goBack} >
        <Text style={{ 
          color: Colors.secondaryColor,
          fontFamily: 'Poppins_500Medium',
          fontSize: 14,
          marginVertical:10
        }}>Not your phone's number ?</Text>
       </TouchableOpacity>

      <OTPInput 
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={maximumCodeLength}
        setIsPinReady={setIsPinReady}
       />
      <StatusBar style="auto" />

       <TouchableOpacity onPress={resend} style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <Text style={{ fontFamily: 'Poppins_300Light',  fontSize: 14,}}>Didn't receive it ?</Text>
           <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, marginLeft: 5}}>
            Resend in
            {minutes < 10 ? ` 0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text> 
       </TouchableOpacity>

       { !authState.loading ? 
      <CustomButton 
            bgColor={Colors.primaryColor}
            fgColor='#fff'
            isReady={isPinReady}
            onPress={verify}
            text="Verify it now"
          /> :
          <LoadingButton />
      }
      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingHorizontal: 20,
    
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
});

export default OTPScreen;