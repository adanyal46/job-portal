import { useState } from "react";
import { Checkbox, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { bookSession } from "../../../features/booking/bookingSlice";

// Import your components, icons, etc.
import CustomButton from "../../../components/customButton";
import CommonModal from "../../../components/commonModal";
import CommonInput from "../../../components/commonInput";
import {
  ActiveBillingIcon,
  ActiveCheckIcon,
  ActiveReadCVIcon,
  ActiveScheduleDetailIcon,
  BillingIcon,
  CheckIcon,
  LeftArrowIcon,
  ReadCVIcon,
  RightArrowIcon,
  ScheduleDetailIcon,
} from "../../../assets/svg";

import "./scheduleModal.scss";
import axiosInstance from "../../../api/axiosInstance";

const ModalStep = (props) => {
  const { active, ActiveIcon, Icon, title, description } = props;
  return (
    <section className={`step-wrapper ${active && "active-step"}`}>
      <span className="icon-wrapper">{active ? <ActiveIcon /> : <Icon />}</span>

      <article className="step-detail-wrapper">
        <span className="step-title">{title}</span>
        <span className="step-description">{description}</span>
      </article>
    </section>
  );
};

const StepButtons = ({ services, selectedServiceId, setSelectedServiceId }) => {
  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId); // Set the selected service ID
  };
  return (
    <section className="steps-buttons-container">
      {services?.map((service) => (
        <p
          key={service.id}
          style={{ cursor: "pointer" }}
          className={`step-button ${
            selectedServiceId === service.id ? "active" : ""
          }`} // Add 'active' class if selected
          onClick={() => handleServiceClick(service.id)} // Handle click event
        >
          {service.name}
        </p>
      ))}
    </section>
  );
};

const TimeSlot = ({ timeSlot }) => {
  return <p className="time-slot-time">{timeSlot}</p>;
};

const ScheduleButtons = (props) => {
  const { handlePrevious, handleNext, currentStep, isLoading } = props;

  return (
    <section className="schedule-fields-buttons">
      <CustomButton
        key="cancelButton"
        category="plain"
        classes="schedule-modal-button"
        name={
          <span className="icon-with-title">
            <LeftArrowIcon /> Previous
          </span>
        }
        disabled={currentStep === 1 || isLoading}
        handleClick={handlePrevious}
      />
      <CustomButton
        key="saveButton"
        category="primary"
        classes={`schedule-modal-button ${currentStep === 4 && "active"}`}
        name={
          currentStep === 4 ? (
            <span className="icon-with-title">
              Submit <ActiveCheckIcon />
            </span>
          ) : (
            <span className="icon-with-title">
              Next <RightArrowIcon />
            </span>
          )
        }
        handleClick={handleNext}
        loading={isLoading}
      />
    </section>
  );
};

const ScheduleModal = (props) => {
  const {
    showScheduleModal,
    closeScheduleModal,
    selectedServiceId,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    services,
    mentorId,
    setSelectedServiceId,
    mentorDetail,
  } = props;
  const calendlyLink = mentorDetail?.Profile?.[0]?.calendlyLink;

  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const findServ = services?.find((item) => item.id === selectedServiceId);
  const { user } = useSelector((state) => state.profile);

  // Billing form state
  const [billingForm, setBillingForm] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvv: "",
    agreedToTerms: false,
  });

  // Form errors state
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvv: "",
    agreedToTerms: "",
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setBillingForm({
      ...billingForm,
      [field]: value,
    });

    // Clear the error for this field when user types
    setFormErrors({
      ...formErrors,
      [field]: "",
    });
  };

  // Validate billing form
  const validateBillingForm = () => {
    let isValid = true;
    const errors = {
      cardNumber: "",
      nameOnCard: "",
      expirationDate: "",
      cvv: "",
      agreedToTerms: "",
    };

    // Card number validation - should be 16 digits (simplified)
    if (!billingForm.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(billingForm.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    }

    // Name validation
    if (!billingForm.nameOnCard.trim()) {
      errors.nameOnCard = "Name on card is required";
      isValid = false;
    }

    // Expiration date validation (MM/YY format)
    if (!billingForm.expirationDate.trim()) {
      errors.expirationDate = "Expiration date is required";
      isValid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(billingForm.expirationDate)) {
      errors.expirationDate = "Format must be MM/YY";
      isValid = false;
    }

    // CVV validation (3-4 digits)
    if (!billingForm.cvv.trim()) {
      errors.cvv = "CVV is required";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(billingForm.cvv)) {
      errors.cvv = "CVV must be 3 or 4 digits";
      isValid = false;
    }

    // Terms agreement validation
    if (!billingForm.agreedToTerms) {
      errors.agreedToTerms = "You must agree to the terms";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Process payment via API
  const processPayment = async () => {
    try {
      setIsLoading(true);

      const result = await axiosInstance.post("/user/charge", {
        amount: findServ.pricing,
        cardNumber: billingForm.cardNumber,
        expDate: billingForm.expirationDate,
        cardCode: billingForm.cvv,
      });

      console.log(result);
      // Return success for demo purposes
      return { success: true };
    } catch (error) {
      console.error("Payment processing error:", error);
      return {
        success: false,
        error: error.error || error.message || "Payment processing failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    // Step 1: Service selection validation
    if (currentStep === 1) {
      if (!selectedServiceId) {
        message.error("Please select a service first!");
        return;
      }
      setCurrentStep(2);
      return;
    }

    // Step 2: Billing information validation
    if (currentStep === 2) {
      // Validate the billing form
      if (!validateBillingForm()) {
        // Show error message if validation fails
        message.error(
          "Please fill out all required billing information correctly"
        );
        return;
      }
      setCurrentStep(3);
      // Process payment
      const paymentResult = await processPayment();

      if (!paymentResult.success) {
        message.error(paymentResult.error || "Payment processing failed");
        return;
      }

      // If payment successful, proceed to next step
      setCurrentStep(3);
      return;
    }

    // Step 3: Book session through API
    if (currentStep === 3) {
      try {
        setIsLoading(true);
        let values = {
          selectedService: selectedServiceId,
          mentorId: mentorId,
          userId: user?.id,
          paymentDetails: {
            // Send only necessary payment details
            cardLast4: billingForm.cardNumber.slice(-4),
            nameOnCard: billingForm.nameOnCard,
            // Don't send full card details for security
          },
        };

        const response = await dispatch(bookSession(values)).unwrap();

        if (response.success) {
          closeScheduleModal();
          message.success("Booking saved successfully!");
        } else {
          message.error(response.message || "Failed to book session");
        }
      } catch (error) {
        console.error("Booking error:", error);
        message.error("An error occurred while booking your session");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((st) => st - 1);
  };

  const handleTitleChange = (step) => {
    switch (step) {
      case 1:
        return "Review Your Order";
      case 2:
        return "Payment Details";
      default:
        return "Submit";
    }
  };

  const handleDescriptionChange = (step) => {
    switch (step) {
      case 1:
        return "Kindly review the details about your order";
      case 2:
        return "Fill out your card details";
      default:
        return "";
    }
  };

  const modalTitle = handleTitleChange(currentStep);
  const modalDescription = handleDescriptionChange(currentStep);

  return (
    <CommonModal
      title={modalTitle}
      description={modalDescription}
      isModalOpen={showScheduleModal}
      handleClose={closeScheduleModal}
      classes="schedule-modal-container"
      footer={[]}
    >
      <section className="schedule-modal-body-wrapper">
        <section className="schedule-steps-container">
          <ModalStep
            Icon={ReadCVIcon}
            ActiveIcon={ActiveReadCVIcon}
            title="Review Your Order"
            description="Review Order Details"
            active={currentStep === 1}
          />

          <ModalStep
            Icon={BillingIcon}
            ActiveIcon={ActiveBillingIcon}
            title="BILLING"
            description="Payment Details"
            active={currentStep === 2}
          />

          <ModalStep
            Icon={CheckIcon}
            ActiveIcon={ActiveCheckIcon}
            title="SUBMIT"
            description="Submit & Continue"
            active={currentStep === 3}
          />
        </section>

        <section className="schedule-form-container">
          {currentStep === 1 && (
            <section className="review-step-container">
              <StepButtons
                services={services}
                selectedServiceId={selectedServiceId}
                setSelectedServiceId={setSelectedServiceId}
              />
              <article className="review-content-container">
                <p className="review-label">Service</p>
                <p className="review-value">{findServ?.name}</p>
              </article>
              <article className="review-content-container">
                <p className="review-label">Subtotal</p>
                <p className="review-value">${findServ?.pricing}</p>
              </article>
              <article className="review-content-container">
                <p className="review-label">Special Discount</p>
                <p className="review-value">$0</p>
              </article>
              <section className="voucher-field-container">
                <label className="voucher-code-label">Voucher Code</label>

                <section className="voucher-field-with-button">
                  <CommonInput
                    placeholder="Enter Voucher Code"
                    classes="voucher-input-field"
                  />

                  <CustomButton
                    category="plain"
                    classes="apply-voucher-button"
                    name="Apply"
                  />
                </section>
              </section>
              <article className="review-content-container">
                <p className="total-label">Total</p>
                <h4 className="total-value">${findServ?.pricing}</h4>
              </article>
              <ScheduleButtons
                currentStep={currentStep}
                handlePrevious={handlePreviousStep}
                handleNext={handleNextStep}
                isLoading={isLoading}
              />
            </section>
          )}

          {currentStep === 2 && (
            <section className="billing-step-container">
              <figure className="credit-card-picture-container">
                <img
                  loading="lazy"
                  src="/images/credit-card-icon.png"
                  className="credit-card-picture"
                  alt="credit-card-icon"
                />
              </figure>

              <article className="billing-field-wrapper">
                <label className="billing-field-label">Card Number</label>
                <Input
                  placeholder="2634 2345 6452 1245"
                  className="billing-input-field"
                  value={billingForm.cardNumber}
                  onChange={(e) =>
                    handleInputChange("cardNumber", e.target.value)
                  }
                  status={formErrors.cardNumber ? "error" : ""}
                />
                {formErrors.cardNumber && (
                  <div className="error-message">{formErrors.cardNumber}</div>
                )}
              </article>

              <section className="billing-fields-group-container">
                <article className="billing-field-wrapper">
                  <label className="billing-field-label">Name On Card</label>
                  <Input
                    placeholder="John Doe"
                    className="billing-input-field"
                    value={billingForm.nameOnCard}
                    onChange={(e) =>
                      handleInputChange("nameOnCard", e.target.value)
                    }
                    status={formErrors.nameOnCard ? "error" : ""}
                  />
                  {formErrors.nameOnCard && (
                    <div className="error-message">{formErrors.nameOnCard}</div>
                  )}
                </article>

                <article className="billing-field-wrapper">
                  <label className="billing-field-label">Expiration Date</label>
                  <Input
                    placeholder="MM/YY"
                    className="billing-input-field"
                    value={billingForm.expirationDate}
                    onChange={(e) =>
                      handleInputChange("expirationDate", e.target.value)
                    }
                    status={formErrors.expirationDate ? "error" : ""}
                  />
                  {formErrors.expirationDate && (
                    <div className="error-message">
                      {formErrors.expirationDate}
                    </div>
                  )}
                </article>

                <article className="billing-field-wrapper">
                  <label className="billing-field-label">CVV</label>
                  <Input
                    placeholder="CVV"
                    className="billing-input-field"
                    value={billingForm.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    status={formErrors.cvv ? "error" : ""}
                  />
                  {formErrors.cvv && (
                    <div className="error-message">{formErrors.cvv}</div>
                  )}
                </article>
              </section>

              <Checkbox
                checked={billingForm.agreedToTerms}
                onChange={(e) =>
                  handleInputChange("agreedToTerms", e.target.checked)
                }
              >
                I have read all the agreement details.
              </Checkbox>
              {formErrors.agreedToTerms && (
                <div className="error-message">{formErrors.agreedToTerms}</div>
              )}

              <ScheduleButtons
                currentStep={currentStep}
                handlePrevious={handlePreviousStep}
                handleNext={handleNextStep}
                isLoading={isLoading}
              />
            </section>
          )}

          {currentStep === 3 && (
            <section className="submit-step-container">
              <figure
                className="submit-icon-container"
                style={{ marginBottom: "100px" }}
              >
                <img
                  loading="lazy"
                  src="/images/submit-schedule.png"
                  className="submit-icon"
                  alt="Submit-Icon"
                />

                <figcaption className="submit-caption">
                  Thank You for Providing Details.
                </figcaption>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#52595C",
                    lineHeight: "24px",
                  }}
                >
                  Book your session to get started
                </p>
                <button
                  onClick={() => {
                    window.open(calendlyLink, "_blank");
                  }}
                  style={{
                    outline: "none",
                    border: "none",
                    backgroundColor: "#E2F3F9",
                    padding: "11px 20px",
                    color: "#009DD1",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "500",
                    marginBlock: "10px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_9439_76048)">
                      <path
                        d="M16.9935 15.9991C16.233 16.6751 15.2843 17.5164 13.559 17.5164H12.5301C11.283 17.5164 10.1491 17.063 9.33762 16.2401C8.54498 15.4364 8.10839 14.3361 8.10839 13.1418V11.7302C8.10839 10.5359 8.54498 9.4356 9.33762 8.63191C10.1491 7.80896 11.283 7.3556 12.5301 7.3556H13.559C15.2843 7.3556 16.2321 8.19692 16.9935 8.87293C17.783 9.57403 18.4652 10.1793 20.2822 10.1793C20.5593 10.1793 20.8361 10.1571 21.1097 10.113C21.1097 10.1076 21.1061 10.1027 21.1039 10.0973C20.9949 9.82657 20.8671 9.56385 20.7214 9.31106L19.5065 7.20328C18.9587 6.2532 18.1709 5.46423 17.2223 4.91566C16.2736 4.36708 15.1975 4.07823 14.102 4.07812H11.6717C10.5763 4.07823 9.50015 4.36708 8.55147 4.91566C7.6028 5.46423 6.815 6.2532 6.26723 7.20328L5.05231 9.31106C4.50464 10.2612 4.21631 11.3389 4.21631 12.436C4.21631 13.5331 4.50464 14.6108 5.05231 15.5609L6.26723 17.6687C6.81502 18.6187 7.60284 19.4076 8.55151 19.9561C9.50019 20.5046 10.5763 20.7934 11.6717 20.7934H14.102C15.1974 20.7934 16.2736 20.5046 17.2222 19.9561C18.1709 19.4076 18.9587 18.6187 19.5065 17.6687L20.7214 15.5609C20.8671 15.3081 20.9949 15.0454 21.1039 14.7747C21.1039 14.7693 21.1079 14.7644 21.1097 14.759C20.8361 14.7148 20.5593 14.6927 20.2822 14.6927C18.4652 14.6927 17.783 15.298 16.9935 15.9991Z"
                        fill="#006BFF"
                      />
                      <path
                        d="M13.559 8.63281H12.5301C10.6326 8.63281 9.3855 9.99021 9.3855 11.728V13.1396C9.3855 14.8773 10.6326 16.2347 12.5301 16.2347H13.559C16.3243 16.2347 16.1087 13.4124 20.2822 13.4124C20.6778 13.4121 21.0727 13.4482 21.4618 13.5203C21.5883 12.8023 21.5883 12.0675 21.4618 11.3494C21.0727 11.4219 20.6779 11.4582 20.2822 11.4578C16.1074 11.4574 16.3243 8.63281 13.559 8.63281Z"
                        fill="#006BFF"
                      />
                      <path
                        d="M23.8602 14.553C23.1488 14.0322 22.3287 13.6799 21.4617 13.5226C21.4617 13.5298 21.4594 13.5369 21.4581 13.5436C21.3837 13.9601 21.2669 14.3678 21.1096 14.7604C21.826 14.8714 22.5057 15.1515 23.0926 15.5775C23.0926 15.5838 23.089 15.59 23.0868 15.5968C22.7542 16.6786 22.2515 17.7004 21.5977 18.6238C20.9514 19.5386 20.1666 20.347 19.2716 21.0196C17.1051 22.6519 14.4009 23.4001 11.705 23.1131C9.00911 22.8261 6.52238 21.5253 4.74693 19.4734C2.97148 17.4214 2.0396 14.7713 2.13944 12.058C2.23929 9.34468 3.36343 6.7704 5.28487 4.85494C6.5902 3.54864 8.2104 2.60226 9.98839 2.10758C11.7664 1.61289 13.6418 1.58667 15.4329 2.03146C17.224 2.47625 18.8699 3.37696 20.2112 4.64626C21.5524 5.91556 22.5434 7.51039 23.0881 9.27612C23.0904 9.28284 23.0922 9.28911 23.094 9.29538C22.5066 9.72146 21.8264 10.0014 21.1096 10.1121C21.2669 10.505 21.3838 10.913 21.4586 11.3297C21.4586 11.3364 21.4586 11.3431 21.4617 11.3494C22.3288 11.1925 23.149 10.8401 23.8602 10.319C24.5442 9.81236 24.4118 9.23983 24.3075 8.90115C22.8005 3.99794 18.2428 0.435547 12.8539 0.435547C6.23676 0.435547 0.87207 5.80825 0.87207 12.4353C0.87207 19.0624 6.23676 24.4355 12.8539 24.4355C18.2428 24.4355 22.8005 20.8732 24.3053 15.9713C24.4118 15.6326 24.5442 15.0601 23.8602 14.553Z"
                        fill="#006BFF"
                      />
                      <path
                        d="M21.1097 10.1128C20.8361 10.157 20.5593 10.1792 20.2822 10.1791C18.4652 10.1791 17.783 9.5739 16.9935 8.8728C16.233 8.19679 15.2843 7.35547 13.559 7.35547H12.5301C11.283 7.35547 10.1491 7.80883 9.33763 8.63178C8.54498 9.43547 8.1084 10.5357 8.1084 11.7301V13.1417C8.1084 14.336 8.54498 15.4363 9.33763 16.2399C10.1491 17.0629 11.283 17.5163 12.5301 17.5163H13.559C15.2843 17.5163 16.2321 16.6749 16.9935 15.9989C17.783 15.2978 18.4652 14.6926 20.2822 14.6926C20.5593 14.6925 20.8361 14.7147 21.1097 14.7589C21.267 14.3663 21.3837 13.9586 21.4582 13.5422C21.4582 13.5354 21.4609 13.5283 21.4617 13.5211C21.0727 13.449 20.6778 13.4128 20.2822 13.4131C16.1073 13.4131 16.3243 16.2355 13.559 16.2355H12.5301C10.6326 16.2355 9.38549 14.8781 9.38549 13.1403V11.7305C9.38549 9.99277 10.6326 8.63537 12.5301 8.63537H13.559C16.3243 8.63537 16.1087 11.4577 20.2822 11.4577C20.6779 11.4581 21.0727 11.4218 21.4617 11.3493C21.4617 11.343 21.4617 11.3363 21.4586 11.3296C21.3838 10.9132 21.2669 10.5055 21.1097 10.1128Z"
                        fill="#0AE9EF"
                      />
                      <path
                        d="M21.1097 10.1128C20.8361 10.157 20.5593 10.1792 20.2822 10.1791C18.4652 10.1791 17.783 9.5739 16.9935 8.8728C16.233 8.19679 15.2843 7.35547 13.559 7.35547H12.5301C11.283 7.35547 10.1491 7.80883 9.33763 8.63178C8.54498 9.43547 8.1084 10.5357 8.1084 11.7301V13.1417C8.1084 14.336 8.54498 15.4363 9.33763 16.2399C10.1491 17.0629 11.283 17.5163 12.5301 17.5163H13.559C15.2843 17.5163 16.2321 16.6749 16.9935 15.9989C17.783 15.2978 18.4652 14.6926 20.2822 14.6926C20.5593 14.6925 20.8361 14.7147 21.1097 14.7589C21.267 14.3663 21.3837 13.9586 21.4582 13.5422C21.4582 13.5354 21.4609 13.5283 21.4617 13.5211C21.0727 13.449 20.6778 13.4128 20.2822 13.4131C16.1073 13.4131 16.3243 16.2355 13.559 16.2355H12.5301C10.6326 16.2355 9.38549 14.8781 9.38549 13.1403V11.7305C9.38549 9.99277 10.6326 8.63537 12.5301 8.63537H13.559C16.3243 8.63537 16.1087 11.4577 20.2822 11.4577C20.6779 11.4581 21.0727 11.4218 21.4617 11.3493C21.4617 11.343 21.4617 11.3363 21.4586 11.3296C21.3838 10.9132 21.2669 10.5055 21.1097 10.1128Z"
                        fill="#0AE9EF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9439_76048">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.87207 0.935547)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Book Now
                </button>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#52595C",
                    lineHeight: "24px",
                  }}
                >
                  or
                </p>
              </figure>
              <ScheduleButtons
                currentStep={currentStep}
                handlePrevious={handlePreviousStep}
                handleNext={handleNextStep}
              />
            </section>
          )}
        </section>
      </section>
    </CommonModal>
  );
};

export default ScheduleModal;
