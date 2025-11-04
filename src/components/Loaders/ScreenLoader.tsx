import PageLoader from "./PageLoader";

const ScreenLoader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center  py-[40px] px-[15px] relative">
      <PageLoader />
    </div>
  );
};

export default ScreenLoader;
