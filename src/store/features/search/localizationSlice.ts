import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceProps } from "../../../types/PlaceProps";
import RoutingProps from "../../../types/RoutingProps";
import { setDeparture, setDestination } from "@services/useSearchPlace";
import { setCurrLocation, makeRouting } from "@services/useLocalization";
export interface localizationState {
  currentLocation: PlaceProps | null;
  departure: PlaceProps | null;
  destination: PlaceProps | null;
  routing: RoutingProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: localizationState = {
  departure: null,
  destination: null,
  currentLocation: null,
  routing: null,
  loading: false,
  error: null,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        setDeparture.fulfilled,
        (state, action: PayloadAction<PlaceProps | null>) => {
          state.departure = action.payload;
        }
      )
      .addCase(
        setDestination.fulfilled,
        (state, action: PayloadAction<PlaceProps | null>) => {
          state.destination = action.payload;
        }
      )
     .addCase(
        setCurrLocation.fulfilled,
        (state, action: PayloadAction<PlaceProps | null>) => {
          state.currentLocation = action.payload;
        }
      )
      .addCase(makeRouting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        makeRouting.fulfilled,
        (state, action: PayloadAction<RoutingProps>) => {
          state.routing = action.payload;
          state.error = null;
          state.loading = false;
        }
      )
      .addCase(makeRouting.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loading = false;
      });
  },
});

export const {} = localizationSlice.actions;

export default localizationSlice.reducer;
