import CommonInput from "../../components/commonInput";
import CustomButton from "../../components/customButton";

import "./styles.scss";

const Settings = () => {
  return (
    <section className="main-layout-container">
      <h3 className="layout-main-heading">Settings</h3>

      <section className="profile-main-wrapper">
        <section className="settings-form-wrapper">
          <h6 className="form-highlighted-heading">Manage Account</h6>
          <p className="form-field-group-heading">Change Email Address</p>
          <hr className="form-divider" />

          <section className="form-fields-group">
            <section className="form-field-with-label-group">
              <label className="field-label">Primary Email</label>
              <CommonInput placeholder="Enter Primary Email" />
            </section>

            <section className="form-field-with-label-group">
              <label className="field-label">Secondary Email</label>
              <CommonInput placeholder="Enter Secondary Email" />
            </section>
          </section>

          <p className="form-field-group-heading">Change Email Address</p>
          <hr className="form-divider" />

          <section className="form-fields-group">
            <section className="form-field-with-label-group half-size-field">
              <label className="field-label">Current Password</label>
              <CommonInput placeholder="Enter Current Password" />
            </section>
          </section>

          <section className="form-fields-group">
            <section className="form-field-with-label-group">
              <label className="field-label">New Password</label>
              <CommonInput placeholder="Enter New Password" />
            </section>

            <section className="form-field-with-label-group">
              <label className="field-label">Confirm Password</label>
              <CommonInput placeholder="Confirm New Password" />
            </section>
          </section>

          <p className="form-field-group-heading">Profile Actions</p>
          <hr className="form-divider" />

          <section className="removal-action-group">
            <CustomButton
              category="plain"
              name="Deactivate"
              classes="deactivate"
            />
            <CustomButton category="plain" name="Delete" classes="delete" />
          </section>

          <CustomButton category="primary" name="Save" classes="save" />
        </section>
      </section>
    </section>
  );
};

export default Settings;
