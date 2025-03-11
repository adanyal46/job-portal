import { VerifiedIcon } from "../../../assets/svg";

const ProfileStatus = ({ profileStatus }) => {
  if (profileStatus === "VERIFIED") {
    return (
      <a href="#" className="verified-profile">
        <VerifiedIcon />
        Verified
      </a>
    );
  } else {
    return (
      <a href="#" className="unverified-profile">
        Unverified
      </a>
    );
  }
};

export default ProfileStatus;
