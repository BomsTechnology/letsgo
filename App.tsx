import 'react-native-gesture-handler';

import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SignUpScreen from './screens/SignUpScreen';
import TabNavigator from './navigators/TabNavigator';
import {Text, StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

interface TextWithDefaultProps extends Text {
  defaultProps?: { fontFamily?: string };
}

//((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
//((Text as unknown) as TextWithDefaultProps).defaultProps!.fontFamily = '';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store} >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabNav" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
