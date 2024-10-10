import { useNavigate } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import CustomTabs from "../../components/customTabs";
import CommonInput from "../../components/commonInput";
import CustomSelect from "../../components/customSelect";
import MentorCard from "../../components/mentorCard";
import { SearchFieldIcon } from "../../assets/svg";
import "./styles.scss";
import CustomPagination from "../../components/customPagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; // Import useState
import { fetchMentorList } from "../../features/mentor/mentorSlice";
import Loader from "../../components/Loader";

const SearchFields = ({ locationOptions, disciplineOptions, industryOptions, experienceOptions, searchFields, setSearchFields, onSearch }) => {
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
    <section className="mentors-fields">
      <CommonInput
        placeholder="UI/UX Designer"
        prefix={<SearchFieldIcon />}
        value={searchFields.serviceName}
        onChange={handleInputChange}
        name="serviceName"
        handleClear={handleClear}
      />
      <CustomSelect
        placeholder="Location"
        options={locationOptions}
        value={searchFields.location}
        handleClear={handleClear}
        name="location"
        onChange={handleSelectChange("location")}
      />
      <CustomSelect
        placeholder="Discipline"
        options={disciplineOptions}
        value={searchFields.discipline}
        handleClear={handleClear}
        name="discipline"
        onChange={handleSelectChange("discipline")}
      />
      <CustomSelect
        placeholder="Industry"
        options={industryOptions}
        value={searchFields.industry}
        handleClear={handleClear}
        name="industry"
        onChange={handleSelectChange("industry")}
      />
      <CustomSelect
        placeholder="Years of Experience"
        options={experienceOptions}
        value={searchFields.yearOfExperience}
        name="yearOfExperience"
        handleClear={handleClear}
        onChange={handleSelectChange("yearOfExperience")}
      />
    </section>
  );
};

const MentorsListing = () => {
  const dispatch = useDispatch();
  const [searchFields, setSearchFields] = useState({
    serviceName: "",
    location: null,
    discipline: null,
    industry: null,
    yearOfExperience: null,
  });
  const { mentors, loading, error } = useSelector((state) => state.mentor);

  useEffect(() => {
    const hasFilter = Object.values(searchFields).filter((some) => some).length;
    if (!mentors.length && !hasFilter) {
      dispatch(fetchMentorList());
    }
  }, [dispatch, !mentors.length]);

  const handleSearch = (searchParams) => {
    dispatch(fetchMentorList(searchParams));
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="mentors-main-container">
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
      <section className="mentors-wrapper">
        <section className="mentors-cards-container">
          {loading ? (
            <Loader />
          ) : error ? (
            <p>Error: {error}</p>
          ) : !Array.isArray(mentors) ? ( // Check if mentors is an array
            <p>Data format error</p>
          ) : mentors.length === 0 ? ( // Check if the array is empty
            <p>Not Found</p>
          ) : (
            mentors.map((cardData, index) => <MentorCard key={`mentor-card-${index}`} {...cardData} />)
          )}
        </section>

        {/* <CustomPagination /> */}
      </section>
    </section>
  );
};

const Mentors = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const { mentors, loading, error } = useSelector((state) => state.mentor);
  const defaultKey = query.get("type");

  const handleTabChange = (key) => {
    if (key === "bookings") {
      navigate("/bookings");
    } else {
      navigate(`/mentors?type=${key}`);
    }
  };

  return (
    <section >
      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey={defaultKey}
        items={[
          {
            key: "myMentors",
            label: "My Mentor",
            children: <MentorsListing />,
          },
          {
            key: "bookings",
            label: "Bookings",
            children: <MentorsListing />,
          },
        ]}
      />
    </section>
  );
};

export default Mentors;
