import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserProps from "../types/UserProps";

export const createPoolerAccount = createAsyncThunk<UserProps, void>(
  "user/createPoolerAccount",
  async () => {
    try {
      const response = await axiosClient.post(
        "business/subscribe/letsgo/poller"
      );

      if (response.data) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
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
  }
);

export const getUserInfo = createAsyncThunk<UserProps, void>(
  "user/getUserInfo",
  async () => {
    try {
      const response = await axiosClient.get("userinfo");
      if (response.data) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
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
  }
);

export const updateUserInfo = createAsyncThunk<
  UserProps,
  {
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;
    avatar?: string;
    picture?: string;
    keywords?: string;
    userPaymentMode?: string;
  }
>("user/updateUserInfo", async ({
  firstName,
  lastName,
  birthdate,
  avatar,
  picture,
  keywords,
  userPaymentMode,
}) => {
  try {
    let data = {
      firstName: firstName,
      lastName:   lastName,
      birthdate: birthdate,
      avatar: avatar,
      picture: picture,
      keywords: keywords,
      userPaymentMode: userPaymentMode,
    }
    const response = await axiosClient.put("userinfo/updateUser", data);
    if (response.data) {
      AsyncStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } else {
      throw new Error(
        'La réponse est vide ou ne contient pas de propriété "data".'
      );
    }
  } catch (error: any) {
    throw new Error(`Une erreur s'est produite : ${error.response.data.error}`);
  }
});
