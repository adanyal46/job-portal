import { useState } from "react";
import { Button, Col, Flex, Image, Row, Typography } from "antd";
import "./Hero.css";

const Hero = () => {
  // Define the complete flow structure as JSON
  const flowData = {
    // Step 1: User Type Selection
    userType: {
      title: "👋 I am a...",
      options: [
        {
          label: "Job Seeker",
          value: "jobSeeker",
          className: "job-seeker-btn",
        },
        { label: "Mentor", value: "mentor", className: "mentor-btn" },
        { label: "Recruiter", value: "recruiter", className: "recruiter-btn" },
        { label: "Employer", value: "employer", className: "employer-btn" },
      ],
      nextStep: (value) => {
        // All user types go to currentStatus next
        return "currentStatus";
      },
    },

    // Step 2: Current Status Selection
    currentStatus: {
      title: "I am currently...",
      options: [
        {
          label: "Looking for a new job",
          value: "lookingForJob",
          className: "status-btn",
        },
        {
          label: "Switching Careers",
          value: "switchingCareers",
          className: "status-btn",
        },
        {
          label: "Doing my own thing",
          value: "doingMyOwnThing",
          className: "status-btn",
        },
        {
          label: "Looking to hire",
          value: "lookingToHire",
          className: "status-btn",
        },
        {
          label: "Wanting to give back to the community",
          value: "givingBack",
          className: "status-btn",
        },
        {
          label: "Just exploring",
          value: "justExploring",
          className: "status-btn",
        },
      ],
      nextStep: (value, userData) => {
        // Job Seekers go to experience, others go to their specific prompts
        if (userData.userType === "jobSeeker") {
          return "experience";
        } else if (userData.userType === "mentor") {
          return "mentorPrompts";
        } else if (userData.userType === "recruiter") {
          return "recruiterPrompts";
        } else if (userData.userType === "employer") {
          return "employerPrompts";
        }
        return "experience"; // Default fallback
      },
    },

    // Step 3: Experience Level (for Job Seekers)
    experience: {
      title: "I have...",
      options: [
        {
          label: "1-3 years of experience",
          value: "1-3",
          className: "experience-btn",
        },
        {
          label: "3-5 years of experience",
          value: "3-5",
          className: "experience-btn",
        },
        {
          label: "5-10 years of experience",
          value: "5-10",
          className: "experience-btn",
        },
        {
          label: "10-20 years of experience",
          value: "10-20",
          className: "experience-btn",
        },
        {
          label: "20-25 years of experience",
          value: "20-25",
          className: "experience-btn",
        },
        {
          label: "25+ years of experience",
          value: "25+",
          className: "experience-btn",
        },
      ],
      nextStep: () => "industry",
    },

    // Step 4: Industry Interest (for Job Seekers)
    industry: {
      title: "I am interested in...",
      options: [
        {
          label: "Financial Services",
          value: "financial",
          className: "industry-btn",
        },
        { label: "Logistics", value: "logistics", className: "industry-btn" },
        { label: "Technology", value: "technology", className: "industry-btn" },
        { label: "Healthcare", value: "healthcare", className: "industry-btn" },
        { label: "Marketing", value: "marketing", className: "industry-btn" },
        { label: "Sales", value: "sales", className: "industry-btn" },
        { label: "Retail", value: "retail", className: "industry-btn" },
        { label: "Automotive", value: "automotive", className: "industry-btn" },
        { label: "Energy", value: "energy", className: "industry-btn" },
      ],
      nextStep: () => "complete",
    },

    // Mentor Specific Prompts
    mentorPrompts: {
      title: "Complete Your Mentor Profile",
      prompts: [
        {
          question: "What motivates you?",
          field: "motivation",
          options: [
            { label: "GROWTH", value: "GROWTH" },
            { label: "LEARNING", value: "LEARNING" },
            { label: "SUCCESS", value: "SUCCESS" },
            { label: "TO GIVE BACK TO THE COMMUNITY", value: "TO_GIVE_BACK" },
            { label: "CONNECTION", value: "CONNECTION" },
            { label: "IMPACT", value: "IMPACT" },
          ],
        },
        {
          question: "What is your coaching style?",
          field: "coachingStyle",
          options: [
            { label: "SUPPORTIVE", value: "SUPPORTIVE" },
            { label: "DIRECT", value: "DIRECT" },
            { label: "EMPATHETIC", value: "EMPATHETIC" },
            { label: "STRATEGIC", value: "STRATEGIC" },
          ],
        },
        {
          question: "Area of expertise?",
          field: "expertise",
          options: [
            { label: "LEADERSHIP", value: "LEADERSHIP" },
            { label: "CAREER", value: "CAREER" },
            { label: "WELLNESS", value: "WELLNESS" },
            { label: "BUSINESS", value: "BUSINESS" },
          ],
        },
        {
          question: "What do you need from a platform?",
          field: "platformNeeds",
          options: [
            { label: "FLEXIBILITY", value: "FLEXIBILITY" },
            { label: "SUPPORT", value: "SUPPORT" },
            { label: "EXPOSURE", value: "EXPOSURE" },
            { label: "TOOLS", value: "TOOLS" },
          ],
        },
        {
          question: "Core value?",
          field: "coreValue",
          options: [
            { label: "INTEGRITY", value: "INTEGRITY" },
            { label: "EFFICIENCY", value: "EFFICIENCY" },
            { label: "COMMUNICATION", value: "COMMUNICATION" },
            { label: "QUALITY", value: "QUALITY" },
          ],
        },
      ],
      nextStep: () => "complete",
    },

    // Recruiter Specific Prompts
    recruiterPrompts: {
      title: "Complete Your Recruiter Profile",
      prompts: [
        {
          question: "What motivates you?",
          field: "motivation",
          options: [
            { label: "SUCCESS", value: "SUCCESS" },
            { label: "GROWTH", value: "GROWTH" },
            { label: "CHALLENGE", value: "CHALLENGE" },
            { label: "CONNECTION", value: "CONNECTION" },
            { label: "FLEXIBILITY", value: "FLEXIBILITY" },
          ],
        },
        {
          question: "What is your recruiting style?",
          field: "recruitingStyle",
          options: [
            { label: "PROACTIVE", value: "PROACTIVE" },
            { label: "CONSULTATIVE", value: "CONSULTATIVE" },
            { label: "ANALYTICAL", value: "ANALYTICAL" },
            { label: "RELATIONSHIP", value: "RELATIONSHIP" },
          ],
        },
        {
          question: "What do you need from a platform?",
          field: "platformNeeds",
          options: [
            { label: "TOOLS", value: "TOOLS" },
            { label: "EXPOSURE", value: "EXPOSURE" },
            { label: "ACCESS", value: "ACCESS" },
          ],
        },
        {
          question: "Recent success?",
          field: "recentSuccess",
          options: [
            { label: "PLACEMENT", value: "PLACEMENT" },
            { label: "RETENTION", value: "RETENTION" },
            { label: "FIT", value: "FIT" },
            { label: "SPEED", value: "SPEED" },
          ],
        },
        {
          question: "Core value?",
          field: "coreValue",
          options: [
            { label: "INTEGRITY", value: "INTEGRITY" },
            { label: "EFFICIENCY", value: "EFFICIENCY" },
            { label: "COMMUNICATION", value: "COMMUNICATION" },
            { label: "QUALITY", value: "QUALITY" },
          ],
        },
      ],
      nextStep: () => "complete",
    },

    // Employer Specific Prompts
    employerPrompts: {
      title: "Complete Your Employer Profile",
      prompts: [
        {
          question: "Main hiring goal?",
          field: "hiringGoal",
          options: [
            { label: "FIT", value: "FIT" },
            { label: "QUALITY", value: "QUALITY" },
            { label: "GROWTH", value: "GROWTH" },
            { label: "INNOVATION", value: "INNOVATION" },
            { label: "SOFT SKILLS", value: "SOFT_SKILLS" },
          ],
        },
        {
          question: "What are your recruitment challenges?",
          field: "challenges",
          options: [
            { label: "SKILLS GAP", value: "SKILLS_GAP" },
            { label: "COMPETITION", value: "COMPETITION" },
            { label: "RETENTION", value: "RETENTION" },
            { label: "DIVERSITY", value: "DIVERSITY" },
          ],
        },
        {
          question: "How would you describe your hiring approach?",
          field: "hiringApproach",
          options: [
            { label: "COLLABORATIVE", value: "COLLABORATIVE" },
            { label: "DATA-DRIVEN", value: "DATA_DRIVEN" },
            { label: "FAST-PACED", value: "FAST_PACED" },
            { label: "THOROUGH", value: "THOROUGH" },
          ],
        },
        {
          question: "What motivates your hiring decisions?",
          field: "hiringMotivation",
          options: [
            { label: "TALENT", value: "TALENT" },
            { label: "CULTURE", value: "CULTURE" },
            { label: "SPEED", value: "SPEED" },
            { label: "DIVERSITY", value: "DIVERSITY" },
          ],
        },
      ],
      nextStep: () => "complete",
    },

    // Completion step
    complete: {
      title: "Profile Complete!",
      message:
        "Thank you for providing your information. We'll connect you with the best opportunities soon!",
    },
  };

  // State to track current step
  const [currentStep, setCurrentStep] = useState("userType");

  // State to store all user selections
  const [userData, setUserData] = useState({});

  // State for prompt answers
  const [promptAnswers, setPromptAnswers] = useState({});

  // Handle button click for main flow steps
  const handleButtonClick = (option) => {
    // Update user data with the selected option
    const updatedUserData = {
      ...userData,
      [currentStep]: option.value,
    };

    setUserData(updatedUserData);

    // Determine the next step based on the option selected
    const nextStep = flowData[currentStep].nextStep(
      option.value,
      updatedUserData
    );
    setCurrentStep(nextStep);
  };

  // Handle prompt answer selection
  const handlePromptAnswer = (field, value) => {
    setPromptAnswers({
      ...promptAnswers,
      [field]: value,
    });
  };

  // Handle completion of prompts
  const handlePromptsComplete = () => {
    // Combine all data
    const finalData = {
      ...userData,
      promptAnswers,
    };

    setCurrentStep("complete");
  };

  // Reset all selections
  const resetSelections = () => {
    setCurrentStep("userType");
    setUserData({});
    setPromptAnswers({});
  };

  // Render buttons for a step
  const renderStepButtons = (step) => {
    return (
      <Flex wrap="wrap" gap={10} className="hero-buttons">
        {flowData[step].options.map((option, index) => (
          <Button
            style={{ fontSize: "15px", padding: "15px 20px !important" }}
            key={index}
            shape="round"
            className={option.className}
            onClick={() => handleButtonClick(option)}
          >
            {option.label}
          </Button>
        ))}
      </Flex>
    );
  };

  // Render prompts for mentor, recruiter, or employer with button-based answers
  const renderPrompts = (step) => {
    return (
      <div className="prompts-container">
        {flowData[step].prompts.map((prompt, promptIndex) => (
          <div key={promptIndex} className="prompt-question">
            <Typography.Title level={5}>{prompt.question}</Typography.Title>
            <Flex
              gap={8}
              className="prompt-options"
              wrap="wrap"
              style={{ marginBlock: "10px" }}
            >
              {prompt.options.map((option, optionIndex) => (
                <Button
                  key={optionIndex}
                  shape="round"
                  style={{ fontSize: "15px", padding: "15px 20px !important" }}
                  className={`prompt-option-btn ${
                    promptAnswers[prompt.field] === option.value
                      ? "prompt-option-selected"
                      : ""
                  }`}
                  onClick={() => {
                    // Update the promptAnswers state directly
                    const updatedAnswers = {
                      ...promptAnswers,
                      [prompt.field]: option.value,
                    };
                    setPromptAnswers(updatedAnswers);
                    console.log(`Selected ${prompt.field}: ${option.value}`);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Flex>
          </div>
        ))}

        <Button
          type="primary"
          size="large"
          className="complete-profile-btn"
          onClick={handlePromptsComplete}
          disabled={!isProfileComplete()}
        >
          Complete Profile
        </Button>
      </div>
    );
  };

  // Helper function to check if all prompt questions have been answered
  const isProfileComplete = () => {
    // Get all required fields for the current step
    const requiredFields = flowData[currentStep].prompts.map(
      (prompt) => prompt.field
    );

    // Check if all required fields have values
    return requiredFields.every((field) => promptAnswers[field] !== undefined);
  };

  // Render completion screen
  const renderCompletion = () => (
    <div className="completion-message">
      <Typography.Title level={3}>{flowData.complete.title}</Typography.Title>
      <Typography.Paragraph>{flowData.complete.message}</Typography.Paragraph>
      <Button type="primary" onClick={resetSelections}>
        Start Over
      </Button>
    </div>
  );

  // Render current step content
  const renderCurrentStepContent = () => {
    const step = flowData[currentStep];

    if (currentStep === "complete") {
      return renderCompletion();
    }

    return (
      <div>
        <Typography.Title level={3}>{step.title}</Typography.Title>

        {["userType", "currentStatus", "experience", "industry"].includes(
          currentStep
        )
          ? renderStepButtons(currentStep)
          : renderPrompts(currentStep)}

        {currentStep !== "userType" && currentStep !== "complete" && (
          <div className="waiting-message">
            <Typography.Text>
              Please wait, we're taking you somewhere special!✨
            </Typography.Text>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="home-bg">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={14} lg={14}>
          <div className="hero-content">
            <Flex vertical gap={10}>
              <Typography.Title level={2} className="hero-title">
                Find your place at Fuse!
              </Typography.Title>
              <Typography.Text className="hero-text">
                Are you wondering about what your next move should be? Are you a
                talented individual seeking an exciting new challenge?
              </Typography.Text>
              <Typography.Text className="hero-text">
                Do you want a different way of working? A place where you get
                rewarded by the effort you put into your work? Or simply a
                platform Fuse is just the place for you!
              </Typography.Text>

              {renderCurrentStepContent()}
            </Flex>
          </div>
        </Col>
        <Col xs={24} md={10} lg={10}>
          <div className="hero-image-container">
            <Image
              src="/guest/home-right-img.svg"
              width="100%"
              preview={false}
              className="hero-main-image"
            />
            <div className="hero-arrow">
              <Image
                className="ant-col-xs-0 ant-col-md-24"
                src="/guest/home-arrow-white.svg"
                width={100}
                preview={false}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Hero;
