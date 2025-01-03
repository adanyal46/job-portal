import { Flex, Image } from "antd";
import React from "react";

const LogoList2 = () => {
  return (
    <div className="home_logo_list_2">
      <Flex gap={56} align="center" justify="center">
        <Image src="/guest/sba.png" width={137} height={96} preview={false} />
        <Image
          src="/guest/minority.png"
          width={102}
          height={91}
          preview={false}
        />
        <Image src="/guest/webnc.png" width={266} height={73} preview={false} />
      </Flex>
    </div>
  );
};

export default LogoList2;
