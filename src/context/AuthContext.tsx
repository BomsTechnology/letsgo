import React, {createContext, useState, useEffect} from "react";
import  axios from 'axios';
import { getDeviceId, getManufacturer, getDeviceName, getBundleId, getModel } from 'react-native-device-info';
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface AuthContextProps {
    isLoading: boolean;
    isFirstOpen: boolean;
    userToken: string | null;
    login: (phoneNumber: string, userType: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);
    const [userToken, setUserToken] = useState<string | null>(null);

    const login = async (phoneNumber: string, userType: string): Promise<void> => {
        setIsLoading(true);
        let data = {
            "phoneNumber": phoneNumber,
            "userType": userType,
            "deviceManufacturer" : "Itel",
            "deviceModel" : "ItelA56",
            "bundleId" : "aaaaaa",
            "deviceName" : "ItelA56", 
            "deviceId" : "aakfkfkfnekfnekfnenfnfsn" 
        };
        console.log(data)
        await axios.post('http://localhost:9000/api/v0/register/mobile/phone', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                //setUserToken('token');
                //AsyncStorage.setItem('userToken', 'token');
                //setIsLoading(false);
                console.log(response);
            })
            .catch((error) => {
                console.log('Error: ' + error.message);
                setIsLoading(false);
            });
    };

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setIsFirstOpen(false);
            setUserToken(userToken)
            setIsLoading(false);
        } catch (error) {
            console.log('isLogged in error' + error);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
    
    return (
        <AuthContext.Provider value={{isLoading, userToken, login, logout, isLoggedIn, isFirstOpen}} >
            {children}
        </AuthContext.Provider>
    );
}