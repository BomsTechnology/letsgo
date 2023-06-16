import 'react-native-gesture-handler';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_700Bold, Poppins_900Black, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import React from 'react';
import AppNavigator from '@navigators/AppNavigator';
import { View, useColorScheme } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@store/store';

export default function App() {
  const colorScheme = useColorScheme();
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
      <View style={{flex:1}}>
        <Provider store={store} >
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <StatusBar style="auto" />
                <AppNavigator/>
            </ThemeProvider>
        </Provider>
        <FlashMessage position="bottom" />
      </View>
  );
}

