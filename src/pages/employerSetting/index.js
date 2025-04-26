import { useEffect, useState } from "react";
import { Form, message, Typography } from "antd";
import CustomTabs from "../../components/customTabs";
import { useDispatch, useSelector } from "react-redux";
import ManageAccount from "./ManageAccount";
import AccountAdmin from "./AccountAdmin";
import ManageCard from "./ManageCard";
import axiosInstance from "../../api/axiosInstance";
import { logout } from "../../features/auth/authSlice";

const saveCardApi = async (values) => {
  try {
    const response = await axiosInstance.post("/employer/cards", values);
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
  const dispatch = useDispatch();
  let [manageAcountForm] = Form.useForm();
  let [manageAdminForm] = Form.useForm();
  const { user } = useSelector((state) => state.profile);
  const [isAdd, setIsAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCard();
      manageAcountForm.setFieldsValue({
        email: user?.email,
        secondaryEmail: user?.secondaryEmail,
      });
      setActiveCardId(user?.activeCardId ?? "");
    }
  }, [user]);

  const fetchCard = async () => {
    const result = await getCards();
    setCards(result.data || []);
  };

  const changePasswordApi = async (id, values) => {
    try {
      setManageLoading(true);
      const res = await axiosInstance.put(
        "/employer/changepassword/" + id,
        values
      );
      console.log(res);

      if (res.data && res.data.success) {
        message.open({
          type: "success",
          content: res.data.message || "Updated Password",
        });
        manageAcountForm.resetFields([
          "currentPassword",
          "newPassword",
          "confirmPassword",
        ]);
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setManageLoading(false);
    }
  };
  const updateSecondaryEmailApi = async (id, values) => {
    try {
      setManageLoading(true);
      const res = await axiosInstance.put(
        "/employer/secondaryemail/" + id,
        values
      );
      if (res && res.success) {
        message.open({
          type: "success",
          content: res.data.message || "Updated!",
        });
        return;
      }
    } catch (error) {
      console.log(error);

      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setManageLoading(false);
    }
  };

  const handleSubmitManageAccount = () => {
    const value = manageAcountForm.getFieldsValue();
    if (
      value["currentPassword"] &&
      value["confirmPassword"] &&
      value["newPassword"]
    ) {
      if (value["confirmPassword"] === value["newPassword"]) {
        changePasswordApi(user?.id, {
          currentPassword: value["currentPassword"],
          newPassword: value["newPassword"],
        });
      } else {
        message.open({
          type: "error",
          content: "Password do not match",
        });
      }
    } else if (
      value["secondaryEmail"] !== null &&
      value["secondaryEmail"] !== user.secondaryEmail
    ) {
      updateSecondaryEmailApi(user?.id, {
        secondaryEmail: value["secondaryEmail"],
      });
    } else {
      console.log("not any changes");
    }
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
  const handleActiveCard = async () => {
    const values = {
      userId: user?.id,
      activeCardId,
    };
    try {
      setLoading(false);
      const response = await axiosInstance.post("/employer/activecard", values);
      if (response && response.data.success) {
        message.open({
          type: "success",
          content: response.data.message || "Updated!",
        });
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };
  const deactivateAccount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put("/setting/js/deactivate");
      if (response.data.success) {
        if (response.data.data) {
          message.open({
            type: "success",
            content: "Account deactivate successfully!",
          });
          setTimeout(async () => {
            await dispatch(logout());
            window.location.replace("/login");
          }, 500);
          return;
        }

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.delete("/setting/js/delete");
      if (response.data.success) {
        message.open({
          type: "success",
          content: "Account delete successfully!",
        });

        setTimeout(async () => {
          await dispatch(logout());
          window.location.replace("/login");
        }, 500);
        return;
      }
    } catch (error) {
      message.open({
        type: "error",
        content: error.error || error.message || "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
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
            children: (
              <ManageAccount
                manageAcountForm={manageAcountForm}
                handleSubmitManageAccount={handleSubmitManageAccount}
                manageLoading={manageLoading}
                deactivateAccount={deactivateAccount}
                deleteAccount={deleteAccount}
                loading={loading}
              />
            ),
          },
          {
            key: "2",
            label: "Account Admin",
            children: (
              <AccountAdmin
                user={user}
                manageAdminForm={manageAdminForm}
                handleSubmitManageAccount={handleSubmitManageAccount}
                manageLoading={manageLoading}
              />
            ),
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
                handleActiveCard={handleActiveCard}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default EmployerSetting;
