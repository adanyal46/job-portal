import { Image } from "antd";
import "./LogoList.css"; // Import the external CSS file

const LogoList = () => {
  return (
    <div className="logo-container">
      <div className="logo-list">
        <Image src="/guest/microsoft.svg" preview={false} className="logo" />
        <Image src="/guest/jp.svg" preview={false} className="logo" />
        <Image src="/guest/fedex.svg" preview={false} className="logo" />
        <Image src="/guest/tesla.svg" preview={false} className="logo" />
        <Image src="/guest/yf.svg" preview={false} className="logo" />
        <Image src="/guest/chevron.svg" preview={false} className="logo" />
        <Image src="/guest/walmart.svg" preview={false} className="logo" />
        <Image src="/guest/cvs.svg" preview={false} className="logo" />
      </div>
    </div>
  );
};

export default LogoList;
