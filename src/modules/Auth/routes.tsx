// ** React Imports **
import React, { Suspense } from "react";

// ** component  **
import PageLoader from "../../components/Loaders/PageLoader";

// ** Type **
import type { RouteObjType } from "../../types";

// ** Constant **
import { PUBLIC_NAVIGATION } from "../../constants/navigation.constant";

// ** Not Authenticate Pages **
const Login = React.lazy(() => import("./pages/Login"));
const NotAuthorized = React.lazy(() => import("./pages/NotAuthorized"));

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center !h-[100%]">
            <PageLoader pageLoaderClassName="!h-full !w-full" />
          </div>
        }
      >
        {route.element}
      </Suspense>
    ),
  }));
};

const AuthenticationRoutes = applySuspense([
  {
    path: PUBLIC_NAVIGATION.LOGIN,
    element: <Login />,
  },
  {
    path: PUBLIC_NAVIGATION.NOT_AUTHORIZED,
    element: <NotAuthorized />,
  },
]);

export default AuthenticationRoutes;
