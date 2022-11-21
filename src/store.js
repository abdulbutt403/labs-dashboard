import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './shared/reducers/UserSlice'

const rootReducer = combineReducers({
  user: userReducer,

});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["register"],
        ignoredActionPaths: ["rehydrate", "register"],
        ignoredPaths: ["register"],
      },
    }),
});

export default store;

