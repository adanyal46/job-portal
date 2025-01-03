import React, { useState } from "react";
import { PlusIconFaq } from "../../assets/svg";
const faqData = {
  jobSeeker: [
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
    // ... more questions and answers
  ],
  mentor: [
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
  ],
  recruiter: [
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
  ],
  employer: [
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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleCollapse = (index) => {
    setIsExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div className="home_faq">
      <h2>Frequently Asked Questions</h2>
      <div className="tab-card-container">
        <div className="tab-buttons">
          <button
            className={`tab-button ${
              activeTab === "Job Seeker" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Job Seeker")}
          >
            Job Seeker
          </button>
          <button
            className={`tab-button ${activeTab === "Mentor" ? "active" : ""}`}
            onClick={() => handleTabClick("Mentor")}
          >
            Mentor
          </button>
          <button
            className={`tab-button ${
              activeTab === "Recruiter" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Recruiter")}
          >
            Recruiter
          </button>
          <button
            className={`tab-button ${activeTab === "Employer" ? "active" : ""}`}
            onClick={() => handleTabClick("Employer")}
          >
            <span>Employer</span>
          </button>
        </div>
        <div className="tab-content">
          {/* Content for each tab */}
          {activeTab === "Job Seeker" && (
            <div>
              {faqData.jobSeeker.map((item, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="question"
                    onClick={() => toggleCollapse(index)}
                  >
                    <h4>{item.question}</h4>
                    <PlusIconFaq style={{ cursor: "pointer" }} />
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
          )}
          {activeTab === "Mentor" && (
            <div>
              {faqData.mentor.map((item, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="question"
                    onClick={() => toggleCollapse(index)}
                  >
                    <h4>{item.question}</h4>
                    <PlusIconFaq style={{ cursor: "pointer" }} />
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
          )}
          {activeTab === "Recruiter" && (
            <div>
              {faqData.recruiter.map((item, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="question"
                    onClick={() => toggleCollapse(index)}
                  >
                    <h4>{item.question}</h4>
                    <PlusIconFaq style={{ cursor: "pointer" }} />
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
          )}
          {activeTab === "Employer" && (
            <div>
              {faqData.employer.map((item, index) => (
                <div key={index} className="faq-item">
                  <div
                    className="question"
                    onClick={() => toggleCollapse(index)}
                  >
                    <h4>{item.question}</h4>
                    <PlusIconFaq style={{ cursor: "pointer" }} />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
