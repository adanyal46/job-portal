import { Pagination } from "antd";
import "./styles.scss";

const CustomPagination = (props) => {
  const { total = 0, currentPage = 1, onChange, pageSize } = props;

  return (
    <Pagination
      className="custom-pagination"
      defaultCurrent={1}
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
    />
  );
};

export default CustomPagination;
