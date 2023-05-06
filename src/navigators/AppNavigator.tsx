import { store } from '@store/store';
import { Provider } from 'react-redux';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import { ActivityIndicator, View, useColorScheme } from 'react-native';
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import AppStackNavigator from '@navigators/AppStackNavigator';
import AuthStackNavigator from '@navigators/AuthStackNavigator';
import { AuthContext } from '@context/AuthContext';
import AppFirstOpenStackNavigator from './AppFirstOpenStackNavigator';

const AppNavigator = () => {
    const colorScheme = useColorScheme();
    const { isLoading, userAccessToken, userRefreshToken, isFirstOpen } = useContext(AuthContext);

    if(isLoading) {
       return (<View style={{ flex:1, justifyContent: 'center', alignItems:'center' }}>
            <ActivityIndicator size={'large'} />
        </View>)
    }
    return (
            <Provider store={store} >
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <StatusBar style="auto" />
                    <NavigationContainer>
                    <QueryClientProvider client={queryClient}>
                       { !isFirstOpen && userAccessToken !== null ?
                            <AppStackNavigator /> :
                            userAccessToken !== null ?
                            <AppFirstOpenStackNavigator /> :
                            <AuthStackNavigator /> 
                        }
                    </QueryClientProvider>
                    </NavigationContainer>
                </ThemeProvider>
            </Provider>
    );
}

export default AppNavigator;