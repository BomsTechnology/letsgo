import { AuthStateTokenProps } from "@store/features/auth/authSlice";
import  axiosClient, { API_BASE_URL } from "@config";
import { setUserInfo } from "@store/features/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Device  from 'expo-device';
import axios from "axios";
import SettingProps from "../types/SettingProps";
import { setSetting } from "@store/features/setting/settingSlice";

export const sendOTP = createAsyncThunk<string, string>(
  "auth/sendOTP",
  async (phoneNumber: string) => {
    let data = {
      phoneNumber: phoneNumber,
      deviceManufacturer: Device.manufacturer,
      deviceModel: Device.modelName,
      bundleId: Device.osBuildId,
      deviceName: Device.deviceName,
      deviceId: `${Device.deviceName}-${Device.osBuildId}`,
      deviceOs: Device.osName?.toUpperCase(),
    };
    try {
      const response =  await axiosClient.post<{
        status: string;
        verificationId: string;
      }>("mobile/register/phone", data);
   
      if (response.data) {
        return response.data.verificationId;
      } else {
        throw new Error(
          'La réponse est vide ou ne contient pas de propriété "data".'
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error}`
      );
    }
  }
);

export const verifyOTP = createAsyncThunk<
  AuthStateTokenProps,
  { code: string; verificationId: string }
>("auth/verifyOTP", async ({ code, verificationId }, thunkAPI) => {
  let data = {
    verification_id: verificationId,
    verification_code: code,
    device_id: `${Device.deviceName}-${Device.osBuildId}`,
  };
  try {
    const response = await axiosClient.post<AuthStateTokenProps>(
       "auth/sms/code/verify",
      data
    );
    if (response.data) {
      await AsyncStorage.setItem("token", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error(
        'La réponse est vide ou ne contient pas de propriété "data".'
      );
    }
  } catch (error: any) {
    throw new Error(
      `Une erreur s'est produite : ${error.response.data.error}`
    );
  }
});

export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    try {
     /* let response = await axiosClient.put( `auth/devices/${Device.deviceName}-${Device.osBuildId}/terminate`);
      if (response.data) {*/
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
     /* } else {
        throw new Error("Déconnexion impossible.");
      }*/
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la déconnexion : ${error.response.data.error}`
      );
    }
  }
);

export const checkAuth = createAsyncThunk<AuthStateTokenProps, SettingProps>(
  "auth/checkAuth",
  async (setting, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token && user) {
        thunkAPI.dispatch(setSetting(setting));
        thunkAPI.dispatch(setUserInfo(JSON.parse(user)));
        return JSON.parse(token) as AuthStateTokenProps;
      } else {
        await AsyncStorage.removeItem("token");
        throw new Error(
          `L'utilisateur n'est pas authentifié. Veuillez vous connecter.`
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite lors de la récupération des données`
      );
    }
  }
);
