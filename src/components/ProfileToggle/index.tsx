// ** Packages **
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button, Spin } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

// ** Hooks **
import useAuth from "../../modules/Auth/hooks/useAuth";

// ** Redux **
import { getCurrentUser } from "../../modules/Auth/store/authSlice";

// ** Constant **
import { PRIVATE_NAVIGATION } from "../../constants/navigation.constant";

const ProfileToggle = () => {
  const navigate = useNavigate();
  const { logout, logoutLoading } = useAuth();
  const user = useSelector(getCurrentUser);

  const handleProfileClick = () => {
    if (user?.verified) {
      navigate(PRIVATE_NAVIGATION.PROFILE.VIEW);
    }
  };

  const handleLogoutClick = () => {
    logout();
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="profile"
        onClick={handleProfileClick}
        icon={<UserOutlined />}
      >
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={handleLogoutClick}
        icon={<LogoutOutlined />}
      >
        <span>Log Out</span>
        {logoutLoading && <Spin size="small" className="ml-2" />}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex relative">
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <Button
          type="primary"
          shape="round"
          icon={<SettingOutlined />}
          size="large"
          onClick={(e) => {
            e.preventDefault();
          }}
        />
      </Dropdown>
    </div>
  );
};

export default ProfileToggle;
