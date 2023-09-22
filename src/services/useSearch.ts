import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaceProps } from "@mytypes/PlaceProps";
import axios from "axios";
import { Driver } from "@mytypes/DriverProps";
import axiosClient from "@config";

const SEARCH_URL = '/search';

export interface SearchField {
  query: string,
  page?: number,
}

export const searchPlace = async (place: string) : Promise<PlaceProps[]> => {
  const api = `https://photon.komoot.io/api/?q=${encodeURI(place)}&lang=en`;

  return new Promise((resolve) => {
    axios
      .get<{
        type: string;
        features: PlaceProps[];
      }>(api)
      .then((response) => {
        resolve(response.data.features);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const searchDriver = async (data: SearchField) => {

  return new Promise<Driver[]>(async (resolve, reject) => {

      const response = await axiosClient.post<Driver[]>(SEARCH_URL + '/driver', data);
      
      if (response.data != undefined) {

          return resolve(response.data);

      } else {

          return reject(new Error("Une erreur réseau s'est produite"))
      }

  })
}


export const setDeparture = createAsyncThunk<PlaceProps | null, PlaceProps | null>(
    "localization/setDeparture",
    async (place: PlaceProps | null) => {
        return place;
    }
);

export const setDestination = createAsyncThunk<PlaceProps | null, PlaceProps | null>(
    "localization/setDestination",
    async (place: PlaceProps | null) => {
        return place;
    }
);