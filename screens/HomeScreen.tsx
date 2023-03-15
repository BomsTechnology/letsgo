import React, { useCallback } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Colors from '../constants/colors'
import { useFonts } from 'expo-font';
import { Poppins_500Medium } from '@expo-google-fonts/poppins';
import CustomInput from '../components/CustomInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => { 
  const {height} = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    Poppins_500Medium
  });

  
  const onLayoutRootView = useCallback(async () => {
    /*if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }*/
  }, [fontsLoaded]);
  

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, {
      height: height,
    }]}>

      <CustomInput />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: Colors.primaryShade1,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  text: {
    fontFamily: 'Poppins_500Medium'
  }
});

export default HomeScreen