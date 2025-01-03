import { useEffect, useState } from "react";
import {
  BlogLinkedinIcon,
  BlogInstaIcon,
  BlogTwitterIcon,
  BlogFBIcon,
} from "../../assets/svg";
import BlogLayout from "../blogs/BlogLayout";

import "./styles.scss";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Card, message } from "antd";
import { formatDateToShort } from "../../utils";

const BlogParagraph = ({ content }) => (
  <p
    className="blog-content-paragraph"
    dangerouslySetInnerHTML={{ __html: content }}
  ></p>
);

const BlogImage = () => (
  <figure className="blog-content-image">
    <img
      loading="lazy"
      src="/images/blogs/blog-image-1.png"
      alt="BlogICON"
      className="blog-image"
    />
  </figure>
);

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("user/getBlogDetials/" + id);
      setBlog(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <BlogLayout>
      <section className="blog-detail-page-container">
        <p className="page-main-heading">
          Blogs
          <span className="slash"> / </span>
          <span className="highlighted">{blog?.title}</span>
        </p>

        <Card
          className="blog-detail-main-container"
          bordered={false}
          loading={loading}
        >
          <h1 className="blog-main-heading">{blog?.title}</h1>

          <section className="blog-content-details-container">
            <section className="about-this-blog-container">
              <p className="date">
                {blog?.createdAt ? formatDateToShort(blog?.createdAt) : "N/A"}
              </p>
              <p className="name">
                <strong>{blog?.postedBy}</strong>
              </p>
            </section>

            <section className="social-media-actions-container">
              <span className="social-media-icons">
                <BlogLinkedinIcon />
              </span>

              <span className="social-media-icons">
                <BlogInstaIcon />
              </span>

              <span className="social-media-icons">
                <BlogTwitterIcon />
              </span>

              <span className="social-media-icons">
                <BlogFBIcon />
              </span>
            </section>
          </section>

          <BlogParagraph content={blog?.content} />

          {/* <BlogImage /> */}
        </Card>
      </section>
    </BlogLayout>
  );
};

export default BlogDetail;
