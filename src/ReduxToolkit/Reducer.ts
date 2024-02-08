import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  userName: string;
  loggedin: boolean | undefined;
}

const initialState: UserType = {
  userName: "",
  loggedin: undefined,
};

export const Reducer = createSlice({
  name: "hiweb",
  initialState,
  reducers: {
    getUserName: (state, { payload }: { payload: string }) => {
      state.userName = payload;
    },
    checkingLoggedIn: (
      state,
      { payload }: { payload: boolean | undefined }
    ) => {
      state.loggedin = payload;
    },
  },
});

export const { getUserName, checkingLoggedIn } = Reducer.actions;
export default Reducer.reducer;
