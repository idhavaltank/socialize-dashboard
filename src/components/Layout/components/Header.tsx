import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header: LayoutHeader } = Layout;

// ** Components **
import ProfileToggle from "../../ProfileToggle";

// ** Constants **
import { PRIVATE_NAVIGATION } from "../../../constants/navigation.constant";

// ** Types **
import type { HeaderPropsType } from "../types";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

const Header = (props: HeaderPropsType) => {
  const { headerTitle, redirectToDashboard } = props;
  const navigate = useNavigate();

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    height: 64,
    padding: 10,
    paddingInline: 20,
    lineHeight: "64px",
    backgroundColor: "#1677ff",
  };

  const MENU_LIST: ItemType<MenuItemType>[] = [
    {
      key: 1,
      label: "Home",
      onClick: () => {
        navigate(PRIVATE_NAVIGATION.DASHBOARD.VIEW);
      },
    },
    {
      key: 2,
      label: "Feed",
      onClick: () => {
        navigate(PRIVATE_NAVIGATION.FEED.VIEW);
      },
    },
    {
      key: 3,
      label: "Post",
      onClick: () => {
        navigate(PRIVATE_NAVIGATION.POST.VIEW);
      },
    },
  ];
  return (
    <>
      <LayoutHeader style={{ ...headerStyle }}>
        <p onClick={() => redirectToDashboard()}>{headerTitle}</p>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={MENU_LIST}
          style={{
            flex: 1,
            minWidth: 0,
            marginRight: "10px",
            background: "#1677ff",
          }}
        />
        <ProfileToggle />
      </LayoutHeader>
    </>
  );
};

export default Header;
