import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
  usersList: []
}

export const userSlice = createSlice({
  name: "userProfileItem",
  initialState: INITIAL_STATE,
  reducers: {
    setUsersReducer(state, action){
      state.usersList = {...state.usersList, ...action.payload}
    }
  }
})

export const {setUsersReducer} = userSlice.actions;

export const userReducer = userSlice.reducer;