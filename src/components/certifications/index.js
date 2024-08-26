import CommonHeading from "../../components/commonHeading";

import "./styles.scss";

const Certifications = () => {
  return (
    <section className="certifications-wrapper">
      <CommonHeading heading="Certifications" />

      <section className="certifications-container">
        <section className="certification-detail-wrapper">
          <figure className="certification-icon">
            <img
              src="/images/user-icon.png"
              className="icon"
              alt="CertificationIcon"
            />
          </figure>

          <article className="certification-details">
            <p className="name">Certification in UX Design</p>
            <p className="platform">Google</p>
            <p className="date">Issued Dec 2023</p>
          </article>
        </section>

        <section className="certification-detail-wrapper">
          <figure className="certification-icon">
            <img
              src="/images/user-icon.png"
              className="icon"
              alt="CertificationIcon"
            />
          </figure>

          <article className="certification-details">
            <p className="name">Certification in UX Design</p>
            <p className="platform">Google</p>
            <p className="date">Issued Dec 2023</p>
          </article>
        </section>

        <section className="certification-detail-wrapper">
          <figure className="certification-icon">
            <img
              src="/images/user-icon.png"
              className="icon"
              alt="CertificationIcon"
            />
          </figure>

          <article className="certification-details">
            <p className="name">Certification in UX Design</p>
            <p className="platform">Google</p>
            <p className="date">Issued Dec 2023</p>
          </article>
        </section>
      </section>
    </section>
  );
};

export default Certifications;
