import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import JobCard from "../../components/jobCard";
import CustomSelect from "../../components/customSelect";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/plugin/advancedFormat";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { jobApplied, jobList, saveJob } from "../../features/job/jobSlice";
import { FaSync } from "react-icons/fa";
import Loader from "../../components/Loader";
import JobDetailCard from "./JobDetailCard";

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

const SearchFields = ({ searchParams, setSearchParams }) => {
  const handleInputChange = (key) => (value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = (name) => {
    setSearchParams((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <section className="search-jobs-fields">
      <CommonInput
        placeholder="Job Title"
        value={searchParams.jobTitle}
        prefix={<FaSync />}
        handleClear={handleClear}
        name="jobTitle"
        onChange={handleInputChange("jobTitle")}
      />
      <CustomSelect
        options={[
          { label: "Berlin", value: "berlin" },
          { label: "New York", value: "new york" },
          { label: "London", value: "london" },
          { label: "Kotli", value: "kotli" },
        ]}
        value={searchParams.location}
        placeholder="Location"
        name="location"
        handleClear={handleClear}
        onChange={(value) => handleInputChange("location")(value)}
      />
      <CustomSelect
        options={[
          { label: "Full-Time", value: "fulltime" },
          { label: "Remote", value: "remote" },
          { label: "Contract", value: "contract" },
          { label: "Internship", value: "internship" },
        ]}
        value={searchParams.jobType}
        placeholder="Job Type"
        name="jobType"
        handleClear={handleClear}
        onChange={(value) => handleInputChange("jobType")(value)}
      />
      <CustomSelect
        options={[
          { label: "$30,000", value: "30000" },
          { label: "$50,000", value: "50000" },
          { label: "$70,000", value: "70000" },
          { label: "$100,000", value: "100000" },
          { label: "$60,000", value: "60000" },
        ]}
        name="pay"
        value={searchParams.pay}
        placeholder="Pay Range"
        onChange={(value) => handleInputChange("pay")(value)}
        handleClear={handleClear}
      />
      <DatePicker.RangePicker
        value={
          searchParams.dateRange
            ? [
                dayjs(searchParams.dateRange.split(",")[0], "YYYY-MM-DD"),
                dayjs(searchParams.dateRange.split(",")[1], "YYYY-MM-DD"),
              ]
            : null
        }
        format="YYYY-MM-DD"
        onChange={(dates) => {
          handleInputChange("dateRange")(
            dates
              ? `${dates[0].format("YYYY-MM-DD")},${dates[1].format(
                  "YYYY-MM-DD"
                )}`
              : ""
          );
        }}
        style={{ width: "100%" }}
      />
    </section>
  );
};

const Search = ({
  searchParams,
  setSearchParams,
  jobs,
  loading,
  selectedJob,
  setSelectedJob,
  appliedLoading,
}) => {
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
      await dispatch(jobApplied({ jobId: selectedJob.id })).unwrap();
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const handleSaveNow = async () => {
    if (!selectedJob) return;
    try {
      await dispatch(saveJob({ jobId: selectedJob.id })).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <section className="search-jobs-main-container">
      <SearchFields
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      {loading ? (
        <Loader />
      ) : (
        <section className="jobs-wrapper">
          <section className="jobs-list-container">
            {jobs?.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  handleClick={() => handleCardClick(job)}
                />
              ))
            ) : (
              <EmptyStateCard />
            )}
          </section>
          {selectedJob && (
            <JobDetailCard
              jobData={selectedJob}
              appliedLoading={appliedLoading}
              handleCloseCard={handleCloseCard}
              handleApplyNow={handleApplyNow}
              handleSaveNow={handleSaveNow}
            />
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
    const filterCount = Object.values(searchParams).filter(
      (param) => param
    ).length;
    if (filterCount > 0) {
      dispatch(jobList(searchParams));
      setSelectedJob(null);
    } else {
      dispatch(jobList());
    }
  }, [dispatch, searchParams]);

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
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                jobs={jobs}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                appliedLoading={appliedLoading}
              />
            ),
          },
          {
            key: "applied",
            label: "Applied Jobs",
            children: (
              <Search
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                jobs={jobs?.filter((item) => item.applied === true)}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                appliedLoading={appliedLoading}
              />
            ),
          },
          {
            key: "save",
            label: "Saved Jobs",
            children: (
              <Search
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                jobs={jobs?.filter((item) => item.saved === true)}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                appliedLoading={appliedLoading}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default JobSearch;
