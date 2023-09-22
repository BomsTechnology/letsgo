import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceProps } from "../../../types/PlaceProps";
import RoutingProps, { RouteProps } from "../../../types/RoutingProps";
import { setDeparture, setDestination } from "@services/useSearch";
import { setCurrLocation, makeRouting } from "@services/useLocalization";
export interface localizationState {
  currentLocation: PlaceProps | null;
  departure: PlaceProps | null;
  destination: PlaceProps | null;
  //routing: RoutingProps | null;
  //route: RouteProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: localizationState = {
  departure: null,
  destination: null,
  currentLocation: null,
  //routing: null,
  //route: null,
  loading: false,
  error: null,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setDeparture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setDeparture.fulfilled,
        (state, action: PayloadAction<PlaceProps | null>) => {
          state.departure = action.payload;
        }
      )
      .addCase(setDeparture.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(setDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setDestination.fulfilled,
        (state, action: PayloadAction<PlaceProps | null>) => {
          state.destination = action.payload;
        }
      )
      .addCase(setDestination.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      })
      .addCase(
        setCurrLocation.fulfilled,
        (state, action: PayloadAction<PlaceProps | null>) => {
          state.currentLocation = action.payload;
        }
      )
  },
});

export const {} = localizationSlice.actions;

export default localizationSlice.reducer;
