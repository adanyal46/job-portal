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
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
    },
  ],
  Recruiter: [
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 1.",
    },
    {
      question: "perspiciatis unde omnis iste natus error?",
      answer: "Answer 2.",
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
