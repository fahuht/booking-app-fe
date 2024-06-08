import { Button, Pagination, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aggregateOrders, getProduct } from "../../action/ProductAction";
import Loading from "../Loading/Loading";
import { BarChart } from "@mui/x-charts/BarChart";

const RevenueStatistics = (props) => {
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.productReducer.listProduct);
  const { dataStatistic, loading } = useSelector(
    (state) => state.productReducer
  );
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  console.log("dataStatistic", dataStatistic);

  useEffect(() => {
    dispatch(
      aggregateOrders({
        type: "day",
      })
    );
  }, []);

  return (
    <div className="">
      {contextHolder}
      <div>
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </div>
      <Loading isLoading={loading} />
    </div>
  );
};

export default RevenueStatistics;
