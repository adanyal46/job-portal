import CommonHeading from "../../components/commonHeading";
import "./styles.scss";

const Certifications = ({ certificates }) => {
  return (
    <section className="certifications-wrapper">
      <CommonHeading heading="Certifications" />

      <section className="certifications-container">
        {certificates?.map((cert) => (
          <section className="certification-detail-wrapper" key={cert.id}>
            <figure className="certification-icon">
              <img
                loading="lazy"
                src="/images/user-icon.png"
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
