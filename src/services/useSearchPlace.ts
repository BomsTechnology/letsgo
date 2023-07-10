import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaceProps } from "../types/PlaceProps";
import axios from "axios";

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