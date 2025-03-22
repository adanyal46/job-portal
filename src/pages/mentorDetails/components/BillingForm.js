import { useState } from "react";
import { Input, Checkbox, Form, message } from "antd";

const BillingForm = ({ currentStep, handlePreviousStep, handleNextStep }) => {
  const [form] = Form.useForm();

  // State for input values
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [agreement, setAgreement] = useState(false);

  // Validation handlers
  const handleCardNumberChange = (e) => {
    // Only allow numbers and spaces
    const value = e.target.value.replace(/[^\d\s]/g, "");
    // Format the card number with spaces after every 4 digits
    const formatted = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formatted.substring(0, 19)); // Limit to 16 digits + 3 spaces
  };

  const handleNameChange = (e) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setNameOnCard(value);
  };

  const handleExpiryDateChange = (e) => {
    // Only allow numbers and /
    let value = e.target.value.replace(/[^\d/]/g, "");

    // Auto-format to MM/YY
    if (value.length === 2 && !value.includes("/") && expiryDate.length === 1) {
      value = value + "/";
    }

    setExpiryDate(value.substring(0, 5)); // Limit to MM/YY format (5 chars)
  };

  const handleCvvChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value.substring(0, 3)); // Limit to 3 digits
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        if (!agreement) {
          message.error("Please agree to the terms and conditions");
          return;
        }
        handleNextStep();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    currentStep === 2 && (
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="billing-step-container"
      >
        <figure className="credit-card-picture-container">
          <img
            loading="lazy"
            src="/images/credit-card-icon.png"
            className="credit-card-picture"
            alt="credit-card-icon"
          />
        </figure>

        <Form.Item
          label="Card Number"
          name="cardNumber"
          className="billing-field-wrapper"
          rules={[
            { required: true, message: "Please enter your card number" },
            {
              pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
              message: "Please enter a valid card number",
            },
          ]}
        >
          <Input
            placeholder="2634 2345 6452 1245"
            className="billing-input-field"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
          />
        </Form.Item>

        <section className="billing-fields-group-container">
          <Form.Item
            label="Name On Card"
            name="nameOnCard"
            className="billing-field-wrapper"
            rules={[
              { required: true, message: "Please enter the name on card" },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: "Please enter a valid name",
              },
            ]}
          >
            <Input
              placeholder="John Doe"
              className="billing-input-field"
              value={nameOnCard}
              onChange={handleNameChange}
            />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expiryDate"
            className="billing-field-wrapper"
            rules={[
              { required: true, message: "Please enter the expiration date" },
              {
                pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "Please use MM/YY format",
              },
            ]}
          >
            <Input
              placeholder="MM/YY"
              className="billing-input-field"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              maxLength={5}
            />
          </Form.Item>

          <Form.Item
            label="CVV"
            name="cvv"
            className="billing-field-wrapper"
            rules={[
              { required: true, message: "Please enter the CVV" },
              { pattern: /^\d{3}$/, message: "CVV must be 3 digits" },
            ]}
          >
            <Input
              placeholder="CVV"
              className="billing-input-field"
              value={cvv}
              onChange={handleCvvChange}
              maxLength={3}
            />
          </Form.Item>
        </section>

        <Form.Item>
          <Checkbox
            checked={agreement}
            onChange={(e) => setAgreement(e.target.checked)}
          >
            I have read all the agreement details.
          </Checkbox>
        </Form.Item>

        <div className="buttons-container">
          <button
            type="button"
            onClick={handlePreviousStep}
            className="previous-button"
          >
            Previous
          </button>
          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </Form>
    )
  );
};

export default BillingForm;
