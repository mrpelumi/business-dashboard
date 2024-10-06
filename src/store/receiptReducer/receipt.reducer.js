import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  receiptList: []
}


const receiptSlice = createSlice({
  name: 'receiptItem',
  initialState: INITIAL_STATE,
  reducers: {
    setReceiptReducer(state, action){
      state.receiptList = {...state.receiptList, ...action.payload}
    }
  }
})

export const {setReceiptReducer} = receiptSlice.actions;

export const receiptReducer = receiptSlice.reducer;