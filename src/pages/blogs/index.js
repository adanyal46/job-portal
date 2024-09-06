import { useNavigate } from "react-router-dom";

import CommonInput from "../../components/commonInput";
import { SearchFieldIcon } from "../../assets/svg";

import "./styles.scss";
import CustomButton from "../../components/customButton";

const blogList = [
  {
    src: "/images/blogs/blog-image-1.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-2.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-3.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-1.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-2.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-3.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-1.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
  {
    src: "/images/blogs/blog-image-2.png",
    heading: "How To Become a Recruiter: A 9-Step Practical Guide",
    readTime: "10 mins read",
  },
];

const BlogCard = (props) => {
  const { src, heading, readTime, navigate } = props;

  const navigateToDetails = () => {
    navigate("/blogDetails");
  };

  return (
    <section className="blog-card-wrapper">
      <figure className="blog-main-image-container">
        <img loading="lazy" src={src} alt={heading} className="blog-image" />
      </figure>

      <article className="blog-main-content-container">
        <h5 className="blog-heading">{heading}</h5>
        <p className="read-time">{readTime}</p>
        <CustomButton
          category="primary"
          name="Read more"
          handleClick={navigateToDetails}
        />
      </article>
    </section>
  );
};

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <section className="blogs-page-main-container">
      <h4 className="blogs-main-heading">Blogs</h4>

      <CommonInput
        classes="blogs-search-field"
        placeholder="Search Here"
        prefix={<SearchFieldIcon />}
      />

      <section className="blogs-listing-container">
        {blogList.map((data, index) => (
          <BlogCard key={`blog-${index}`} {...data} navigate={navigate} />
        ))}
      </section>
    </section>
  );
};

export default Blogs;
