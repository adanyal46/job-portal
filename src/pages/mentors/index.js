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
import { useEffect } from "react";
import { fetchMentorList } from "../../features/mentor/mentorSlice";
import Loader from "../../components/Loader";

const mentorCardList = [
  {
    icon: "/images/mentors/mentor-1.png",
    rating: 4.6,
    reviews: 32,
    name: "Olivia Roy",
    location: "US",
    expertise: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    icon: "/images/mentors/mentor-2.png",
    rating: 4.6,
    reviews: 32,
    name: "Andrea Gerson",
    location: "US",
    expertise: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    icon: "/images/mentors/mentor-3.png",
    rating: 4.6,
    reviews: 32,
    name: "Max Helzberg",
    location: "US",
    expertise: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    icon: "/images/mentors/mentor-1.png",
    rating: 4.6,
    reviews: 32,
    name: "Olivia Roy",
    location: "US",
    expertise: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    icon: "/images/mentors/mentor-2.png",
    rating: 4.6,
    reviews: 32,
    name: "Andrea Gerson",
    location: "US",
    expertise: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
  {
    icon: "/images/mentors/mentor-3.png",
    rating: 4.6,
    reviews: 32,
    name: "Max Helzberg",
    location: "US",
    expertise: ["Resume Review", "30-Minute Career Q&A", "Job Search Strategy"],
  },
];

const SearchFields = () => {
  return (
    <section className="mentors-fields">
      <CommonInput placeholder="UI/UX Designer" prefix={<SearchFieldIcon />} />
      <CustomSelect placeholder="Location" />
      <CustomSelect placeholder="Discipline" />
      <CustomSelect placeholder="Industry" />
      <CustomSelect placeholder="Years of experience" />
    </section>
  );
};

const MentorsListing = () => {
  const dispatch = useDispatch();
  const { mentors, loading, error } = useSelector((state) => state.mentor);
  useEffect(() => {
    dispatch(fetchMentorList());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="mentors-main-container">
      <SearchFields />
      <section className="mentors-wrapper">
        <section className="mentors-cards-container">
          {mentors.map((cardData, index) => (
            <MentorCard key={`mentor-card-${index}`} {...cardData} />
          ))}
        </section>
        <CustomPagination />
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
    <section className="main-layout-container">
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
