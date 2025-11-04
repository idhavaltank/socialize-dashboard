import type { JSX } from "react";
import type { RouteObject } from "react-router-dom";

export type DynamicObjectType = {
  [key: string]: any;
};

export type RouteObjType = {
  path?: string;
  element: JSX.Element;
  children?: RouteObject[];
  errorElement?: JSX.Element;
};
