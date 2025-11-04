// ** Packages **
import { Suspense, type JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// ** Components **
import PageLoader from "../../../components/Loaders/PageLoader";
import Layout from "../../../components/Layout";

// ** Redux **
import type { RootStateType } from "../../../redux/store";

// ** Constants **
import { PUBLIC_NAVIGATION } from "../../../constants/navigation.constant";

type Props = { children: JSX.Element; isPageLoader?: boolean };

const RequiresAuth = (props: Props) => {
  const { children, isPageLoader = false } = props;

  // ** Hooks **
  const location = useLocation();
  const authData = useSelector((state: RootStateType) => state.auth);

  // ** Custom Hooks **
  const { isAuthenticated, user, isDataLoading } = authData;

  const isVerified = !!user?.verified;

  // ** Not Logged In **
  if (!isAuthenticated || !isVerified) {
    return <Navigate to={PUBLIC_NAVIGATION.LOGIN} state={{ from: location }} />;
  }

  const renderComponent = () => {
    if (isPageLoader) {
      return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
    }
    return (
      <Layout>
        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center !h-[100%]">
              <PageLoader />
            </div>
          }
        >
          {children}
        </Suspense>
      </Layout>
    );
  };

  return isDataLoading ? (
    <div className="w-full flex items-center justify-center !h-[100%]">
      <PageLoader />
    </div>
  ) : (
    renderComponent()
  );
};

export default RequiresAuth;
