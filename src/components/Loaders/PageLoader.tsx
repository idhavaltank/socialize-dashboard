import { Spin } from "antd";

type Props = {
  pageLoaderWrapperClassName?: string;
  pageLoaderClassName?: string;
};

const PageLoader = (props: Props) => {
  const { pageLoaderWrapperClassName = "", pageLoaderClassName = "" } = props;

  return (
    <div className={pageLoaderWrapperClassName} style={{ textAlign: "center" }}>
      <Spin className={pageLoaderClassName} size="large" />
    </div>
  );
};

export default PageLoader;
