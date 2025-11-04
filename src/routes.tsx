// ** Packages **
import React, { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  type RouteObject,
} from "react-router-dom";

// ** Custom Components **
import RequiresAuth from "./modules/Auth/components/RequiresAuth";
import PageLoader from "./components/Loaders/PageLoader";
import AuthenticationRoutes from "./modules/Auth/routes";

// ** Constants **
import {
  PRIVATE_NAVIGATION,
  PUBLIC_NAVIGATION,
} from "./constants/navigation.constant";

// ** Type **
import type { RouteObjType } from "./types";

// ** Wrapper Components **
const RequiresUnAuth = React.lazy(
  () => import("../src/modules/Auth/components/RequiresUnAuth")
);

// ** Modules **
const Dashboard = React.lazy(() => import("./modules/Dashboard"));
const Feed = React.lazy(() => import("./modules/Feed"));
const Post = React.lazy(() => import("./modules/Post"));
const Profile = React.lazy(() => import("./modules/Profile"));

// ** Public Page **
const NotFound = React.lazy(() => import("../src/modules/Auth/pages/NotFound"));
const NotAuthorized = React.lazy(
  () => import("../src/modules/Auth/pages/NotAuthorized")
);

const applySuspense = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: (
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center !h-[100%]">
            <PageLoader />
          </div>
        }
      >
        {route.element}
      </Suspense>
    ),
  }));
};

const applyRequiresAuth = (routes: RouteObjType[]): RouteObjType[] => {
  return routes.map((route) => ({
    ...route,
    element: <RequiresAuth>{route.element}</RequiresAuth>,
  }));
};

const Routes = () => {
  const routesForPublic: RouteObject[] = [
    {
      path: PUBLIC_NAVIGATION.NOT_AUTHORIZED,
      element: <NotAuthorized />,
    },
  ];

  // ** Un-Auth
  const routesForNotAuthenticatedOnly: RouteObject[] = applySuspense([
    { element: <RequiresUnAuth />, children: AuthenticationRoutes },
  ]);

  const routesForAuthenticatedOnly: RouteObjType[] = applyRequiresAuth([
    { path: PRIVATE_NAVIGATION.DASHBOARD.VIEW, element: <Dashboard /> },
    { path: PRIVATE_NAVIGATION.FEED.VIEW, element: <Feed /> },
    { path: PRIVATE_NAVIGATION.POST.VIEW, element: <Post /> },
    { path: PRIVATE_NAVIGATION.PROFILE.VIEW, element: <Profile /> },
  ]);

  const notFound: RouteObject[] = [
    {
      path: "*",
      element: (
        <RequiresAuth>
          <NotFound />
        </RequiresAuth>
      ),
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
    ...notFound,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
