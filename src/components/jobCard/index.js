import Tag from "../tag";

import { DetailsIcon } from "../../assets/svg";

import "./styles.scss";

const JobCard = (props) => {
  const { classes, handleClick } = props;

  return (
    <section onClick={handleClick} className={`job-card-wrapper ${classes}`}>
      <DetailsIcon />

      <section className="job-company-container">
        <figure className="company-logo">
          <img loading="lazy" src="/images/job-icon.png" alt="JobCompanyIcon" />
        </figure>

        <article className="job-company-details">
          <p className="name">Kosmic AI</p>
          <p className="location">Surat</p>
        </article>
      </section>

      <h5 className="job-main-title">UI/UX Designer</h5>

      <Tag label="$60,000-$80,000" />

      <ul className="job-description-list">
        <li className="list-item">
          Create visually stunning and intuitive web pages and landing pages
          that enhance user experience and drive conversions.
        </li>
      </ul>

      <p className="activity-status">Active 2 days ago</p>
    </section>
  );
};

export default JobCard;
