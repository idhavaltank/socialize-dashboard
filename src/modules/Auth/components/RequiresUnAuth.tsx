// ** Packages **
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// ** Components **
import AuthLayout from "./AuthLayout";
import PageLoader from "../../../components/Loaders/PageLoader";

// ** Redux **
import { getAuth, getCurrentUser } from "../store/authSlice";

// ** Constant **
import { PRIVATE_NAVIGATION } from "../../../constants/navigation.constant";

const RequiresUnAuth = () => {
  // ** Hooks **
  const { isAuthenticated } = useSelector(getAuth);
  const user = useSelector(getCurrentUser);
  const isUserVerified: boolean = !!user && !!user.verified;

  if (isAuthenticated && isUserVerified && user?.id) {
    return <Navigate to={PRIVATE_NAVIGATION.DASHBOARD.VIEW} />;
  }

  return (
    <AuthLayout>
      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center !h-[100%]">
            <PageLoader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </AuthLayout>
  );
};

export default RequiresUnAuth;
