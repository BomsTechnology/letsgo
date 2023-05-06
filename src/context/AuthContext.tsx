import React, {createContext, useState, useEffect} from "react";
import  axios from 'axios';
import { getDeviceId, getManufacturer, getDeviceName, getBundleId, getModel } from 'react-native-device-info';
import AsyncStorage from "@react-native-async-storage/async-storage";


export interface AuthContextProps {
    isLoading: boolean;
    isFirstOpen: boolean;
    userAccessToken: string | null;
    userRefreshToken: string | null;
    login: (phoneNumber: string, userType: string) => Promise<{ status: string, verificationId: string }>;
    verifyCode: (verificationId: string, code: string) => Promise<{access_token?: string, refresh_token?: string, error?: string, error_description?: string}>;
    logout: () => Promise<void>;
    isLoggedIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFirstOpen, setIsFirstOpen] = useState<boolean>(true);
    const [userAccessToken, setUserAccessToken] = useState<string | null>(null);
    const [userRefreshToken, setUserRefreshToken] = useState<string | null>(null);

    const login = async (phoneNumber: string, userType: string): Promise<{ status: string, verificationId: string }> => {
        let data = {
            "phoneNumber": phoneNumber,
            "userType": userType,
            "deviceManufacturer" : "Itel",
            "deviceModel" : "ItelA56",
            "bundleId" : "aaaaaa",
            "deviceName" : "ItelA56", 
            "deviceId" : "aakfkfkfnekfnekfnenfnfsn" 
        };
        let responseData = null;

        await axios.post('http://172.16.1.205:9000/api/v0/register/mobile/phone', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                responseData = response.data;
            })
            .catch((error) => {
                console.log('Error: ' + error.message);
            });
            return responseData!;
    };

    const verifyCode = async (verificationId: string, code: string): Promise<{access_token?: string, refresh_token?: string, error?: string, error_description?: string}> => {
        let data = {
            "verification_id" : verificationId,
            "verification_code" : code, 
            "device_id" : "aakfkfkfnekfnekfnenfnfsn" 
        };
        let responseData = null;

        await axios.post('http://172.16.1.205:9000/api/v0/auth/sms/code/verify', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setIsFirstOpen(true);
                setUserAccessToken(response.data.access_token);
                AsyncStorage.setItem('userAccessToken', response.data.access_token);
                setUserRefreshToken(response.data.refresh_token);
                AsyncStorage.setItem('userRefreshToken', response.data.refresh_token);
            })
            .catch((error) => {
                responseData = error.response.data;
            });
            return responseData!;
    };

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        setUserAccessToken(null);
        setUserRefreshToken(null);
        AsyncStorage.removeItem('userAccessToken');
        AsyncStorage.removeItem('userRefreshToken');
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        setIsLoading(true);
        try {
            setIsLoading(true);
            let userAccessToken = await AsyncStorage.getItem('userAccessToken');
            let userRefreshToken = await AsyncStorage.getItem('userRefreshToken');
            setIsFirstOpen(false);
            setUserAccessToken(userAccessToken);
            setUserRefreshToken(userRefreshToken);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('isLogged in error' + error);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);
    
    return (
        <AuthContext.Provider value={{isLoading, userAccessToken, userRefreshToken, login, verifyCode, logout, isLoggedIn, isFirstOpen}} >
            {children}
        </AuthContext.Provider>
    );
}