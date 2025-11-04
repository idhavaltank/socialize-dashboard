import type { DynamicObjectType } from "../types";

export const PUBLIC_NAVIGATION: DynamicObjectType = Object.freeze({
  LOGIN: "/login",
  NOT_AUTHORIZED: "/not-authorized",
  NOT_FOUND_PAGE: "/404",
  STATIC: "/static",
});

export const PRIVATE_NAVIGATION = {
  DASHBOARD: { VIEW: "/" },
  FEED: { VIEW: "/feed", EDIT: "/feed/:id" },
  COMMENT: { VIEW: "/comment", EDIT: "/comment/:id" },
  POST: { VIEW: "/post", EDIT: "/popst/:id" },
  PROFILE: { VIEW: "/profile" },
};
