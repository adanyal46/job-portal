import Tag from "../tag";
import { DetailsIcon } from "../../assets/svg";
import "./styles.scss";
import { getDaysAgo } from "../../utils";

const JobCard = (props) => {
  const { classes, handleClick, job } = props;

  // Function to truncate description text to a specific number of characters
  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "N/A";

    // Remove HTML tags for clean text
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + "...";
  };

  return (
    <section
      onClick={() => handleClick(job?.id)}
      className={`job-card-wrapper ${classes}`}
    >
      <DetailsIcon />

      <section className="job-company-container">
        <figure className="company-logo">
          <img
            loading="lazy"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
            src={job.companyIcon || "/images/job-icon.png"}
            alt="JobCompanyIcon"
          />
        </figure>

        <article className="job-company-details">
          <p className="name">{job?.companyName ?? "N/A"}</p>
          <p className="location">{job?.city ?? "N/A"}</p>
        </article>
      </section>

      <h5 className="job-main-title">{job?.title ?? "N/A"}</h5>

      <Tag label={"$" + job?.minPrice + " - " + "$" + job.maxPrice} />

      <p className="job-description-compact">
        {truncateDescription(job?.description)}
      </p>

      <p className="activity-status">{getDaysAgo(job?.createdAt)}</p>
    </section>
  );
};

export default JobCard;
