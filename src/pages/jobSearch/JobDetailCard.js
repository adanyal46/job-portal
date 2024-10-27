import {
  BookmarkIcon,
  BriefcaseIcon,
  CloseIcon,
  ExternalLinkIcon,
  JobAppliedIcon,
  LocationIcon,
  MoneyIcon,
} from "../../assets/svg";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";

const JobDetailCard = ({
  jobData,
  handleCloseCard,
  handleApplyNow,
  handleSaveNow,
  appliedLoading,
}) => {
  return (
    <section className="current-template-main-wrapper">
      <section className="current-job-header-container">
        <CustomButton
          category="iconed"
          icon={<CloseIcon />}
          handleClick={handleCloseCard}
          classes="close-job-details-button"
        />
        <article className="current-job-header">
          <figure className="company-logo">
            <img
              loading="lazy"
              src="/images/job-icon.png"
              alt="JobCompanyIcon"
            />
          </figure>
          <h4 className="name">{jobData?.companyName || "N/A"}</h4>
        </article>
        <article className="current-job-company-link">
          <p className="name">{jobData?.companyName || "N/A"}</p>
          <ExternalLinkIcon />
        </article>
        <p className="current-job-location" style={{ marginBottom: "10px" }}>
          {jobData?.location ?? "N/A"}
        </p>
        <Tag label={"$" + jobData?.minPrice + " - " + "$" + jobData.maxPrice} />
        {jobData?.applied && (
          <section className="current-job-applied">
            <JobAppliedIcon />
            <p className="applied-time">Applied</p>
          </section>
        )}
        <section className="current-job-actions">
          {!jobData?.applied && (
            <a
              href={jobData?.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyNow}
            >
              <CustomButton
                loading={appliedLoading}
                category="primary"
                name="Apply Now"
                classes="apply-now-button"
              />
            </a>
          )}
          {jobData?.saved ? (
            <p className="saved-job-text">Job Saved</p>
          ) : (
            <CustomButton
              handleClick={handleSaveNow}
              category="iconed"
              icon={<BookmarkIcon />}
              classes="bookmark-job-button"
            />
          )}
        </section>
      </section>
      <section className="current-job-details-container">
        <h4 className="section-heading">Job Details</h4>
        <section className="details-fields-container">
          <section className="detail-field-wrapper">
            <article className="detail-label-wrapper">
              <MoneyIcon />
              <p className="detail-label">Pay</p>
            </article>
            <article className="detail-tags-container">
              <Tag label={jobData?.salary ?? "N/A"} />
            </article>
          </section>
          <section className="detail-field-wrapper">
            <article className="detail-label-wrapper">
              <BriefcaseIcon />
              <p className="detail-label">Job Type</p>
            </article>
            <article className="detail-tags-container">
              <Tag label={jobData?.jobType ?? "N/A"} />
            </article>
          </section>
        </section>
      </section>
      <section className="current-job-location-container">
        <h4 className="section-heading">Location</h4>
        <section className="detail-field-wrapper">
          <article className="detail-label-wrapper">
            <LocationIcon />
            <p className="detail-label">{jobData?.location ?? "N/A"}</p>
          </article>
        </section>
      </section>
    </section>
  );
};

export default JobDetailCard;
