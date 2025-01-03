import { Card, Col, DatePicker, Flex, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/customButton";
import { CalendarDashboardIcon, SearchFieldIcon } from "../../assets/svg";
import CustomPagination from "../../components/customPagination";
import RecruiterCard from "../employerDashboard/RecruiterCard";
import "./styles.scss";
import CommonInput from "../../components/commonInput";
import CustomSelect from "../../components/customSelect";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruiterList } from "../../features/employerDashboard/employerDashboardSlice";

const SearchFields = ({
  locationOptions,
  disciplineOptions,
  industryOptions,
  experienceOptions,
  searchFields,
  setSearchFields,
  onSearch,
}) => {
  const handleInputChange = (value) => {
    setSearchFields((prev) => ({
      ...prev,
      serviceName: value,
    }));
    onSearch({ ...searchFields, serviceName: value });
  };

  const handleSelectChange = (field) => (value) => {
    setSearchFields((prev) => ({
      ...prev,
      [field]: value,
    }));
    onSearch({ ...searchFields, [field]: value });
  };

  const handleClear = (name) => {
    onSearch({ ...searchFields, [name]: "" });
  };

  return (
    <Flex gap={"small"} style={{ marginBottom: "20px" }}>
      <CommonInput
        placeholder="UI/UX Designer"
        prefix={<SearchFieldIcon />}
        value={searchFields.serviceName}
        onChange={handleInputChange}
        name="serviceName"
        handleClear={handleClear}
        styles={{ flex: 1 }}
      />
      <CustomSelect
        placeholder="Location"
        options={locationOptions}
        value={searchFields.location}
        handleClear={handleClear}
        name="location"
        onChange={handleSelectChange("location")}
        styles={{ flex: 1 }}
      />
      <CustomSelect
        placeholder="Discipline"
        options={disciplineOptions}
        value={searchFields.discipline}
        handleClear={handleClear}
        name="discipline"
        onChange={handleSelectChange("discipline")}
        styles={{ flex: 1 }}
      />
      <CustomSelect
        placeholder="Industry"
        options={industryOptions}
        value={searchFields.industry}
        handleClear={handleClear}
        name="industry"
        onChange={handleSelectChange("industry")}
        styles={{ flex: 1 }}
      />
      <CustomSelect
        placeholder="Years of Experience"
        options={experienceOptions}
        value={searchFields.yearOfExperience}
        name="yearOfExperience"
        handleClear={handleClear}
        onChange={handleSelectChange("yearOfExperience")}
        styles={{ flex: 1 }}
      />
    </Flex>
  );
};
const hiredRecruiterData = [
  {
    id: 1,
    imageName: "",
    fullname: "Olivia Roy",
    location: "US",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },

  {
    id: 2,
    imageName: "",
    fullname: "Olivia Roy",

    location: "US",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 3,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",

    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 4,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 5,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 6,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 7,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    id: 8,
    imageName: "",
    location: "US",
    fullname: "Olivia Roy",
    services: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
];
const EmployerTalent = () => {
  const dispatch = useDispatch();
  const { recruiters, loading } = useSelector(
    (state) => state.employerDashboard
  );
  const [searchFields, setSearchFields] = useState({
    serviceName: "",
    location: null,
    discipline: null,
    industry: null,
    yearOfExperience: null,
  });

  useEffect(() => {
    dispatch(fetchRecruiterList());
  }, [dispatch]);

  const handleSearch = () => {};
  return (
    <div>
      <Typography.Title level={3} style={{ fontWeight: 400 }}>
        Recruiter
      </Typography.Title>
      <SearchFields
        locationOptions={[
          { label: "Remote", value: "remote" },
          { label: "New York", value: "new_york" },
          { label: "Berlin", value: "berlin" },
        ]}
        disciplineOptions={[
          { label: "UI/UX Design", value: "ui_ux" },
          { label: "Software Development", value: "software_development" },
          { label: "Data Science", value: "data_science" },
        ]}
        industryOptions={[
          { label: "Tech", value: "tech" },
          { label: "Finance", value: "finance" },
          { label: "Healthcare", value: "healthcare" },
        ]}
        experienceOptions={[
          { label: "0-1 years", value: "0-1" },
          { label: "2-5 years", value: "2-5" },
          { label: "5+ years", value: "5+" },
        ]}
        onSearch={handleSearch}
        searchFields={searchFields}
        setSearchFields={setSearchFields}
      />
      <Card bordered={false} loading={loading}>
        <Row gutter={[12, 12]} style={{ marginTop: "20px" }}>
          {recruiters?.map((item, index) => (
            <Col md={8} key={item.id}>
              <RecruiterCard key={`mentor-card-${index}`} {...item} />
            </Col>
          ))}
        </Row>
        {recruiters?.length >= 10 && <CustomPagination />}
      </Card>
    </div>
  );
};

export default EmployerTalent;
