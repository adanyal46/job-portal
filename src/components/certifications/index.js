import CommonHeading from "../../components/commonHeading";
import "./styles.scss";

const Certifications = ({ certificates, profile }) => {
  return (
    <section className="certifications-wrapper">
      <CommonHeading heading="Certifications" />

      <section className="certifications-container">
        {certificates?.map((cert) => (
          <section className="certification-detail-wrapper" key={cert.id}>
            <figure className="certification-icon">
              <img
                loading="lazy"
                src={profile?.avatarUrl || "/images/user-icon.png"}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "100px",
                }}
                className="icon"
                alt="CertificationIcon"
              />
            </figure>

            <article className="certification-details">
              <p className="name">Certification in {cert.certName}</p>
              <p className="platform">{cert.orgName}</p>
              <p className="date">
                Issued on{" "}
                {new Date(cert.completedOn).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </article>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Certifications;
