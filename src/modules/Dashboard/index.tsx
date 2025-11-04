import { AntDesignOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { PRIVATE_NAVIGATION } from "../../constants/navigation.constant";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const DashBoard = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  return (
    <div className="lg:px-[15px] lg:mt-[20px]">
      <div className="flex flex-wrap mx-[-15px] mt-[40px] 3xl:mt-[20px] 3xl:mx-[-8px] xl:mt-[5px] mb-[24px]">
        <Title level={3}>Welcome to socialize App</Title>
        <ConfigProvider button={{ className: styles.linearGradientButton }}>
          <Space>
            <Button
              type="primary"
              size="large"
              icon={<AntDesignOutlined />}
              onClick={() => navigate(PRIVATE_NAVIGATION.FEED.VIEW)}
            >
              Explore Socialize
            </Button>
          </Space>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DashBoard;
