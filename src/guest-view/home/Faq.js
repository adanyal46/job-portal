import React, { useState } from "react";
import { PlusIconFaq } from "../../assets/svg";
import "./Faq.css"; // Import the CSS file

const faqData = {
  "Job Seeker": [
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
  ],
  Mentor: [
    {
      question: "How do I become a mentor?",
      answer:
        "Sign up, complete your profile, and submit it for review. Once approved, you can start mentoring.",
    },
    {
      question: "How do I set my own schedule?",
      answer:
        "You have full control over your availability and can set time slots that work best for you.",
    },
    {
      question: "How do I get paid? ",
      answer:
        "Payments are processed securely through our platform, and you receive your earnings directly to your account.",
    },
    {
      question: "What kind of mentees can I expect?",
      answer:
        "Mentees range from students and early-career professionals to experienced individuals seeking specialized guidance.",
    },
    {
      question: "Can I mentor in multiple areas?",
      answer:
        "Yes, you can offer mentorship in multiple fields based on your expertise and interests.",
    },
  ],
  Recruiter: [
    {
      question: "What types of clients can I connect with on this platform",
      answer:
        "You can connect with a wide variety of clients across multiple industries, ranging from startups to large enterprises, all looking for top talent.",
    },
    {
      question:
        "What types of job opportunities can I find as a freelance recruiter?",
      answer:
        " As a recruiter, you can find job opportunities across various industries, including tech, healthcare, finance, marketing, and more. You can work with companies of all sizes, from startups to established enterprises.",
    },
    {
      question: "Can I work with multiple clients at once?",
      answer:
        "Yes, you can work with multiple clients simultaneously. Freelance recruiting gives you the flexibility to take on as many or as few clients as you like, depending on your availability and workload.",
    },
    {
      question:
        "How do I connect with potential clients looking for recruiters? ",
      answer:
        " Clients looking for industry focused recruiters will submit hiring requests on the platform. You can apply to these listings based on your expertise and industry experience.",
    },
    {
      question: "How do I get paid for successful placements?",
      answer:
        "Payments for successful placements are typically processed through the platform’s payment system. You’ll be paid according to the terms agreed with the client, either per placement or based on a retainer or hourly rate.",
    },
  ],
  Employer: [
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
  ],
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState("Job Seeker");
  const [isExpanded, setIsExpanded] = useState({});

  const handleTabClick = (tabName) => setActiveTab(tabName);
  const toggleCollapse = (index) =>
    setIsExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

  return (
    <div className="home_faq">
      <h2>Frequently Asked Questions</h2>
      <div className="tab-card-container">
        <div className="tab-buttons">
          {Object.keys(faqData).map((tab) => (
            <button
              key={tab}
              className={`tab-button ${
                activeTab === tab
                  ? "active " + tab.toLowerCase().replace(" ", "-")
                  : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {faqData[activeTab].map((item, index) => (
            <div key={index} className="faq-item">
              <div className="question" onClick={() => toggleCollapse(index)}>
                <h4>{item.question}</h4>
                <PlusIconFaq className="plus-icon" />
              </div>
              <div
                className="answer"
                style={{ display: isExpanded[index] ? "block" : "none" }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
