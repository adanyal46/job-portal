import {
  BlogLinkedinIcon,
  BlogInstaIcon,
  BlogTwitterIcon,
  BlogFBIcon,
} from "../../assets/svg";

import "./styles.scss";

const BlogParagraph = () => (
  <p className="blog-content-paragraph">
    Lorem ipsum dolor sit amet consectetur. Egestas cras tortor elit egestas
    imperdiet consectetur. Magna sed amet vel lectus gravida interdum sem
    laoreet. Mi lectus ac sagittis gravida habitant donec. Eget euismod quis dui
    urna at sed eu. Duis ullamcorper est et enim risus. Amet sit dignissim
    rhoncus dictum phasellus eleifend et nunc.
  </p>
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
  return (
    <section className="blog-detail-page-container">
      <p className="page-main-heading">
        Blogs
        <span className="slash"> / </span>
        <span className="highlighted">
          How To Become a Recruiter: A 9-Step Practical Guide
        </span>
      </p>

      <section className="blog-detail-main-container">
        <h1 className="blog-main-heading">
          How To Become a Recruiter: A 9-Step Practical Guide
        </h1>

        <section className="blog-content-details-container">
          <section className="about-this-blog-container">
            <p className="date">March 14, 2024</p>
            <p className="name">
              <strong>Olivia Roy</strong>
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

        <BlogParagraph />

        <BlogImage />

        <BlogParagraph />

        <BlogParagraph />

        <BlogImage />

        <BlogParagraph />

        <BlogParagraph />
      </section>
    </section>
  );
};

export default BlogDetail;
