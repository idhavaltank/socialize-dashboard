import React, { useState, useEffect } from "react";
import { Avatar, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";

type CommonImageProps = {
  src?: string | File | null;
  alt?: string;
  size?: number | "small" | "default" | "large";
  shape?: "circle" | "square";
  loading?: boolean;
  showLoader?: boolean;
  fallbackIcon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
};

const getImageSrc = (src: string | File | null | undefined): string | undefined => {
  if (!src) return undefined;
  if (typeof src === "string") return src;
  return URL.createObjectURL(src);
};

const Image: React.FC<CommonImageProps> = ({
  src,
  alt = "",
  size = 64,
  shape = "circle",
  loading = false,
  showLoader = true,
  fallbackIcon = <UserOutlined />,
  style,
  className,
  onError,
  onLoad,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setImageSrc(getImageSrc(src));
  }, [src]);

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  const handleLoad = () => {
    if (onLoad) onLoad();
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }} className={className}>
      {loading && showLoader && (
        <Spin
          size="small"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      )}
      <Avatar
        size={size}
        shape={shape}
        style={{ ...style, opacity: loading ? 0.5 : 1 }}
        icon={hasError ? fallbackIcon : undefined}
      >
        {!hasError && imageSrc && (
          <img
            src={imageSrc}
            alt={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </Avatar>
    </div>
  );
};

export default Image;
