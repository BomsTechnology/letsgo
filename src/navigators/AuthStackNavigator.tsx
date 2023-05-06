import React from 'react';
import LoginScreen from '@screens/auth/LoginScreen';
import OnboardingScreen from '@screens/OnboardingScreen';
import OTPScreen from '@screens/auth/OTPScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  OTP: { verificationId: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  );
};

export default AuthStackNavigator;