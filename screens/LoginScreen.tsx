import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, useWindowDimensions, Modal, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_300Light} from '@expo-google-fonts/poppins';
import StepHeader from '../components/StepHeader';
import CustomPhoneNumberInput from '../components/CustomPhoneNumberInput';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { countryCodeProps, countryCodes } from "../data/CountryCode"
const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [isChecked, setChecked] = useState(false);
  const [areas, setAreas] = useState<countryCodeProps[] | null>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArea, setSelectedArea] = useState<countryCodeProps | null>(null);
  const [fontsLoaded] = useFonts({
    Poppins_500Medium, 
    Poppins_800ExtraBold,
    Poppins_300Light
  });

  const login = () => {
    
  }; 

  

  if (!fontsLoaded) {
    return null;
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StepHeader elementsNumber={3} currentStep={1} />
        <Text style={styles.title}>What's your phone number ?</Text>
        <Text style={styles.description}>Well text you a verification code</Text>
        <CustomPhoneNumberInput />
        <CustomButton 
            type="PRIMARY"
            onPress={login}
            text="Send a verification code"
          />
          
        </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.whiteTone1,
      padding: 20
  },
    title: {
      fontFamily: 'Poppins_800ExtraBold',
      fontWeight: '800',
      fontSize: 35,
      marginBottom: 15,
      textAlign: 'left',
      color: '#000',
  },
  description: {
      fontFamily: 'Poppins_300Light',
      textAlign: 'left',
      fontWeight: '300',
      color: Colors.grayTone1,
      fontSize: 16
  },
  
});

export default LoginScreen