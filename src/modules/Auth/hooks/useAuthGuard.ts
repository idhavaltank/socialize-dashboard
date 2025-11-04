// ** packages **
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** redux **
import {
  getAuth,
  setAuthInitialized,
  setCredentials,
  setUserData,
} from "../store/authSlice";
import { decodeFromBase64 } from "../../../utils";

const useAuthGuard = () => {
  // ** Hooks **
  const dispatch = useDispatch();
  const { isAuthenticated, isAuthInitialized, isDataLoading } =
    useSelector(getAuth);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    if (!isAuthenticated && !isAuthInitialized) {
      const userInfo = localStorage.getItem("active-user");
      if (userInfo) {
        const user = JSON.parse(decodeFromBase64(userInfo) || "");
        dispatch(setCredentials({ user }));
        dispatch(setUserData({ user }));
      }
      dispatch(setAuthInitialized());
    }
  };

  return {
    isAuthenticated,
    isAuthInitialized,
    isDataLoading,
  };
};

export default useAuthGuard;
