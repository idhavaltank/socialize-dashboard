// ** Packages **
import { decode, encode, isValid } from "js-base64";

import tlds from "tlds";

// ** Type **
import { VITE_NODE_ENV } from "../config";

export const logger = (value: any) => {
  if (VITE_NODE_ENV === "development") {
    console.log("error------", value?.message ? value?.message : value);
  }
};

export const encodeToBase64 = (data: string, urlSafe = false) => {
  return encode(data, urlSafe);
};

export const decodeFromBase64 = (data: string) => {
  return isValid(data) ? decode(data) : "";
};

export const parseData = (data: any) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return e;
  }
};

export const isValidEmail = (v: string | null | undefined) => {
  const tld = (v || "").split(".").slice(-1)[0];

  const isValidTLDs = tlds.includes(tld);
  if (!isValidTLDs) {
    return false;
  }
  return true;
};

export const convertTitleCase = (name: string) => {
  const splitName = name.split("_");
  let titleCase = "";
  if (splitName.length > 1) {
    const capitalizedParts = splitName.map(
      (part) => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase()
    );
    titleCase = capitalizedParts.join(" ");
  } else {
    titleCase = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
  }
  return titleCase;
};
