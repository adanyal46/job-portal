import { useDispatch } from "react-redux";
import { message } from "antd";
import {
  profileEducation,
  profileCertificate,
  deleteEducation,
  deleteCertificate,
} from "../features/profile/profileSlice";

const useProfileActions = () => {
  const dispatch = useDispatch();

  const saveEducation = async (educationData, educationId) => {
    if (educationId) {
      return dispatch(profileEducation({ ...educationData, educationId }));
    } else {
      return dispatch(profileEducation(educationData));
    }
  };

  const saveCertificate = async (certificateData, certificateId) => {
    if (certificateId) {
      return dispatch(
        profileCertificate({ ...certificateData, certificateId })
      );
    } else {
      return dispatch(profileCertificate(certificateData));
    }
  };

  const deleteEdu = async (id) => {
    const response = await dispatch(deleteEducation({ educationId: id }));
    if (response.success) {
      message.success("Education deleted successfully");
    } else {
      message.error("Failed to delete education");
    }
  };

  const deleteCert = async (id) => {
    const response = await dispatch(deleteCertificate({ certificateId: id }));
    if (response.success) {
      message.success("Certification deleted successfully");
    } else {
      message.error("Failed to delete certification");
    }
  };

  return {
    saveEducation,
    saveCertificate,
    deleteEdu,
    deleteCert,
  };
};

export default useProfileActions;
