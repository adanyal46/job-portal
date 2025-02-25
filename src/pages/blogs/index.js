import { useNavigate } from "react-router-dom";
import { SearchFieldIcon } from "../../assets/svg";
import "./styles.scss";
import CustomButton from "../../components/customButton";
import { Card, Col, Flex, Input, message, Row, Typography } from "antd";
import BlogLayout from "./BlogLayout";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { calculateReadingTime } from "../../utils";
import { useSelector } from "react-redux";

const BlogCard = (props) => {
  const { id, title, content, navigate, ROLE } = props;

  const navigateToDetails = (id) => {
    const route = ROLE === "MENTOR" ? "mentor" : "job-seeker";
    navigate(`/${route}/blogs/` + id);
  };

  return (
    <section className="blog-card-wrapper">
      <figure className="blog-main-image-container">
        <img
          loading="lazy"
          src={"/images/blogs/blog-image-2.png"}
          alt={title}
          className="blog-image"
        />
      </figure>

      <article className="blog-main-content-container">
        <h5 className="blog-heading">{title}</h5>
        <p className="read-time">{calculateReadingTime(content)}</p>
        <CustomButton
          category="primary"
          name="Read more"
          handleClick={() => navigateToDetails(id)}
        />
      </article>
    </section>
  );
};

const Blogs = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const ROLE = user?.role;

  useEffect(() => {
    fetchBlogs(searchQuery);
  }, []);

  const fetchBlogs = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "user/getBlog?title=" + searchQuery
      );
      setBlogList(response.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    if (event.code === "Enter") {
      fetchBlogs(searchQuery);
    }
  };
  const route = ROLE === "MENTOR" ? "mentor" : "job-seeker";
  return (
    <BlogLayout title={"Blogs"}>
      <Flex justify="space-between" align="center">
        <Input
          placeholder="Search Here"
          prefix={<SearchFieldIcon />}
          style={{
            maxWidth: "410px",
            minHeight: "48px",
            width: "100%",
            borderColor: "#DEDCE4",
          }}
          allowClear
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyUp={handleSearch}
          onClear={() => fetchBlogs("")}
        />
        {ROLE !== "JOB_SEEKER" && (
          <CustomButton
            handleClick={() => navigate(`/${route}/blogs/write`)}
            category="primary"
            name="Add Blog"
            style={{
              minHeight: "48px",
            }}
          />
        )}
      </Flex>

      <Card
        loading={loading}
        style={{
          marginTop: "20px",
          borderRadius: "12px",
          boxShadow: "0px 2px 4px 0px #A5A3AE4D",
        }}
      >
        <Row gutter={[24, 24]}>
          {blogList.length > 0 ? (
            blogList.map((data, index) => (
              <Col span={6} key={index}>
                <BlogCard
                  ROLE={ROLE}
                  key={`blog-${index}`}
                  {...data}
                  navigate={navigate}
                />
              </Col>
            ))
          ) : (
            <Typography.Text>No blog found!</Typography.Text>
          )}
        </Row>
      </Card>
    </BlogLayout>
  );
};

export default Blogs;
