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
  const [xAxis, setXAxis] = useState([]);
  const [seriesCount, setSeriesCount] = useState([]);
  const [seriesTotalAmount, setSeriesTotalAmount] = useState([]);

  useEffect(() => {
    dispatch(
      aggregateOrders({
        type: "day",
      })
    );
  }, []);

  const valueCountFormatter = (value) => `${value} Đơn`;
  const valueTotalAmountFormatter = (value) => `${value} VNĐ`;

  useEffect(() => {
    if (dataStatistic && dataStatistic.data) {
      // Set tên cho cột
      const newXAxis = dataStatistic.data.map((item) => {
        return `${item?._id?.day}/${item?._id?.month}/${item?._id?.year}`;
      });
      setXAxis(newXAxis);

      //  Lấy data cho tổng đơn hàng
      const listCount = dataStatistic.data.map((item) => item?.count || 0);
      const newSeriesCount = [
        {
          data: listCount,
          label: "Tổng đơn hàng",
          valueFormatter: valueCountFormatter,
        },
      ];
      setSeriesCount(newSeriesCount);

      //  Lấy data cho tổng tiền
      const listTotalAmount = dataStatistic.data.map(
        (item) => item?.totalAmount || 0
      );
      const newSeriesTotalAmount = [
        {
          data: listTotalAmount,
          label: "Tổng doanh thu",
          valueFormatter: valueTotalAmountFormatter,
        },
      ];
      setSeriesTotalAmount(newSeriesTotalAmount);
    }
  }, [dataStatistic]);

  return (
    <div className="statistic-page">
      {contextHolder}
      <div>
        <BarChart
          series={seriesCount}
          height={350}
          xAxis={[
            {
              data: xAxis,
              scaleType: "band",
              categoryGapRatio: 0.5,
              colorMap: {
                type: "ordinal",
                colors: ["#ff7777"],
              },
            },
          ]}
        />
        <BarChart
          series={seriesTotalAmount}
          height={290}
          xAxis={[
            {
              data: xAxis,
              scaleType: "band",
              categoryGapRatio: 0.5,
              colorMap: {
                type: "ordinal",
                colors: ["#4a5bf7"],
              },
            },
          ]}
        />
      </div>
      <Loading isLoading={loading} />
    </div>
  );
};

export default RevenueStatistics;
