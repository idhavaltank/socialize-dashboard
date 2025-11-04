// ** Packages **
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout as AntdLayout } from "antd";

// ** Components **
import Header from "./components/Header";

// ** Redux **
import { getCurrentUser } from "../../modules/Auth/store/authSlice";

// ** Constant **
import { PRIVATE_NAVIGATION } from "../../constants/navigation.constant";

type Props = { children: React.ReactNode };
const { Content, Footer } = AntdLayout;

const Layout = (props: Props) => {
  const { children } = props;
  const navigate = useNavigate();
  const CurrentUser = useSelector(getCurrentUser);

  const redirectToDashboard = () => {
    navigate(PRIVATE_NAVIGATION.DASHBOARD.VIEW);
  };
  const layoutStyle = {
    borderRadius: 0,
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    height: "100%",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#fdfeffff",
    padding: "10px",
  };

  return (
    <AntdLayout style={layoutStyle}>
      <Header
        headerTitle={`Welcome ${CurrentUser?.email ?? ""}!`}
        redirectToDashboard={redirectToDashboard}
      />
      <Content style={contentStyle}>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Socialize ©{new Date().getFullYear()} Created by Dhaval Tank
      </Footer>
    </AntdLayout>
  );
};

export default Layout;
