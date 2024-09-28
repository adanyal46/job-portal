import { useEffect, useState, useCallback, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { jobList } from "../../features/job/jobSlice";

import { FaSync } from "react-icons/fa";
import { message } from "antd";
import Loader from "../../components/Loader";

const EmptyStateCard = () => {
  return (
    <section className="empty-state-card">
      <h2>No Jobs Found</h2>
      <p>Try adjusting your search or filters.</p>
      <div className="empty-state-icons">
        <div className="icon-wrapper">
          <FaSync />
          <p>Refresh</p>
        </div>
      </div>
    </section>
  );
};

const SearchFields = ({ searchText, setSearchText, handleEnter }) => {
  return (
    <section className="search-jobs-fields">
      <CommonInput
        placeholder="UI/UX Designer"
        value={searchText}
        prefix={<SearchFieldIcon />}
        onChange={(val) => setSearchText(val)}
        onEnter={handleEnter}
      />
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

const Search = ({
  handleEnter,
  jobs,
  searchText,
  setSearchText,
  jobApplied = false,
  jobSaved = false,
}) => {
  const [jobKey, setJobKey] = useState(null);
  const [jobData, setJobData] = useState(null);

  const handleCardClick = (id) => {
    setJobKey(id);
    setJobData(jobs.find((item) => item.id === id));
  };

  const handleCloseCard = () => {
    setJobKey(null);
    setJobData(null);
  };
  return (
    <section className="search-jobs-main-container">
      <SearchFields
        setSearchText={setSearchText}
        searchText={searchText}
        handleEnter={handleEnter}
      />
      <section className="jobs-wrapper">
        <section className="jobs-list-container">
          {jobs?.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job?.id}
                job={job}
                handleClick={handleCardClick}
                classes={job?.id === jobKey ? "active" : ""}
              />
            ))
          ) : (
            <EmptyStateCard />
          )}
        </section>

        {!jobKey && !jobData ? (
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
              <p className="current-job-location">
                {jobData?.location ?? "N/A"}
              </p>
              <Tag label={jobData?.salary ?? "N/A"} />
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
                    classes={`bookmark-job-button ${
                      jobSaved ? "saved-job" : ""
                    }`}
                  />
                </section>
              )}
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
                    <Tag label={jobData?.time} />
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
        )}
      </section>
    </section>
  );
};

const JobSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let apiCall = useRef(true);
  const { jobs, loading } = useSelector((state) => state.job);
  const [searchText, setSearchText] = useState("");

  console.log(jobs);

  useEffect(() => {
    if (apiCall) {
      dispatch(jobList({ jobTitle: "" }));
      apiCall.current = false;
    }
  }, [dispatch, apiCall]);

  const handleEnter = () => {
    if (searchText.length > 3) {
      dispatch(jobList({ jobTitle: searchText.toLowerCase() }));
    } else {
      message.open({
        type: "error",
        content: "Search text is too short",
      });
    }
  };

  let query = useQuery();
  const defaultKey = query.get("type");

  const handleTabChange = (key) => {
    navigate(`/jobs/search?type=${key}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="main-layout-container">
      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey={defaultKey}
        items={[
          {
            key: "search",
            label: "Search",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={jobs} // Pass the jobs directly here
                searchText={searchText}
                setSearchText={setSearchText}
              />
            ),
          },
          {
            key: "applied",
            label: "Applied Jobs",
            children: (
              <Search
                handleEnter={handleEnter}
                jobApplied
                jobs={jobs} // Pass the jobs to applied jobs as well
                searchText={searchText}
                setSearchText={setSearchText}
              />
            ),
          },
          {
            key: "saved",
            label: "Saved Jobs",
            children: (
              <Search
                handleEnter={handleEnter}
                jobSaved
                jobs={jobs} // Pass the jobs to saved jobs as well
                searchText={searchText}
                setSearchText={setSearchText}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default JobSearch;
