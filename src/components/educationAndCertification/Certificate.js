import { Dropdown, Typography } from "antd";
import { CertificationsIcon, DetailsIcon } from "../../assets/svg";

const Certifications = ({ certificate, handleCerAction }) => {
  const certificateItems = [
    {
      key: "edit",
      label: <Typography.Text>Edit</Typography.Text>,
    },
  ];
  const handleClick = (event) => {
    handleCerAction(event.key, certificate?.id);
  };
  return (
    <section className="education-list-container">
      <section className="education-details-container">
        <CertificationsIcon />

        <article className="education-details">
          <p className="program-name">{certificate?.certName ?? "N/A"}</p>
          <p className="institute-name">{certificate?.orgName ?? "N/A"}</p>
          <p className="duration">
            {new Date(certificate?.startedOn).getFullYear()} -{" "}
            {new Date(certificate?.completedOn).getFullYear()}
          </p>
        </article>
      </section>

      <Dropdown
        menu={{
          items: certificateItems,
          onClick: (event) => handleClick(event),
        }}
        trigger={["click"]}
        placement="bottom"
        overlayStyle={{ width: "150px" }}
      >
        <DetailsIcon style={{ cursor: "pointer" }} />
      </Dropdown>
    </section>
  );
};

export default Certifications;
