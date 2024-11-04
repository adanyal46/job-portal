import { Button, Flex } from "antd";

const DownloadButton = (props) => {
  const { title, icon } = props;
  return (
    <Flex>
      <Button
        icon={icon}
        style={{
          backgroundColor: "#E9F0F3",
          fontWeight: "600",
          color: "#2F2C39",
          borderColor: "#E9F0F3",
        }}
        size="large"
      >
        {title}
      </Button>
    </Flex>
  );
};

export default DownloadButton;
