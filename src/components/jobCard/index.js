import Tag from "../tag";

import { DetailsIcon } from "../../assets/svg";

import "./styles.scss";
import { getDaysAgo } from "../../utils";

const JobCard = (props) => {
  const { classes, handleClick, job } = props;

  return (
    <section
      onClick={() => handleClick(job?.id)}
      className={`job-card-wrapper ${classes}`}
    >
      <DetailsIcon />

      <section className="job-company-container">
        <figure className="company-logo">
          <img loading="lazy" src="/images/job-icon.png" alt="JobCompanyIcon" />
        </figure>

        <article className="job-company-details">
          <p className="name">{job?.companyName ?? "N/A"}</p>
          <p className="location">{job?.city ?? "N/A"}</p>
        </article>
      </section>

      <h5 className="job-main-title">{job?.title ?? "N/A"}</h5>

      <Tag label={"$" + job?.minPrice + " - " + "$" + job.maxPrice} />

      <ul className="job-description-list">
        <li
          className="list-item"
          dangerouslySetInnerHTML={{ __html: job?.description ?? "N/A" }}
        />
      </ul>

      <p className="activity-status">{getDaysAgo(job?.createdAt)}</p>
    </section>
  );
};

export default JobCard;
