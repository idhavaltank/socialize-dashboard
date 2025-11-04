// ** Packages **
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// ** Redux **
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./rootReducer";
import { VITE_NODE_ENV } from "../config";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auditLog", "commonPersist", "commonTableState", "process"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: VITE_NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
export const persistor = persistStore(store);
