// ** Packages **
import { useNavigate, useRouteError } from "react-router-dom";
import { Card, Button, Typography } from "antd";

// ** Constants **
import { PRIVATE_NAVIGATION } from "../../../../constants/navigation.constant";

const { Title, Paragraph } = Typography;

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (!error) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-[15px] py-[50px]"
      style={{ backgroundColor: "#fff" }}
    >
      <Card
        style={{
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
          borderRadius: 20,
          padding: "24px",
          border: "none",
        }}
      >
        <div style={{ maxWidth: 500, margin: "20px auto 0" }}>
          <Title level={2} style={{ fontWeight: 700, color: "#000" }}>
            Oops! Something Went Wrong
          </Title>
          <Paragraph
            style={{
              fontWeight: 500,
              color: "#8c8c8c",
              fontSize: 18,
              marginBottom: 24,
            }}
          >
            We are sorry, the page you requested could not be found. Please go
            back to the homepage!
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(PRIVATE_NAVIGATION.DASHBOARD.VIEW)}
            style={{ minWidth: 160 }}
          >
            Go To Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ErrorBoundary;
