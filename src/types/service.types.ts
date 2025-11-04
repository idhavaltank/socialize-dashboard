import type { AxiosRequestConfig } from "axios";

export type PostRequestType = {
  data: object | FormData;
  config?: AxiosRequestConfig<object>;
};
