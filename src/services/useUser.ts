import { API_BASE_URL } from "@config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserProps from "../types/UserProps";

export const createPoolerAccount = createAsyncThunk<
  UserProps,
  string
>("user/createPoolerAccount", async (token: string) => {
  try {
    const response = await axios.put( API_BASE_URL + 'pollers/addPoller', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (response.data) {
        AsyncStorage.setItem('user', JSON.stringify(response.data));
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

export const getUserInfo = createAsyncThunk<
  UserProps,
  string
>("user/getUserInfo", async (token: string) => {
  try {
    const response = await axios.get( API_BASE_URL + 'userinfo', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (response.data) {
        AsyncStorage.setItem('user', JSON.stringify(response.data));
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