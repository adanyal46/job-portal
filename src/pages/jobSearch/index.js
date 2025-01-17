import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import JobCard from "../../components/jobCard";
import CustomSelect from "../../components/customSelect";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import "dayjs/plugin/advancedFormat";
import "./styles.scss";
import { useSelector } from "react-redux";
import { FaSync } from "react-icons/fa";
import Loader from "../../components/Loader";
import JobDetailCard from "./JobDetailCard";
import axiosInstance from "../../api/axiosInstance";

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
  searchParams,
  setSearchParams,
  jobTypes,
  locations,
  companys,
}) => {
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
        options={locations?.map((item) => ({
          label: item,
          value: item,
        }))}
        value={searchParams.location}
        placeholder="Location"
        name="location"
        handleClear={handleClear}
        onChange={(value) => handleInputChange("location")(value)}
      />
      <CustomSelect
        options={jobTypes?.map((item) => ({
          label: item,
          value: item,
        }))}
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
      <CustomSelect
        options={companys?.map((item) => ({
          label: item,
          value: item,
        }))}
        value={searchParams.company}
        placeholder="Company"
        name="company"
        handleClear={handleClear}
        onChange={(value) => handleInputChange("company")(value)}
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
  setSelectedJob,
  appliedLoading,
  jobTypes,
  locations,
  companys,
  fetchJobDetail,
  jobDetail,
  jobDetailLoading,
  user,
  setJobDetail,
}) => {
  const handleCardClick = (job) => {
    fetchJobDetail(job?.jobId);
  };

  const handleCloseCard = () => {
    setSelectedJob(null);
  };

  const handleApplyNow = async () => {
    if (!jobDetail) return;
    try {
      const response = await axiosInstance.post("/job/apply", {
        jobId: jobDetail?.jobId,
        userId: user?.id,
      });
      setJobDetail(response.data.data);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  const handleSaveNow = async () => {
    if (!jobDetail) return;
    try {
      const response = await axiosInstance.post("/job/save", {
        jobId: jobDetail?.jobId,
        userId: user?.id,
      });
      setJobDetail(response.data.data);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  return (
    <section className="search-jobs-main-container">
      <SearchFields
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        jobTypes={jobTypes}
        locations={locations}
        companys={companys}
      />
      {loading ? (
        <Loader />
      ) : (
        <section className="jobs-wrapper">
          <section className="jobs-list-container">
            {jobs?.length > 0 ? (
              jobs?.map((job) => (
                <JobCard
                  key={job.jobId}
                  job={job}
                  handleClick={() => handleCardClick(job)}
                />
              ))
            ) : (
              <EmptyStateCard />
            )}
          </section>
          {jobDetailLoading ? (
            <Loader />
          ) : (
            jobDetail !== null && (
              <JobDetailCard
                jobData={jobDetail}
                appliedLoading={appliedLoading}
                handleCloseCard={handleCloseCard}
                handleApplyNow={handleApplyNow}
                handleSaveNow={handleSaveNow}
              />
            )
          )}
        </section>
      )}
    </section>
  );
};

const JobSearch = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [searchParamsss] = useSearchParams(); // Get search params
  const jobType = searchParamsss.get("type");
  const [activeTab, setActiveTab] = useState("search");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedLoading, setAppliedLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    pay: "",
    company: "",
    dateRange: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [jobDetailLoading, setJobDetailLoading] = useState(null);
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [companys, setCompanys] = useState([]);

  useEffect(() => {
    setActiveTab(jobType);
    navigate(`/job-seeker/jobs/search?type=${jobType}`);
    fetchJobTypes();
    fetchCities();
    fetchCompanies();
  }, [jobType, navigate]);

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [searchParams, user]);

  const fetchJobTypes = async () => {
    try {
      const response = await axiosInstance.get("/job/type");
      setJobTypes(response.data.data);
    } catch (error) {}
  };
  const fetchCities = async () => {
    try {
      const response = await axiosInstance.get("/job/city");
      setLocations(response.data.data);
    } catch (error) {}
  };
  const fetchCompanies = async () => {
    try {
      const response = await axiosInstance.get("/job/compnaynames");
      setCompanys(response.data.data);
    } catch (error) {}
  };

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const { dateRange, ...otherParams } = searchParams;
      const [startDate, endDate] = dateRange ? dateRange.split(",") : ["", ""];
      const queryParams = {
        ...otherParams,
      };
      // Only add startDate and endDate if dateRange is present
      if (startDate && endDate) {
        queryParams.startDate = startDate;
        queryParams.endDate = endDate;
      }
      const query = new URLSearchParams(queryParams).toString();
      const response = await axiosInstance.get(
        `/job/post?userId=${user?.id}&${query}`
      );
      setJobs(response.data);
    } catch (error) {
      message.open({
        type: "error",
        content:
          error.message || "Failed to fetch jobs. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetail = async (id) => {
    try {
      setJobDetailLoading(false);
      const response = await axiosInstance.get(
        "/job/jobDetials/" + id + "?userId=" + user?.id
      );
      setJobDetail(response.data.data);
    } catch (error) {
      message.open({
        type: "error",
        content: "Failed to fetch job details. Please try again later.",
      });
    } finally {
      setJobDetailLoading(false);
    }
  };

  return (
    <section className="main-layout-container">
      <CustomTabs
        handleChange={(key) => {
          setJobDetail(null);
          setActiveTab(key);
          navigate(`/job-seeker/jobs/search?type=${key}`);
        }}
        activeKey={activeTab}
        items={[
          {
            key: "search",
            label: "Search",
            children: (
              <Search
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                jobs={jobs?.jobs}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                appliedLoading={appliedLoading}
                jobTypes={jobTypes}
                locations={locations}
                companys={companys}
                fetchJobDetail={fetchJobDetail}
                jobDetail={jobDetail}
                jobDetailLoading={jobDetailLoading}
                user={user}
                setJobDetail={setJobDetail}
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
                jobs={jobs?.savedJobs}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                appliedLoading={appliedLoading}
                jobTypes={jobTypes}
                locations={locations}
                companys={companys}
                fetchJobDetail={fetchJobDetail}
                jobDetail={jobDetail}
                jobDetailLoading={jobDetailLoading}
                user={user}
                setJobDetail={setJobDetail}
              />
            ),
          },
          {
            key: "saved",
            label: "Saved Jobs",
            children: (
              <Search
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                jobs={jobs?.appliedJobs}
                loading={loading}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                appliedLoading={appliedLoading}
                jobTypes={jobTypes}
                locations={locations}
                companys={companys}
                fetchJobDetail={fetchJobDetail}
                jobDetail={jobDetail}
                jobDetailLoading={jobDetailLoading}
                user={user}
                setJobDetail={setJobDetail}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default JobSearch;
