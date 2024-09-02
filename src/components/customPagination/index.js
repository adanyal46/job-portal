import { Pagination } from "antd";

import "./styles.scss";

const CustomPagination = () => (
  <Pagination className="custom-pagination" defaultCurrent={1} total={50} />
);

export default CustomPagination;
