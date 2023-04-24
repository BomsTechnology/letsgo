import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_700Bold, Poppins_900Black, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import StackNavigator from '@navigators/StackNavigator';
const queryClient = new QueryClient();


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
  const colorScheme = useColorScheme();
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store} >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <NavigationContainer>
        <QueryClientProvider client={queryClient}>
            <StackNavigator />
          </QueryClientProvider>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
