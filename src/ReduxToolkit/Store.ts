import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
