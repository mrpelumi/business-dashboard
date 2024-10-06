import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  certList: []
}

export const certSlice = createSlice({
  name: "certItem",
  initialState: INITIAL_STATE,
  reducers: {
    setCertReducer(state, action){
      state.certList = {...state.certList, ...action.payload }
    }
  }
})

export const {setCertReducer} = certSlice.actions;

export const certReducer = certSlice.reducer;