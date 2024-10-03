import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import JobCard from "../../components/jobCard";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";
import CustomSelect from "../../components/customSelect";
import { CloseIcon, ExternalLinkIcon, BookmarkIcon, LocationIcon, BriefcaseIcon, MoneyIcon, JobAppliedIcon, SearchFieldIcon } from "../../assets/svg";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { jobApplied, jobList, saveJob } from "../../features/job/jobSlice";
import { FaSync } from "react-icons/fa";
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

const SearchFields = ({ searchParams, setSearchParams, handleEnter, locations }) => {
  const handleInputChange = (key) => (value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="search-jobs-fields">
      <CommonInput
        placeholder="Job Title"
        value={searchParams.jobTitle}
        prefix={<SearchFieldIcon />}
        onChange={handleInputChange("jobTitle")}
        onEnter={handleEnter}
      />
      <CustomSelect placeholder="Location" options={locations} onChange={handleInputChange("location")} />
      <CustomSelect placeholder="Job Type" onChange={handleInputChange("jobType")} />
      <CustomSelect placeholder="Pay" onChange={handleInputChange("pay")} />
      <CommonInput category="date" placeholder="Date Range" styles={{ height: "100%" }} onChange={handleInputChange("dateRange")} />
    </section>
  );
};

const JobDetailCard = ({ jobData, handleCloseCard, handleApplyNow,handleSaveNow, appliedLoading }) => {
  return (
    <section className="current-template-main-wrapper">
      <section className="current-job-header-container">
        <CustomButton category="iconed" icon={<CloseIcon />} handleClick={handleCloseCard} classes="close-job-details-button" />
        <article className="current-job-header">
          <figure className="company-logo">
            <img loading="lazy" src="/images/job-icon.png" alt="JobCompanyIcon" />
          </figure>
          <h4 className="name">{jobData?.companyName || "N/A"}</h4>
        </article>
        <article className="current-job-company-link">
          <p className="name">{jobData?.companyName || "N/A"}</p>
          <ExternalLinkIcon />
        </article>
        <p className="current-job-location">{jobData?.location ?? "N/A"}</p>
        <Tag label={jobData?.salary ?? "N/A"} />
        {jobData?.applied && (
          <section className="current-job-applied">
            <JobAppliedIcon />
            <p className="applied-time">Applied</p>
          </section>
        )}
        <section className="current-job-actions">
          {!jobData?.applied && (
            <a href={jobData.applicationLink} target="_blank" rel="noopener noreferrer" onClick={handleApplyNow}>
              <CustomButton loading={appliedLoading} category="primary" name="Apply Now" classes="apply-now-button" />
            </a>
          )}
          {jobData?.saved ? (
            <p className="saved-job-text">Job Saved</p>
          ) : (
            <CustomButton onClick={handleSaveNow} category="iconed" icon={<BookmarkIcon />} classes="bookmark-job-button" />
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

const Search = ({ handleEnter, jobs, searchParams, setSearchParams, loading, selectedJob, setSelectedJob, appliedLoading, }) => {
  const dispatch = useDispatch();
  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseCard = () => {
    setSelectedJob(null);
  };

  const handleApplyNow = async () => {
    if (!selectedJob) return;
    try {
      const response = await dispatch(jobApplied({ jobId: selectedJob?.id })).unwrap();
    } catch (error) {
      console.error("Error saving job application:", error);
    }
  };
  const handleSaveNow = async () => {
    console.log('click')
    if (!selectedJob) return;
    try {
      const response = await dispatch(saveJob({ jobId: selectedJob?.id })).unwrap();
      console.log(response)
    } catch (error) {
      console.error("Error saving job application:", error);
    }
  };

  return (
    <section className="search-jobs-main-container">
      <SearchFields
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleEnter={handleEnter}
        locations={jobs?.map((job) => ({
          label: job.location,
          value: job.location,
        }))}
      />
      {loading ? (
        <Loader />
      ) : (
        <section className="jobs-wrapper">
          <section className="jobs-list-container">
            {jobs?.length > 0 ? jobs.map((job) => <JobCard key={job?.id} job={job} handleClick={() => handleCardClick(job)} />) : <EmptyStateCard />}
          </section>

          {selectedJob && (
            <JobDetailCard appliedLoading={appliedLoading} jobData={selectedJob} handleCloseCard={handleCloseCard} handleApplyNow={handleApplyNow} handleSaveNow={handleSaveNow} />
          )}
        </section>
      )}
    </section>
  );
};

const JobSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading, appliedLoading } = useSelector((state) => state.job);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    pay: "",
    dateRange: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (!jobs?.length && !loading) {
      dispatch(jobList());
    }
  }, [dispatch, jobs?.length, loading]);

  const handleEnter = async () => {
    const params = {
      jobTitle: searchParams.jobTitle.toLowerCase(),
      location: searchParams.location,
      jobType: searchParams.jobType,
      pay: searchParams.pay,
      dateRange: searchParams.dateRange,
    };

    await dispatch(jobList(params)).unwrap();
    navigate(`/jobs/search?${new URLSearchParams(params).toString()}`);
  };

  return (
    <section className="main-layout-container">
      <CustomTabs
        handleChange={(key) => navigate(`/jobs/search?type=${key}`)}
        defaultActiveKey="search"
        items={[
          {
            key: "search",
            label: "Search",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={jobs}
                appliedLoading={appliedLoading}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            ),
          },
          {
            key: "applied",
            label: "Applied Jobs",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={jobs?.filter((item) => item.applied === true)}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            ),
          },
          {
            key: "save",
            label: "Saved Jobs",
            children: (
              <Search
                handleEnter={handleEnter}
                jobs={jobs?.filter((item) => item.saved === true)}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            ),
          },
          // Add applied and saved job tabs similarly
        ]}
      />
    </section>
  );
};

export default JobSearch;
