import { createSlice } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  revenueList: []
}

export const revenueSlice = createSlice({
  name: "revenueItem",
  initialState: INITIAL_STATE,
  reducers: {
    setRevenueReducer(state, action) {
      state.revenueList = {...state.revenueList, ...action.payload}
    }
  }
})

export const {setRevenueReducer} = revenueSlice.actions;

export const revenueReducer = revenueSlice.reducer;