import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaceProps } from "../types/PlaceProps";
import axios from "axios";
import RoutingProps, { ParamRouting } from "../types/RoutingProps";
import * as Location from "expo-location";
import myTripSearchSlice from "../store/features/search/myTripSearchSlice";
import { showError } from "@functions/helperFunctions";

export const setCurrLocation = createAsyncThunk<PlaceProps, undefined>(
  "localization/setCurrLocation",
  async () => {
    let place: PlaceProps | null = null;
    await getPermissions().then((data) => {
      place =  {
        type: "CurrentLocation",
        properties: {
          name: "Position actuelle"
        },
        geometry: {
          "coordinates": [
            data.coords.latitude,
            data.coords.longitude
          ],
          "type": "Point"
        }
      };
    });
    return place!;
  }
);

export const makeRouting = createAsyncThunk<RoutingProps, ParamRouting>(
  "localization/makeRouting",
  async (data: ParamRouting) => {
    const url = `http://192.168.1.133:8888/routing/car/?lang=fr'`;

    const response = await axios.post<RoutingProps>(url, data);
    if (response.data) {
      return response.data;
    } else {
      throw new Error(`Route introuvable`);
    }
  }
);


const getPermissions = async (): Promise<Location.LocationObject> => {
  return new Promise(async (resolve, reject) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    showError("Please grant location permission");
    reject();
  }

  const location = await Location.getCurrentPositionAsync({});
  resolve(location);
});
};
