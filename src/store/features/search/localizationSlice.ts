import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceProps } from "../../../types/PlaceProps";
import { setDeparture, setDestination } from "@services/useSearchPlace";
export interface localizationState {
  departure: PlaceProps | null;
  destination: PlaceProps | null;
}

const initialState: localizationState = {
  departure: null,
  destination: null,
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
      );
  },
});

export const {} = localizationSlice.actions;

export default localizationSlice.reducer;
