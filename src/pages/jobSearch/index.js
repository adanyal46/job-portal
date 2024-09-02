import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useQuery from "../../hooks/useQuery";

import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import JobCard from "../../components/jobCard";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";
import CustomSelect from "../../components/customSelect";

import {
  CloseIcon,
  ExternalLinkIcon,
  BookmarkIcon,
  LocationIcon,
  BriefcaseIcon,
  MoneyIcon,
  JobAppliedIcon,
  SearchFieldIcon,
} from "../../assets/svg";

import "./styles.scss";

const SearchFields = () => {
  return (
    <section className="search-jobs-fields">
      <CommonInput placeholder="UI/UX Designer" prefix={<SearchFieldIcon />} />
      <CustomSelect placeholder="Location" />
      <CustomSelect placeholder="Job Type" />
      <CustomSelect placeholder="Pay" />
      <CustomSelect placeholder="Company" />
      <CommonInput
        category="date"
        placeholder="Date Range"
        styles={{
          height: "100%",
        }}
      />
    </section>
  );
};

const Search = (props) => {
  const { jobApplied, jobSaved } = props;

  const [jobKey, setJobKey] = useState(null);

  return (
    <section className="search-jobs-main-container">
      <SearchFields />

      <section className="jobs-wrapper">
        <section className="jobs-list-container">
          {["1", "2", "3"].map((id) => {
            return (
              <JobCard
                key={id}
                handleClick={() => setJobKey(id)}
                classes={id === jobKey && "active"}
              />
            );
          })}
        </section>

        {!jobKey ? (
          <section className="listed-job-details-container">
            <figure>
              <img
                loading="lazy"
                src="/images/empty-jobs-screen.png"
                alt="clickJobsForDetails"
              />
            </figure>
          </section>
        ) : (
          <section className="current-template-main-wrapper">
            <section className="current-job-header-container">
              <CustomButton
                category="iconed"
                icon={<CloseIcon />}
                handleClick={() => setJobKey(null)}
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

                <h4 className="name">Kosmic AI</h4>
              </article>

              <article className="current-job-company-link">
                <p className="name">Kosmic AI</p>
                <ExternalLinkIcon />
              </article>

              <p className="current-job-location">Surat</p>

              <p className="current-job-salary-range">$60,000-$80,000</p>

              {jobApplied ? (
                <section className="current-job-applied">
                  <JobAppliedIcon />
                  <p className="applied-time">Applied 2 days ago</p>
                </section>
              ) : (
                <section className="current-job-actions">
                  <CustomButton
                    category="primary"
                    name="Apply Now"
                    classes="apply-now-button"
                  />

                  <CustomButton
                    category="iconed"
                    icon={<BookmarkIcon />}
                    classes={`bookmark-job-button ${jobSaved && "saved-job"}`}
                  />
                </section>
              )}

              <section className="current-job-type-details-wrapper"></section>
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
                    <Tag label="$60,000-$80,000 a month" />
                  </article>
                </section>

                <section className="detail-field-wrapper">
                  <article className="detail-label-wrapper">
                    <BriefcaseIcon />
                    <p className="detail-label">Pay</p>
                  </article>

                  <article className="detail-tags-container">
                    <Tag label="Full Time" />
                    <Tag label="Contract" />
                  </article>
                </section>
              </section>
            </section>

            <section className="current-job-location-container">
              <h4 className="section-heading">Location</h4>

              <section className="detail-field-wrapper">
                <article className="detail-label-wrapper">
                  <LocationIcon />
                  <p className="detail-label">Surat</p>
                </article>
              </section>
            </section>
          </section>
        )}
      </section>
    </section>
  );
};

const JobSearch = () => {
  const navigate = useNavigate();

  let query = useQuery();
  const defaultKey = query.get("type");

  const handleTabChange = (key) => {
    navigate(`/jobs/search?type=${key}`);
  };

  return (
    <section className="main-layout-container">
      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey={defaultKey}
        items={[
          {
            key: "search",
            label: "Search",
            children: <Search />,
          },
          {
            key: "applied",
            label: "Applied Jobs",
            children: <Search jobApplied />,
          },
          {
            key: "saved",
            label: "Saved Jobs",
            children: <Search jobSaved />,
          },
        ]}
      />
    </section>
  );
};

export default JobSearch;
