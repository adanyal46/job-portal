import { useEffect, useState } from "react";
import { Form, message, Typography } from "antd";
import CustomTabs from "../../components/customTabs";
import { useSelector } from "react-redux";
import ManageAccount from "./ManageAccount";
import AccountAdmin from "./AccountAdmin";
import ManageCard from "./ManageCard";
import axiosInstance from "../../api/axiosInstance";

const saveCardApi = async (values) => {
  try {
    const response = await axiosInstance.post("/employer/cards", values);
    console.log(response);
    if (response.data && response.status === 201) {
      message.open({
        type: "success",
        content: response.data.message || "Card Created!",
      });
      return;
    }
  } catch (error) {
    message.open({
      type: "error",
      content: error?.message || "Internal Server Error",
    });
  }
};

const getCards = async () => {
  try {
    const response = await axiosInstance.get("/employer/cards");
    return response.data;
  } catch (error) {
    message.open({
      type: "error",
      content: error?.message || "Internal Server Error",
    });
  }
};

const EmployerSetting = () => {
  let [manageAcountForm] = Form.useForm();
  const { user } = useSelector((state) => state.profile);
  const [isAdd, setIsAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (user) {
      fetchCard();
      manageAcountForm.setFieldsValue({
        email: user?.email,
        secondaryEmail: user?.secondaryEmail,
      });
    }
  }, [user]);

  const fetchCard = async () => {
    const result = await getCards();
    setCards(result.data || []);
  };

  const handleSubmitManageAccount = () => {
    const value = manageAcountForm.getFieldsValue();
  };
  const handleSaveCard = async (values) => {
    setLoading(true);
    const cleanedValues = {
      ...values,
      cardNumber: values.cardNumber.replace(/\s/g, ""),
    };
    await saveCardApi(cleanedValues);
    handleAddNewCardClick();
    fetchCard();
    setLoading(false);
  };

  const handleAddNewCardClick = () => {
    setIsAdd(!isAdd);
  };

  return (
    <div style={{ maxWidth: "969px", margin: "0 auto", width: "100%" }}>
      <Typography.Title
        level={3}
        style={{ fontWeight: "400", color: "#333333" }}
      >
        Settings
      </Typography.Title>
      <CustomTabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Manage Account",
            children: <ManageAccount manageAcountForm={manageAcountForm} />,
          },
          {
            key: "2",
            label: "Account Admin",
            children: <AccountAdmin />,
          },
          {
            key: "3",
            label: "Payment Details",
            children: (
              <ManageCard
                handleAddNewCardClick={handleAddNewCardClick}
                handleSaveCard={handleSaveCard}
                isAdd={isAdd}
                loading={loading}
                cards={cards}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default EmployerSetting;
