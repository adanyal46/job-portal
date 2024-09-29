import { Dropdown, Typography } from "antd";
import { CertificationsIcon, DetailsIcon } from "../../assets/svg";

const Experience = ({ item, handleActionMenu }) => {
  const items = [
    {
      key: "edit",
      label: <Typography.Text>Edit</Typography.Text>,
    },
  ];

  const handleClick = (event) => {
    handleActionMenu(event.key, item?.id);
  };
  return (
    <section className="experience-list-container">
      <section className="experience-icon">
        <CertificationsIcon />
      </section>

      <section className="experience-details-wrapper">
        <article className="experience-designation">
          <p className="position-name">{item?.jobTitle ?? "N/A"}</p>
          <Dropdown
            menu={{
              items,
              onClick: (event) => handleClick(event, item?.id),
            }}
            trigger={["click"]}
            placement="bottom"
            overlayStyle={{ width: "150px" }}
          >
            <DetailsIcon />
          </Dropdown>
        </article>

        <article className="company-detail">
          <p className="company-name">{item?.company ?? "N/A"}</p>
          <p className="company-duration">
            {new Date(item?.startedOn).getFullYear()} -
            {new Date(item?.endOn).getFullYear()}
          </p>
        </article>

        <ul className="experience-detail">
          <li className="tasks-performed">{item?.description ?? "N/A"}</li>
        </ul>
      </section>
    </section>
  );
};
export default Experience;
