import 'react-native-gesture-handler';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_700Bold, Poppins_900Black, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import React from 'react';
import { AuthProvider } from '@context/AuthContext';
import AppNavigator from '@navigators/AppNavigator';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold, 
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
  });
  
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthProvider>
        <AppNavigator/>
    </AuthProvider>
  );
}

