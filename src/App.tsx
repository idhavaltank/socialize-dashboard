// ** Routes **
import Routes from "./routes";

// ** Hooks **
import useAuthGuard from "./modules/Auth/hooks/useAuthGuard";

// ** Components **
import ScreenLoader from "./components/Loaders/ScreenLoader";

const App = () => {
  // ** Custom Hooks **
  const { isAuthInitialized, isDataLoading } = useAuthGuard();

  return !isAuthInitialized && isDataLoading ? <ScreenLoader /> : <Routes />;
};

export default App;
