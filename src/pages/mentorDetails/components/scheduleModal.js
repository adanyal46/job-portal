import { useState } from "react";

import { Checkbox, message } from "antd";

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
import { useDispatch } from "react-redux";
import { bookSession } from "../../../features/booking/bookingSlice";

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

const StepButtons = () => {
  return (
    <section className="steps-buttons-container">
      <p className="step-button active">Resume Review</p>
      <p className="step-button">Interview Prep</p>
      <p className="step-button">Job Search Strategy</p>
    </section>
  );
};

const TimeSlot = ({ timeSlot }) => {
  return <p className="time-slot-time">{timeSlot}</p>;
};

const ScheduleButtons = (props) => {
  const { handlePrevious, handleNext, currentStep } = props;

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
        disabled={currentStep === 1}
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
  } = props;
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const findServ = services?.find((item) => item.id === selectedServiceId);

  const handleNextStep = async () => {
    if (!selectedDate || !selectedTime) {
      message.open({
        type: "error",
        content: "Select date or time",
      });
      return;
    }
    if (currentStep === 4) {
      const formattedDate = selectedDate
        ? selectedDate.format("YYYY-MM-DD")
        : "";
      const formattedTime = selectedTime ? selectedTime.format("HH:mm:ss") : "";

      let values = {
        selectedService: selectedServiceId,
        selectedDateTime: `${formattedDate}:${formattedTime}`,
        mentorId: mentorId,
      };

      const response = await dispatch(bookSession(values)).unwrap();
      if (response.success) {
        closeScheduleModal();
        message.open({
          type: "success",
          content: "Booking save successfully!F",
        });
      }
    }

    setCurrentStep((st) => st + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((st) => st - 1);
  };

  const handleTitleChange = (step) => {
    switch (step) {
      case 1:
        return "Schedule Your Session";
      case 2:
        return "Review Your Order";
      case 3:
        return "Payment Details";
      default:
        return "Submit";
    }
  };

  const handleDescriptionChange = (step) => {
    switch (step) {
      case 1:
        return "Provide data with this form to create your schedule";
      case 2:
        return "Kindly review the details about your order";
      case 3:
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
            Icon={ScheduleDetailIcon}
            ActiveIcon={ActiveScheduleDetailIcon}
            title="Scheduling Details"
            description="Choose Date & Time"
            active={currentStep === 1}
          />

          <ModalStep
            Icon={ReadCVIcon}
            ActiveIcon={ActiveReadCVIcon}
            title="Review Your Order"
            description="Review Order Details"
            active={currentStep === 2}
          />

          <ModalStep
            Icon={BillingIcon}
            ActiveIcon={ActiveBillingIcon}
            title="BILLING"
            description="Payment Details"
            active={currentStep === 3}
          />

          <ModalStep
            Icon={CheckIcon}
            ActiveIcon={ActiveCheckIcon}
            title="SUBMIT"
            description="Submit & Continue"
            active={currentStep === 4}
          />
        </section>

        <section className="schedule-form-container">
          {currentStep === 1 && (
            <section className="schedule-step-container">
              <StepButtons />

              <section className="schedule-fields-container">
                <CommonInput
                  category="date"
                  placeholder="Select Date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e);
                  }}
                />
                <CommonInput
                  category="time"
                  placeholder="Select Time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e)}
                />
              </section>

              <section className="time-slots-container">
                <TimeSlot timeSlot="03:00 PM-04:00 PM" />
                <TimeSlot timeSlot="04:00 PM-05:00 PM" />
                <TimeSlot timeSlot="07:00 PM-08:00 PM" />
              </section>

              <ScheduleButtons
                currentStep={currentStep}
                handlePrevious={handlePreviousStep}
                handleNext={handleNextStep}
              />
            </section>
          )}

          {currentStep === 2 && (
            <section className="review-step-container">
              <StepButtons />

              <article className="review-content-container">
                <p className="review-label">Service</p>
                <p className="review-value">Resume Review</p>
              </article>

              <article className="review-content-container">
                <p className="review-label">Subtotal</p>
                <p className="review-value">${findServ?.pricing}</p>
              </article>

              <article className="review-content-container">
                <p className="review-label">Special Discount</p>
                <p className="review-value">$10</p>
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
                <h4 className="total-value">${findServ?.pricing - 10}</h4>
              </article>

              <ScheduleButtons
                currentStep={currentStep}
                handlePrevious={handlePreviousStep}
                handleNext={handleNextStep}
              />
            </section>
          )}

          {currentStep === 3 && (
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
                <label className="billing-field-label">Email</label>
                <CommonInput
                  placeholder="John.Doe@gmail.com"
                  classes="billing-input-field"
                />
              </article>

              <article className="billing-field-wrapper">
                <label className="billing-field-label">Card Number</label>
                <CommonInput
                  placeholder="2634 2345 6452 1245"
                  classes="billing-input-field"
                />
              </article>

              <section className="billing-fields-group-container">
                <article className="billing-field-wrapper">
                  <label className="billing-field-label">Name On Card</label>
                  <CommonInput
                    placeholder="John.Doe"
                    classes="billing-input-field"
                  />
                </article>

                <article className="billing-field-wrapper">
                  <label className="billing-field-label">Expiration Date</label>
                  <CommonInput
                    placeholder="MM/YY"
                    classes="billing-input-field"
                  />
                </article>

                <article className="billing-field-wrapper">
                  <label className="billing-field-label">CVV</label>
                  <CommonInput
                    placeholder="CVV"
                    classes="billing-input-field"
                  />
                </article>
              </section>

              <Checkbox>I have read all the agreement details.</Checkbox>

              <ScheduleButtons
                currentStep={currentStep}
                handlePrevious={handlePreviousStep}
                handleNext={handleNextStep}
              />
            </section>
          )}

          {currentStep === 4 && (
            <section className="submit-step-container">
              <figure className="submit-icon-container">
                <img
                  loading="lazy"
                  src="/images/submit-schedule.png"
                  className="submit-icon"
                  alt="Submit-Icon"
                />

                <figcaption className="submit-caption">
                  Thank You for Providing Details. Submit to Continue
                </figcaption>
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
