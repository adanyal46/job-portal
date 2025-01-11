import { useState } from "react";
import CommonInput from "../../components/commonInput";
import CustomButton from "../../components/customButton";
import "./styles.scss";
import { updateEmail, updatePassword } from "../../features/user/userApi";
import { Card, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { logout } from "../../features/auth/authSlice";

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [primaryEmail, setPrimaryEmail] = useState(user?.email || "");
  const [secondaryEmail, setSecondaryEmail] = useState(
    user?.secondaryEmail || ""
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    setLoading(true);

    // Prepare data for email and password updates
    const emailData = {
      primaryEmail,
      secondaryEmail,
    };

    const passwordData = {
      currentPassword,
      newPassword,
    };

    try {
      // Update email if there's a change
      if (
        (primaryEmail && primaryEmail !== user.email) ||
        (secondaryEmail && secondaryEmail !== user?.secondaryEmail)
      ) {
        const emailResponse = await updateEmail(emailData);
        if (emailResponse.data.success) {
          message.open({
            type: "success",
            content: "Email updated successfully!",
          });
          return;
        }
      }

      if (newPassword) {
        const passwordResponse = await updatePassword(passwordData);
        if (passwordResponse.data.success) {
          message.open({
            type: "success",
            content: "Password updated successfully!",
          });
          setConfirmPassword("");
          setCurrentPassword("");
          setNewPassword("");
        } else {
          message.open({
            type: "error",
            content:
              passwordResponse.data.data.message || "Internal Server Error",
          });
        }
      }
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deactivateAccount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put("/setting/js/deactivate");
      if (response.data.success) {
        if (response.data.data) {
          message.open({
            type: "success",
            content: "Account deactivate successfully!",
          });
          return;
        }

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.delete("/setting/js/delete");
      if (response.data.success) {
        message.open({
          type: "success",
          content: "Account delete successfully!",
        });
        await dispatch(logout());
        window.location.replace("/login");
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", width: "100%", marginInline: "auto" }}>
      <Card title="Settings">
        <section className="profile-main-wrapper">
          <section className="settings-form-wrapper">
            <h6 className="form-highlighted-heading">Manage Account</h6>
            <p className="form-field-group-heading">Change Email Address</p>
            <hr className="form-divider" />

            <section className="form-fields-group">
              <section className="form-field-with-label-group">
                <label className="field-label">Primary Email</label>
                <CommonInput
                  placeholder="Enter Primary Email"
                  value={primaryEmail}
                  onChange={(val) => setPrimaryEmail(val)}
                />
              </section>

              <section className="form-field-with-label-group">
                <label className="field-label">Secondary Email</label>
                <CommonInput
                  placeholder="Enter Secondary Email"
                  value={secondaryEmail}
                  onChange={(val) => setSecondaryEmail(val)}
                />
              </section>
            </section>

            <p className="form-field-group-heading">Change Password</p>
            <hr className="form-divider" />

            <section className="form-fields-group">
              <section className="form-field-with-label-group half-size-field">
                <label className="field-label">Current Password</label>
                <CommonInput
                  placeholder="Enter Current Password"
                  value={currentPassword}
                  onChange={(val) => setCurrentPassword(val)}
                />
              </section>
            </section>

            <section className="form-fields-group">
              <section className="form-field-with-label-group">
                <label className="field-label">New Password</label>
                <CommonInput
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(val) => setNewPassword(val)}
                />
              </section>

              <section className="form-field-with-label-group">
                <label className="field-label">Confirm Password</label>
                <CommonInput
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(val) => setConfirmPassword(val)}
                />
              </section>
            </section>

            <p className="form-field-group-heading">Profile Actions</p>
            <hr className="form-divider" />

            <section className="removal-action-group">
              <CustomButton
                category="plain"
                name="Deactivate"
                classes="deactivate"
                loading={loading}
                handleClick={deactivateAccount}
              />
              <CustomButton
                category="plain"
                name="Delete"
                classes="delete"
                loading={loading}
                handleClick={deleteAccount}
              />
            </section>

            <CustomButton
              loading={loading}
              category="primary"
              name="Save"
              classes="save"
              handleClick={handleSubmit}
            />
          </section>
        </section>
      </Card>
    </div>
  );
};

export default Settings;
