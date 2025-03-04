import { Dropdown, Typography } from "antd";
import { DetailsIcon, EducationIcon } from "../../assets/svg";

const Education = ({
  key,
  id,
  degreName,
  universityName,
  startFrom,
  endIn,
  handleActionMenu,
  action = true,
}) => {
  const educationItem = [
    {
      key: "edit",
      label: <Typography.Text>Edit</Typography.Text>,
    },
  ];
  const handleClick = (event) => {
    handleActionMenu(event.key, id);
  };
  return (
    <section className="education-list-container" key={key}>
      <section className="education-details-container">
        <EducationIcon />

        <article className="education-details">
          <p className="program-name">{degreName ?? "N/A"}</p>
          <p className="institute-name">{universityName ?? "N/A"}</p>
          <p className="duration">
            {new Date(startFrom).getFullYear()} -{" "}
            {new Date(endIn).getFullYear()}
          </p>
        </article>
      </section>
      {action && (
        <Dropdown
          menu={{
            items: educationItem,
            onClick: (event) => handleClick(event),
          }}
          trigger={["click"]}
          placement="bottom"
          overlayStyle={{ width: "150px" }}
        >
          <DetailsIcon style={{ cursor: "pointer" }} />
        </Dropdown>
      )}
    </section>
  );
};
export default Education;
