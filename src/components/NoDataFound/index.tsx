import { Typography } from "antd";

const { Title, Paragraph } = Typography;

type Props = {
  titleClassName?: string;
  description?: string;
  title?: string;
  descriptionClassName?: string;
  className?: string;
};

const NoDataFound = (props: Props) => {
  const {
    className = "",
    description = "",
    titleClassName = "",
    descriptionClassName = "",
    title = "No Result Found",
  } = props;

  return (
    <div className={`py-[35px] ${className}`}>
      <Title
        level={3}
        className={`text-center mt-[15px] mb-[6px] sm:text-[20px] font-AcuminPro__Bold ${titleClassName}`}
      >
        {title}
      </Title>
      <Paragraph
        className={`text-center w-[400px] max-w-full font-AcuminPro__Regular text-[16px] ${descriptionClassName}`}
      >
        {description}
      </Paragraph>
    </div>
  );
};

export default NoDataFound;
