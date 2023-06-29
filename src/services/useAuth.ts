import { AuthStateTokenProps } from "@store/features/auth/authSlice";
import { API_BASE_URL } from "@config";
import axios from "axios";
import {
  getDeviceId,
  getManufacturer,
  getDeviceName,
  getBundleId,
  getModel,
} from "react-native-device-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendOTP = createAsyncThunk<string, string>(
  "auth/sendOTP",
  async (phoneNumber: string) => {
    let data = {
      phoneNumber: phoneNumber,
      deviceManufacturer: "Itel",
      deviceModel: "ItelA56",
      bundleId: "aaaaaa",
      deviceName: "ItelA56",
      deviceId: "aakfkfkfnekfnekfnenfnfsn",
      deviceOs: "IOS",
    };
    try {
      const response = await axios.post<{
        status: string;
        verificationId: string;
      }>(API_BASE_URL + "register/mobile/phone", data);
      if (response.data) {
        return response.data.verificationId;
      } else {
        throw new Error(
          'La réponse est vide ou ne contient pas de propriété "data".'
        );
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error_code}`
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
    device_id: "aakfkfkfnekfnekfnenfnfsn",
  };
  try {
    const response = await axios.post<AuthStateTokenProps>(
      API_BASE_URL + "auth/sms/code/verify",
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
      `Une erreur s'est produite : ${error.response.data.error_code}`
    );
  }
});

export const logout = createAsyncThunk<void, string>(
  "auth/logout",
  async (token: string) => {
    try {
      let response = await axios.get(API_BASE_URL + "logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("user");
      } else {
        throw new Error("Déconnexion impossible.");
      }
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la déconnexion : ${error.response.data.error_code}`
      );
    }
  }
);

export const checkAuth = createAsyncThunk<AuthStateTokenProps, void>(
  "auth/checkAuth",
  async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
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
