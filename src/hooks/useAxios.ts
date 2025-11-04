// ** Packages **

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { Axios } from "../base-axios";
import type { ApiResponseType } from "../base-axios/types";

export const useAxiosGet = (): [
  (
    url: string,
    config?: AxiosRequestConfig<object>,
    baseUrl?: boolean
  ) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean; isError: boolean; isSuccess: boolean },
] => {
  // ** State **
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getRequest = async (
    url: string,
    config: AxiosRequestConfig<object> = {}
  ) => {
    try {
      setIsSuccess(false);
      setIsLoading(true);

      const response: AxiosResponse<any, any> = await Axios.get(url, {
        ...config,
      });

      setIsLoading(false);
      setIsSuccess(true);
      return { data: response.data || response };
    } catch (error: any) {
      const typedError = error as ApiResponseType;
      setIsError(true);
      setIsLoading(false);
      return {
        error: typedError?.message || error?.message || error,
        data: typedError?.data,
      };
    }
  };

  return [getRequest, { isLoading, isError, isSuccess }];
};

export const useAxiosPost = (): [
  (
    url: string,
    data: object,
    config?: AxiosRequestConfig<object>
  ) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean; isError: boolean; isSuccess: boolean },
] => {
  // ** State **
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const postRequest = async (
    url: string,
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    try {
      setIsSuccess(false);
      setIsLoading(true);
      setIsError(false);
      const response = await Axios.post(url, data, { ...config });
      setIsLoading(false);
      setIsSuccess(true);
      return { data: response.data };
    } catch (error: any) {
      const typedError = error as ApiResponseType;
      setIsError(true);
      setIsLoading(false);
      return {
        error: typedError?.message || error?.message || error,
        data: typedError?.data,
      };
    }
  };

  return [postRequest, { isLoading, isError, isSuccess }];
};

export const useAxiosPut = (): [
  (
    url: string,
    data: object,
    config?: AxiosRequestConfig<object>
  ) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean; isError: boolean; isSuccess: boolean },
] => {
  // ** State **
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const putRequest = async (
    url: string,
    data: object,
    config: AxiosRequestConfig<object> = {}
  ) => {
    try {
      setIsSuccess(false);
      setIsLoading(true);
      setIsError(false);
      const response = await Axios.put(url, data, { ...config });
      setIsLoading(false);
      setIsSuccess(true);
      return { data: response.data };
    } catch (error: any) {
      const typedError = error as ApiResponseType;
      setIsError(true);
      setIsLoading(false);
      return {
        error: typedError?.message || error?.message || error,
        data: typedError?.data,
      };
    }
  };

  return [putRequest, { isLoading, isError, isSuccess }];
};

export const useAxiosDelete = (): [
  (
    url: string,
    config?: AxiosRequestConfig<object>
  ) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean; isError: boolean; isSuccess: boolean },
] => {
  // ** State **
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteRequest = async (
    url: string,
    config: AxiosRequestConfig<object> = {}
  ) => {
    try {
      setIsSuccess(false);
      setIsLoading(true);
      setIsError(false);
      const response = await Axios.delete(url, { ...config });
      setIsLoading(false);
      setIsSuccess(true);
      return { data: response.data };
    } catch (error: any) {
      const typedError = error as ApiResponseType;
      setIsError(true);
      setIsLoading(false);
      return {
        error: typedError?.message || error?.message || error,
        data: typedError?.data,
      };
    }
  };

  return [deleteRequest, { isLoading, isError, isSuccess }];
};
