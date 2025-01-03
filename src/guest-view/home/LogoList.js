import { Image } from "antd";

const LogoList = () => {
  return (
    <div
      style={{
        background: "#FAFAFA",
        maxWidth: "1920px",
        marginInline: "auto",
        width: "100%",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "inline-flex",
          gap: 74,
          alignSelf: "stretch",
          flexWrap: "wrap",
        }}
      >
        <Image
          src="/guest/microsoft.svg"
          preview={false}
          width={100}
          height={100}
        />
        <Image src="/guest/jp.svg" preview={false} width={142} height={142} />
        <Image
          src="/guest/fedex.svg"
          preview={false}
          width={131}
          height={132}
        />
        <Image src="/guest/tesla.svg" preview={false} width={144} height={80} />
        <Image src="/guest/yf.svg" preview={false} width={104} height={104} />
        <Image
          src="/guest/chevron.svg"
          preview={false}
          width={98}
          height={98}
        />
        <Image
          src="/guest/walmart.svg"
          preview={false}
          width={206}
          height={50}
        />
        <Image src="/guest/cvs.svg" preview={false} width={409} height={54} />
      </div>
    </div>
  );
};

export default LogoList;
