import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaceProps } from "../types/PlaceProps";
import axios from "axios";
import RoutingProps, { ParamRouting, RouteProps } from "../types/RoutingProps";
import * as Location from "expo-location";
import myTripSearchSlice from "../store/features/search/myTripSearchSlice";
import { showError } from "@functions/helperFunctions";
import { LatLng } from "react-native-maps";

export const setCurrLocation = createAsyncThunk<PlaceProps, undefined>(
  "localization/setCurrLocation",
  async () => {
    let place: PlaceProps | null = null;
    await getPermissions().then(async (location) => {
      await reverseGeocode({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
        .then(async (data) => {
          place = {
            type: "CurrentLocation",
            properties: {
              name: "Position Actuelle",
              country: data[0].country!,
              postcode: data[0].postalCode!,
              street: data[0].street!,
              housenumber: data[0].streetNumber!,
              state: data[0].city!,
              countrycode: data[0].isoCountryCode!,
            },
            geometry: {
              coordinates: [
                location.coords.latitude,
                location.coords.longitude,
              ],
              type: "Point",
            },
          };
        })
        .catch((error) => {
          showError(error);
        });
    });
    return place!;
  }
);

export const makeRouting = async (
  data: ParamRouting
): Promise<RoutingProps> => {
  return new Promise(async (resolve, reject) => {
    const url = `http://192.168.1.133:8888/routing/car/?lang=fr'`;
    try {
      const response = await axios.post<RoutingProps>(url, data);
      if (response.data) {
        resolve(response.data);
      } else {
        reject(`Routage impossible`);
      }
    } catch (error) {
      reject(`Routage impossible ${error}`);
    }
  });
};

export const getPermissions = async (): Promise<Location.LocationObject> => {
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

export const textToGeocode = async (
  text: string
): Promise<Location.LocationGeocodedLocation[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const geocodedLocation = await Location.geocodeAsync(text);
      resolve(geocodedLocation);
    } catch (error) {
      reject(`Une Erreur est survenue`);
    }
  });
};

export const reverseGeocode = async (
  coords: LatLng
): Promise<Location.LocationGeocodedAddress[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const reverseGeocodedAdress = await Location.reverseGeocodeAsync(coords);
      resolve(reverseGeocodedAdress);
    } catch (error) {
      reject(`Une Erreur est survenue`);
    }
  });
};
