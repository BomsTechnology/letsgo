import { createAsyncThunk } from "@reduxjs/toolkit";
import { PlaceProps } from "../types/PlaceProps";
import axios from "axios";
import RoutingProps, { ParamRouting } from "../types/RoutingProps";
import myTripSearchSlice from "../store/features/search/myTripSearchSlice";

export const setCurrLocation = createAsyncThunk<
  PlaceProps | null,
  PlaceProps | null
>("localization/setCurrLocation", async (place: PlaceProps | null) => {
  return place;
});

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
