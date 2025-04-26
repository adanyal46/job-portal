import { useState } from "react";
import { Select, message } from "antd";

import CommonHeading from "../commonHeading";
import CommonModal from "../commonModal";
import CommonInput from "../commonInput";
import CustomButton from "../customButton";

import {
  DetailsIcon,
  AddCircleIcon,
  LocationEmployerProfileIcon,
} from "../../assets/svg";

import "./styles.scss";
import { useDispatch } from "react-redux";
import { profileLocation } from "../../features/profile/profileSlice";

// List of all countries
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Location = ({
  showLocationModal,
  setShowLocationModal,
  location,
  btnShow = true,
}) => {
  const dispatch = useDispatch();
  const [locationData, setLocationData] = useState({
    city: (location && location[0]?.city) || "",
    state: (location && location[0]?.state) || "",
    country: (location && location[0]?.country) || "",
    postalCode: (location && location[0]?.postalCode) || "",
  });

  const handleShowLocationModal = () => {
    setShowLocationModal(() => true);
  };

  const handleCloseLocationModal = () => {
    setShowLocationModal(() => false);
  };

  const handleChange = (name, value) => {
    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(
        profileLocation({
          ...locationData,
          postalCode: parseInt(locationData.postalCode),
        })
      ).unwrap();
      if (response.success) {
        message.open({
          type: "success",
          content: "Location saved successfully",
        });
        handleCloseLocationModal();
      }
    } catch (error) {
      message.open({
        type: "error",
        content: "Failed to save location",
      });
    }
  };

  return (
    <section className="location-wrapper">
      <CommonHeading heading="Location" />

      <section className="location-container">
        {location?.map((item) => (
          <section className="location-list-container" key={item.id}>
            <section className="location-details-container">
              <LocationEmployerProfileIcon />

              <article className="location-details">
                <p className="location-name">{item.city}</p>
                <p className="location-city">{item.country}</p>
                <p className="location-id">{item.postalCode}</p>
              </article>
            </section>

            <DetailsIcon />
          </section>
        ))}
      </section>

      {btnShow && (
        <CustomButton
          category="additional"
          name="Add"
          icon={<AddCircleIcon />}
          handleClick={handleShowLocationModal}
        />
      )}

      {showLocationModal && (
        <CommonModal
          title="Location"
          description="Enter your Location Information"
          isModalOpen={showLocationModal}
          handleClose={handleCloseLocationModal}
          handleOk={handleSubmit}
          isDelete={false}
        >
          <section className="basic-info-form-wrapper">
            <section className="field-container">
              <span className="label">City</span>
              <CommonInput
                value={locationData.city}
                onChange={(val) => handleChange("city", val)}
                placeholder="Enter City"
              />
            </section>

            <section className="field-container">
              <span className="label">State/Province</span>
              <CommonInput
                value={locationData.state}
                onChange={(val) => handleChange("state", val)}
                placeholder="Enter State/Province"
              />
            </section>

            <section className="field-container">
              <span className="label">Country</span>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={(value) => handleChange("country", value)}
                value={locationData.country || undefined}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {countries.map((country) => (
                  <Select.Option key={country} value={country}>
                    {country}
                  </Select.Option>
                ))}
              </Select>
            </section>

            <section className="field-container">
              <span className="label">Zip/Postal Code</span>
              <CommonInput
                value={locationData.postalCode}
                onChange={(val) => handleChange("postalCode", val)}
                placeholder="Enter Zip/Postal Code"
              />
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default Location;
