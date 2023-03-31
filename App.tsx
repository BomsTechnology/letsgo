import 'react-native-gesture-handler';

import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_700Bold, Poppins_900Black, Poppins_600SemiBold, Poppins_400Regular, Poppins_300Light} from '@expo-google-fonts/poppins';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { useColorScheme } from 'react-native';
import LoginScreen from './screens/auth/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import TabNavigator from './navigators/TabNavigator';
import OTPScreen from './screens/auth/OTPScreen';
import ResultSearchScreen from './screens/trip/ResultSearchScreen';
import TripInfoScreen from './screens/trip/TripInfoScreen';
import UserRoleScreen from './screens/auth/UserRoleScreen';
import FavoriteDestinationScreen from './screens/auth/FavoriteDestinationScreen';
import PlannerDetailScreen from './screens/planner/PlannerDetailScreen';
import DriverDetailScreen from './screens/driver/DriverDetailScreen';
import VehiculeDetailScreen from './screens/vehicule/VehiculeDetailScreen';
import SeatDetailScreen from './screens/seat/SeatDetailScreen';
const Stack = createNativeStackNavigator();

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
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OnBoarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserRole" component={UserRoleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FavoriteDestination" component={FavoriteDestinationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ResultSearch" component={ResultSearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TripInfo" component={TripInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PlannerDetail" component={PlannerDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DriverDetail" component={DriverDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VehiculeDetail" component={VehiculeDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SeatDetail" component={SeatDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabNav" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
