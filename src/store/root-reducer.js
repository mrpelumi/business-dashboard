import { combineReducers } from "@reduxjs/toolkit";
import { certReducer } from "./certReducer/certificate.reducer";
import { receiptReducer } from "./receiptReducer/receipt.reducer";
import { revenueReducer } from "./revenueReducer/revenue.reducer";

export const rootReducer = combineReducers({
  certItem: certReducer,
  receiptItem: receiptReducer,
  revenueItem: revenueReducer
})