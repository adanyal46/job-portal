import { Flex, Image } from "antd";
import React from "react";
import "./LogoList2.css"; // Import CSS file for styling

const LogoList2 = () => {
  return (
    <div className="home_logo_list_2">
      <Flex
        className="logo_list_wrapper"
        gap={56}
        align="center"
        justify="center"
      >
        <Image className="logo_img" src="/guest/sba.png" preview={false} />
        <Image className="logo_img" src="/guest/minority.png" preview={false} />
        <Image className="logo_img" src="/guest/webnc.png" preview={false} />
      </Flex>
    </div>
  );
};

export default LogoList2;
