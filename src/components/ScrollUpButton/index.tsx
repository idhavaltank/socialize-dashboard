import { useState, useEffect } from "react";
import { Tooltip, Button } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <Tooltip title="Scroll to top">
      <Button
        shape="circle"
        size="large"
        onClick={scrollToTop}
        className="cursor-pointer"
        style={{
          width: 36,
          height: 36,
          padding: 7,
          transform: "rotate(-180deg)",
          color: "#fff",
          border: "none",
        }}
        icon={<ArrowDownOutlined />}
        aria-label="Scroll to top"
      />
    </Tooltip>
  );
};

export default ScrollUpButton;
