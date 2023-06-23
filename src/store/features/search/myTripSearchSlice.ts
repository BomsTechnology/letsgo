import filterTripItems, { FilterTripItemProps } from '@data/FilterTripItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface myTripSearchState {
    showInput: boolean;
    showFilter: boolean;
    inputValue: string;
    filterTripItem: FilterTripItemProps[];
    filterTripValue: string;
}

const initialState: myTripSearchState = {
    "showInput": false,
    "showFilter": true,
    "inputValue": "",
    "filterTripItem": filterTripItems,
    "filterTripValue": filterTripItems[0].value,
};

const myTripSearchSlice = createSlice({
    name: 'myTripSearch',
    initialState,
    reducers: {
        toogleShowInput: (state, action: PayloadAction<boolean>) => {
            state.showInput = action.payload ;
        },
        toogleShowFilter: (state, action: PayloadAction<boolean>) => {
            state.showFilter = action.payload;
        },
        setFilterValue: (state, action: PayloadAction<string>) => {
            state.filterTripValue = action.payload;
        },
        setInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
    },
});

export const { toogleShowInput, setFilterValue, setInputValue, toogleShowFilter } = myTripSearchSlice.actions;

export default myTripSearchSlice.reducer;