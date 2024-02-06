import { createSlice } from "@reduxjs/toolkit";

interface UserType {
  userName: string;
}

const initialState: UserType = {
  userName: "",
};

export const Reducer = createSlice({
  name: "hiweb",
  initialState,
  reducers: {
    getUserName: (state, { payload }: { payload: string }) => {
      state.userName = payload;
    },
  },
});

export const { getUserName } = Reducer.actions;
export default Reducer.reducer;
