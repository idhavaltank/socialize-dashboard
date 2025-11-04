// ** Packages **
import type { UseFormSetError } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// ** Services **
// import { useLoginAPI } from "../../../services";

// ** Redux **
import {
  setAuthenticated,
  setUserData,
} from "../../../store/authSlice";

// ** Types **
import type { LoginFormFieldsType } from "../types";

// ** Constants **
import { PRIVATE_NAVIGATION } from "../../../../../constants/navigation.constant";
import { VITE_PASS_WORD, VITE_USER_NAME } from "../../../../../config";
import { useState } from "react";

type PropsTypes = { setError: UseFormSetError<LoginFormFieldsType> };

const useLoginService = ({ setError }: PropsTypes) => {
  // ** hooks **
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  // ** APIS **
  // ** Replace API Here **
  // const { isLoading: simpleLoginLoading } = useLoginAPI();

  // *** general login ***
  const loginUser = async (loginData: LoginFormFieldsType) => {
    const { email, password, remember } = { ...loginData };

    setIsLoading(true);
    const isMatched =
      VITE_USER_NAME &&
      email === VITE_USER_NAME &&
      VITE_PASS_WORD &&
      password === VITE_PASS_WORD;

    if (!isMatched && VITE_USER_NAME && email !== VITE_USER_NAME) {
      setTimeout(() => {
        setError("email" as keyof LoginFormFieldsType, {
          type: "custom",
          message: "Enter correct email",
        });
        setIsLoading(false);
        return;
      }, 2000);
    } else if (!isMatched && VITE_PASS_WORD && password !== VITE_PASS_WORD) {
      setTimeout(() => {
        setError("password" as keyof LoginFormFieldsType, {
          type: "custom",
          message: "Enter correct password.",
        });
        setIsLoading(false);
        return;
      }, 2000);
    }
    if (remember) {
      localStorage.setItem("remember-me", btoa(JSON.stringify(loginData)));
    } else {
      localStorage.removeItem("remember-me");
    }

    if (isMatched) {
      isVerified({ userInfo: { ...loginData, verified: true } });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const isVerified = async (verifiedProps: { userInfo: any }) => {
    const { userInfo } = verifiedProps;

    if (userInfo) {
      if (userInfo?.verified) {
        dispatch(setUserData({ user: userInfo }));
        dispatch(setAuthenticated({ isAuthenticated: true }));
        navigate(PRIVATE_NAVIGATION.DASHBOARD.VIEW);
      }
    } else {
      dispatch(setUserData({ isDataLoading: false }));
    }
  };

  return {
    loginUser,
    isVerified,
    isLoading,
  };
};

export default useLoginService;
