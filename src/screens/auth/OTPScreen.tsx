import { Keyboard, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '@constants/colors';
import StepHeader from '@components/StepHeader';
import OTPInput from '@components/inputFields/OTPInput';
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '@components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/core';
import { AuthStackParamList } from '@navigators/AuthStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '@context/AuthContext';
import LoadingButton from '@components/buttons/LoadingButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

const OTPScreen = ({route}: Props) => {
  const navigation = useNavigation();
  const { verifyCode } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const maximumCodeLength = 6;

  const verify = async () => {
    setLoading(true);
    setErrors("");
    let res = await verifyCode(route.params.verificationId, otpCode);
    if(res.error && res.error != ""){
      setErrors(res.error_description!);
    }
    setLoading(false);
  };

  return (
      <Pressable style={[styles.container, {paddingTop: insets.top + 40,
        paddingBottom: insets.bottom + 40}]} onPress={Keyboard.dismiss}>
      <StepHeader elementsNumber={3} currentStep={2} />
      
      <Text style={styles.title}>What's the code?</Text>
      <Text style={styles.description}>Type the 4-digit code we just sent to ****8027</Text>
      <Text style={{ 
        color: Colors.secondaryColor,
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        marginVertical:10
       }}>Not your phone's number ?</Text>

       {errors && <Text style={{ 
          fontFamily: 'Poppins_500Medium',
          fontSize: 14,
          color: Colors.errorInputColor,
          textAlign: 'center',
          marginTop: 10
        }} >{errors}</Text>}

      <OTPInput 
        code={otpCode}
        setCode={setOTPCode}
        maximumLength={maximumCodeLength}
        setIsPinReady={setIsPinReady}
       />
      <StatusBar style="auto" />

       <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <Text style={{ fontFamily: 'Poppins_300Light',  fontSize: 14,}}>Didn't receive it ?</Text>
           <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 14, marginLeft: 5}}>Resend in 02:20</Text> 
       </TouchableOpacity>

       { !loading ? 
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