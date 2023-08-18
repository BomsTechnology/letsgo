import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaceProps } from "../types/PlaceProps";
import axios from "axios";
import RoutingProps, { ParamRouting, RouteProps } from "../types/RoutingProps";
import * as Location from "expo-location";
import myTripSearchSlice from "../store/features/search/myTripSearchSlice";
import { showError } from "@functions/helperFunctions";
import { LatLng } from "react-native-maps";
import axiosClient from "@config";

const PREFIX_URL = 'LOCALISATION-SERVICE/api/v0/';

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
              country: data[0] && data[0].country!,
              postcode: data[0] && data[0].postalCode!,
              street: data[0] && data[0].street!,
              housenumber: data[0] && data[0].streetNumber!,
              state: data[0] && data[0].city!,
              countrycode: data[0] && data[0].isoCountryCode!,
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
    }).catch(async (location: Location.LocationObject) => {
      await reverseGeocode({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
        .then(async (data) => {
          place = {
            type: "LastKnowLocation",
            properties: {
              name: "Point de depart",
              country: data[0] && data[0].country!,
              postcode: data[0] && data[0].postalCode!,
              street: data[0] && data[0].street!,
              housenumber: data[0] && data[0].streetNumber!,
              state: data[0] && data[0].city!,
              countrycode: data[0] && data[0].isoCountryCode!,
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
    try {
      const response = await axiosClient.post<RoutingProps>(PREFIX_URL + 'routing/car/?lang=fr', data);
      if (response && response.data) {
        resolve(response.data);
      } else {
        reject(`Une erreur réseau s'est produite`);
      }
    } catch (error) {
      console.log(error)
      reject(`Routage impossible`);
    }
  });
};

export const getPermissions = async (): Promise<Location.LocationObject> => {
  return new Promise(async (resolve, reject) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      showError("Please grant location permission");
      let lastposition = await getLastKnownPosition();
      reject(lastposition);
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 10
    });
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

export const getLastKnownPosition = async (): Promise<Location.LocationObject> => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await Location.getLastKnownPositionAsync({});
      resolve(location!);
    } catch (error) {
      reject(`Une Erreur est survenue`);
    }
  });
};
