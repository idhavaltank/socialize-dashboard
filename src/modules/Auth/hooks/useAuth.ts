// ** Packages **
import { useDispatch } from "react-redux";

// ** Redux **
import { persistor } from "../../../redux/store";
import {
  setAuthInitialized,
  setLogoutData,
} from "../store/authSlice";

// ** Services **
import { LogoutAPI } from "../services";

const useAuth = () => {
  // ** Hooks **
  const dispatch = useDispatch();
  const { logoutAPI, isLoading: logoutLoading } = LogoutAPI();

  const hasAuthorized = () => {
    return true;
  };

  const logout = async () => {
    try {
      await logoutAPI({});
      persistor.purge();
      dispatch(setLogoutData());
      dispatch({ type: "LOGOUT" });
      dispatch(setAuthInitialized());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { hasAuthorized, logout, logoutLoading };
};

export default useAuth;
