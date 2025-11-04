import { Layout, Row, Col } from "antd";

export type Props = {
  children: React.ReactNode;
};

const { Content } = Layout;

const AuthLayout = ({ children }: Props) => {
  return (
    <Layout
      className="min-h-screen max-h-screen overflow-hidden w-full p-[30px] flex items-center justify-center bg-bgSurface md:overflow-y-auto md:items-center"
      style={{ minHeight: "100vh" }}
    >
      <Content className="w-[1020px] max-w-full mx-auto">
        <Row
          className="flex items-center mx-[-30px] flex-wrap"
          gutter={[30, 0]}
          justify="center"
          align="middle"
        >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={13}
            className="flex items-center justify-center lg:px-[15px] md:order-[-1]"
          >
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
