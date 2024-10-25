// src/components/Earnings.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Typography } from "antd";
import CustomTabs from "../../components/customTabs";
import CustomButton from "../../components/customButton";
import CommonInput from "../../components/commonInput";
import CommonTable from "../../components/commonTable";
import {
  DownloadIcon,
  EarningNotFound,
  SearchFieldIcon,
} from "../../assets/svg";
import "./styles.scss";
import { fetchEarningList } from "../../features/earning/earningSlice";

const LifeTimeEarnings = ({ monthly, weekly, custom }) => {
  const dispatch = useDispatch();
  const { earningList, loading, error, dateRange } = useSelector(
    (state) => state.earning
  );
  const [fromDate, setFromDate] = useState(dateRange.from);
  const [toDate, setToDate] = useState(dateRange.to);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchEarningList({ startDate: fromDate, endDate: toDate }));
  }, [dispatch, fromDate, toDate]);

  const filteredEarningList = earningList.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.jobseekerName.toLowerCase().includes(searchLower) ||
      item.servicename.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.earningPrice.toString().includes(searchLower)
    );
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Name",
      dataIndex: "jobseekerName",
      key: "jobseekerName",
    },
    {
      title: "Service",
      dataIndex: "servicename",
      key: "servicename",
    },
    {
      title: "Earning",
      dataIndex: "earningPrice",
      key: "earningPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <section className="earnings-main-layout-container">
      {earningList.length === 0 && fromDate === "" && toDate === "" ? (
        <Flex
          justify={"center"}
          align={"center"}
          style={{ minHeight: "calc(100vh - 330px)" }}
          vertical
        >
          <EarningNotFound />
          <CustomButton
            name="Refresh"
            category="primary"
            style={{ marginTop: "10px" }}
            handleClick={async () => {
              window.location.reload();
            }}
          />
        </Flex>
      ) : (
        <>
          <section className="download-buttons-wrapper">
            <CustomButton
              classes="download-button"
              name={
                <article className="button-title">
                  <DownloadIcon />
                  <p className="title">Download CVS</p>
                </article>
              }
            />
            <CustomButton
              classes="download-button"
              name={
                <article className="button-title">
                  <DownloadIcon />
                  <p className="title">Download PDF</p>
                </article>
              }
            />
          </section>

          <hr className="form-divider" />

          <section className="earning-detail-container">
            <h4 className="grand-total">
              $
              {earningList
                .reduce((total, item) => {
                  const earning = parseFloat(item.earningPrice);
                  return total + (isNaN(earning) ? 0 : earning);
                }, 0)
                .toFixed(2)}
            </h4>
            <p className="earning-detail">
              Your earnings after FuseWW platform commission
            </p>

            <p className="earning-detail">
              Total Billed{" "}
              <span className="amount">
                $
                {earningList.reduce((total, item) => {
                  const earning = parseFloat(item.earningPrice) || 0; // Handle "N/A" cases
                  return total + earning;
                }, 0) - (10).toFixed(2)}
              </span>
            </p>

            <p className="earning-detail">
              Fuse Commission <span className="amount">$10</span>
            </p>
          </section>

          <hr className="form-divider" />

          <section className="earnings-search-fields-wrapper">
            <CommonInput
              classes="earnings-search-field"
              placeholder="Search ID"
              prefix={<SearchFieldIcon />}
              onChange={(val) => setSearchQuery(val)}
            />

            {monthly && (
              <CommonInput
                category="month"
                classes="earnings-select-field"
                placeholder="Select Month"
                prefix={<SearchFieldIcon />}
                onChange={(startDate, endDate) => {
                  setFromDate(startDate);
                  setToDate(endDate);
                }}
              />
            )}

            {weekly && (
              <CommonInput
                category="week"
                classes="earnings-select-field"
                onChange={(startDate, endDate) => {
                  setFromDate(startDate);
                  setToDate(endDate);
                }}
                placeholder="This Week"
                prefix={<SearchFieldIcon />}
              />
            )}

            {custom && (
              <>
                <CommonInput
                  category="customDateRange"
                  classes="earnings-select-field"
                  placeholder="Select From"
                  prefix={<SearchFieldIcon />}
                  onChange={(dateStrings) => {
                    setFromDate(dateStrings[0]);
                    setToDate(dateStrings[1]);
                  }}
                />
              </>
            )}
          </section>

          <hr className="form-divider" />

          <section className="earnings-table-wrapper">
            <CommonTable
              columns={columns}
              data={filteredEarningList}
              loading={loading}
            />
          </section>
        </>
      )}
    </section>
  );
};

const Earnings = () => {
  const handleTabChange = (key) => {};

  return (
    <section>
      <Typography.Title level={3}>Earnings</Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="lifetimeEarnings"
        items={[
          {
            key: "lifetimeEarnings",
            label: "Lifetime Earnings",
            children: <LifeTimeEarnings />,
          },
          {
            key: "monthlyEarnings",
            label: "Monthly Earnings",
            children: <LifeTimeEarnings monthly />,
          },
          {
            key: "weeklyEarnings",
            label: "Weekly Earnings",
            children: <LifeTimeEarnings weekly />,
          },
          {
            key: "customRange",
            label: "Custom Range",
            children: <LifeTimeEarnings custom />,
          },
        ]}
      />
    </section>
  );
};

export default Earnings;
