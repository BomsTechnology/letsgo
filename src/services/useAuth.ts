import { loginSuccess, loginFailure, logout, loadingStart, otpSendSuccess, toogleIsFirstLogin    } from "@store/features/auth/authSlice";
import { AppThunk, AppDispatch, RootState } from "@store/store";
import { API_BASE_URL } from "@config";
import axios from "axios";
import { getUserInfo } from '@services/useUser';
import { getDeviceId, getManufacturer, getDeviceName, getBundleId, getModel } from 'react-native-device-info';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const login = (phoneNumber: string): AppThunk => async (dispatch) => {
    let data = {
        "phoneNumber": phoneNumber,
        "userType": 'USER',
        "deviceManufacturer" : "Itel",
        "deviceModel" : "ItelA56",
        "bundleId" : "aaaaaa",
        "deviceName" : "ItelA56", 
        "deviceId" : "aakfkfkfnekfnekfnenfnfsn" 
    };
    dispatch(loadingStart());
    await axios.post( API_BASE_URL + 'register/mobile/phone', data)
    .then((response) => {
        console.log(response.data.verificationId)
        dispatch(otpSendSuccess({ verificationId: response.data.verificationId }));
    })
    .catch((error) => {
        console.log('Error: ' + error.message);
        dispatch(loginFailure());
    });
        
};

export const verifyOTP = (code: string, verificationId: string): AppThunk => async (dispatch) => {
    let data = {
        "verification_id" : verificationId,
        "verification_code" : code, 
        "device_id" : "aakfkfkfnekfnekfnenfnfsn" 
    };
    console.log(data)
    dispatch(loadingStart());
    await axios.post(API_BASE_URL + 'auth/sms/code/verify', data)
    .then((response) => {
        AsyncStorage.setItem('token', JSON.stringify(response.data));
        dispatch(loginSuccess(response.data));
        console.log(response.data)
    })
    .catch((error) => {
        console.log('Error: ' + error.message);
        dispatch(loginFailure());
    });
       
};
  
export const signOut = (): AppThunk => async (dispatch) => {
    dispatch(loadingStart());
    dispatch(logout());
    AsyncStorage.removeItem('token');
};

export const checkToken = (): AppThunk => async (dispatch): Promise<boolean> => {
    dispatch(loadingStart());
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch(loginSuccess(JSON.parse(token)));
        dispatch(toogleIsFirstLogin());
        return true;
    } else {
        await AsyncStorage.removeItem('token');
        dispatch(logout());
        return false;
    }
    
};