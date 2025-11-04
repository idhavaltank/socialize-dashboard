import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { encodeToBase64 } from "../../../utils";
import { logoutHelper } from "../helper";
import type { RootStateType } from "../../../redux/store";

export type AuthUserType = {
  id?: string;
  email: string;
  verified?: boolean;
};

export type AuthSliceType = {
  user?: Partial<AuthUserType | null>;
  isAuthenticated?: boolean;
  isAuthInitialized?: boolean;
  isDataLoading?: boolean;
};

const initialState: AuthSliceType = {
  user: null,
  isAuthenticated: false,
  isAuthInitialized: false,
  isDataLoading: true,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInitialized(state: AuthSliceType) {
      state.isAuthInitialized = true;
    },
    setAuthenticated(
      state: AuthSliceType,
      action: PayloadAction<AuthSliceType>
    ) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUserData(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = !!user?.verified;
      state.isDataLoading = false;
      if (user?.verified) {
        localStorage.setItem(
          "active-user",
          encodeToBase64(
            JSON.stringify({
              email: user.email,
              verified: user.verified,
            })
          )
        );
      } else {
        localStorage.removeItem("active-user");
      }
    },

    setCredentials(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      if (user) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    setUserVerified(state: AuthSliceType) {
      if (state.user) {
        state.user.verified = true;
      } else {
        state.user = { verified: true };
      }
    },
    setLogoutData(state: AuthSliceType) {
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthInitialized = false;
      logoutHelper();
    },
    setIsDataLoading(state: AuthSliceType, action: PayloadAction<boolean>) {
      state.isDataLoading = action.payload;
    },
  },
});

export const { reducer } = slice;

export const {
  setCredentials,
  setLogoutData,
  setAuthenticated,
  setAuthInitialized,
  setUserData,
  setUserVerified,
  setIsDataLoading,
} = slice.actions;

export const getAuth = (state: RootStateType) => state.auth;

export const getIsAuthenticated = (state: RootStateType) =>
  state.auth.isAuthenticated;

export const getCurrentUser = (state: RootStateType) => state.auth.user;

export default slice;
