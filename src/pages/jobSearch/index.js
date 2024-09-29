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
import { buildQueryParams } from "../../utils";

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

const SearchFields = ({
  searchText,
  setSearchText,
  handleEnter,
  locations,
  selectedLocation,
  setSelectedLocation,
  navigate,
}) => {
  const handleLocationChange = (value) => {
    console.log(value);
    setSelectedLocation(value);

    // Construct the new query parameters
    const params = {
      jobTitle: searchText.toLowerCase(),
      location: value || "", // Use selected location
      jobType: "", // Add other fields if needed
      pay: "",
      dateRange: "",
    };

    const queryString = new URLSearchParams(params).toString();

    // Navigate to the new URL
    navigate(`/jobs/search?${queryString}`);
  };
  return (
    <section className="search-jobs-fields">
      <CommonInput
        placeholder="UI/UX Designer"
        value={searchText}
        prefix={<SearchFieldIcon />}
        onChange={(val) => setSearchText(val)}
        onEnter={handleEnter}
      />
      <CustomSelect
        placeholder="Location"
        options={locations}
        onChange={handleLocationChange}
      />
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
  loading,
  locations,
  navigate,
  selectedLocation,
  setSelectedLocation,
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

  const handleApplyNow = async () => {
    // Call your API to save the application here
    // Example:
    try {
      const response = await fetch("YOUR_API_ENDPOINT_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authorization headers
        },
        body: JSON.stringify({
          jobId: jobData.id,
          // Any other necessary data
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success (optional: update local state or notify user)
    } catch (error) {
      console.error("Error saving job application:", error);
      // Handle error (optional: notify user)
    }
  };

  return (
    <section className="search-jobs-main-container">
      <SearchFields
        setSearchText={setSearchText}
        searchText={searchText}
        handleEnter={handleEnter}
        locations={locations}
        navigate={navigate}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      {loading ? (
        <Loader />
      ) : (
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
                {jobData?.applied ? (
                  <section className="current-job-applied">
                    <JobAppliedIcon />
                    <p className="applied-time">Applied 2 days ago</p>
                  </section>
                ) : (
                  <section className="current-job-actions">
                    <a
                      href={jobData.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleApplyNow}
                    >
                      <CustomButton
                        category="primary"
                        name="Apply Now"
                        classes="apply-now-button"
                      />
                    </a>
                    {jobData?.saved ? (
                      <p className="saved-job-text">Job Saved</p> // Display text if saved
                    ) : (
                      <CustomButton
                        category="iconed"
                        icon={<BookmarkIcon />}
                        classes="bookmark-job-button"
                      />
                    )}
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
      )}
    </section>
  );
};

const JobSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.job);
  const [searchText, setSearchText] = useState("");
  const [saveJobList, setSaveJobList] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const params = {
      jobTitle: searchText,
      location: "",
      jobType: "",
      pay: "",
      dateRange: "",
    };
    dispatch(jobList(params));
    getSaveJobsData();
    getAppliedJobsData();
  }, [searchText, dispatch]);

  useEffect(() => {
    if (searchText.length === 0) {
      dispatch(
        jobList({
          jobTitle: "",
          location: "",
          jobType: "",
          pay: "",
          dateRange: "",
        })
      );
      setAppliedJobList([]);
      setSaveJobList([]);
    }
  }, [searchText, dispatch]);

  const getSaveJobsData = () => {
    const savedJobsDetails = jobs?.reduce((acc, job) => {
      if (job?.saveJobpost?.length) {
        job.saveJobpost.forEach((saveJob) => {
          if (saveJob.jobId === job.id) acc.push(job);
        });
      }
      return acc;
    }, []);
    setSaveJobList(savedJobsDetails);
  };

  const getAppliedJobsData = () => {
    const appliedJobArray = jobs?.flatMap((job) => job?.JobApplied || []);
    const saveAppliedJobDetails = jobs?.filter((item) =>
      appliedJobArray.some((applyJob) => applyJob.jobId === item.id)
    );
    setAppliedJobList(saveAppliedJobDetails);
  };

  const handleEnter = async () => {
    const params = {
      jobTitle: searchText.toLowerCase(),
      location: "",
      jobType: "",
      pay: "",
      dateRange: "",
    };
    await dispatch(jobList(params)).unwrap();
    navigate(`/jobs/search?${new URLSearchParams(params).toString()}`);
  };

  const handleTabChange = (key) => {
    navigate(`/jobs/search?type=${key}`);
  };

  return (
    <section className="main-layout-container">
      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="search"
        items={[
          {
            key: "search",
            label: "Search",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={jobs}
                searchText={searchText}
                setSearchText={setSearchText}
                loading={loading}
                locations={jobs?.map((job) => ({
                  label: job.location,
                  value: job.location,
                }))}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                navigate={navigate}
              />
            ),
          },
          {
            key: "applied",
            label: "Applied Jobs",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={appliedJobList}
                searchText={searchText}
                setSearchText={setSearchText}
                loading={loading}
                locations={jobs?.map((job) => ({
                  label: job.location,
                  value: job.location,
                }))}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                navigate={navigate}
              />
            ),
          },
          {
            key: "saved",
            label: "Saved Jobs",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={saveJobList}
                searchText={searchText}
                setSearchText={setSearchText}
                loading={loading}
                locations={Array.from(
                  new Set(jobs?.map((job) => job.location))
                ).map((location) => ({
                  label: location,
                  value: location,
                }))}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                navigate={navigate}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default JobSearch;
