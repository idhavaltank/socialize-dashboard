// ** Custom Hooks **
import { useAxiosPost, useAxiosGet } from "../../../hooks/useAxios";

// ** Type **
import type { PostRequestType } from "../../../types/service.types";

const AUTH_API_BASE_PATH = "/auth";

export const useLoginAPI = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosPost();
  const loginAPI = async ({ config = {}, data }: PostRequestType) => {
    return callApi(`${AUTH_API_BASE_PATH}/login`, data, config);
  };
  return { loginAPI, isLoading, isError, isSuccess };
};

export const LogoutAPI = () => {
  // ** Custom Hooks **
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();

  const logoutAPI = async (data: object) => {
    return callApi(`${AUTH_API_BASE_PATH}/logout`, data);
  };

  return { logoutAPI, isLoading, isError, isSuccess };
};
