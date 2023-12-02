import axiosClient, { API_BASE_URL } from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import UserProps from "../types/UserProps";
import useFile from "./useFile";

const PREFIX_URL = "AUTH-SERVICE/api/v0/";

export const createPoolerAccount = createAsyncThunk<UserProps, void>(
  "user/createPoolerAccount",
  async () => {
    try {
      const response = await axiosClient.post(
        PREFIX_URL + "business/subscribe/letsgo/poller"
      );

      if (response) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error} create pooler account`
      );
    }
  }
);

export const getUserInfo = createAsyncThunk<UserProps, void>(
  "user/getUserInfo",
  async () => {
    try {
      const response = await axiosClient.get(PREFIX_URL + "userinfo");
      if (response) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      throw new Error(
        `Une erreur s'est produite : ${error.response.data.error} get user info`
      );
    }
  }
);

export const updateUserInfo = createAsyncThunk<
  UserProps,
  {
    profile: UserProps;
    file: { name: string; file: Blob } | null;
    removeAvatar: boolean;
  }
>(
  "user/updateUserInfo",
  async (data: {
    profile: UserProps;
    file: { name: string; file: Blob } | null;
    removeAvatar: boolean;
  }) => {
    const { uploadFile, getFile } = useFile();
    try {
      if (data.file != null) {
        let file = new File(
          [data.file.file],
          `${new Date().getTime()}_${data.file.name}`
        );
        await uploadFile(file, "pooler/avatar");
        let res = await getFile(`${"pooler/avatar"}/${file.name}`);
        if (res.status == "success") data.profile.picture = res.response;
      } else if (data.removeAvatar) {
        data.profile.picture = "";
      }
      console.log('picture: ',data.profile.picture)
      console.log('data: ',data.profile)
      const response = await axiosClient.put(
        PREFIX_URL + "userinfo",
        data.profile,
        {}
      );
      if (response && response.data != undefined) {
        console.log('response', response.data)
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error("Une erreur réseau s'est produite");
      }
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `Une erreur s'est produite : ${error.response.data.error}`
        );
      } else {
        throw new Error(`Une erreur s'est produite`);
      }
    }
  }
);
