import { LocationIcon } from "../../assets/svg";

import "./styles.scss";

const LocationWithIcon = (props) => {
  const { location } = props;

  return (
    <article className="mentor-location">
      <LocationIcon />
      <p className="location">{location ?? "N/A"}</p>
    </article>
  );
};

export default LocationWithIcon;
