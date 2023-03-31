import React, { useCallback } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Colors from '../constants/colors'
import { useFonts } from 'expo-font';
import CustomInput from '../components/inputFields/CustomInput';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => { 
  const {height} = useWindowDimensions();

  return (
    <SafeAreaView style={[styles.container, {
      height: height,
    }]}>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
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