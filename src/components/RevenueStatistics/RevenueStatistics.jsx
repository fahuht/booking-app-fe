import { Button, Pagination, Radio, Table, notification } from "antd";
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
        return `${(item?._id?.day && `${item?._id?.day}/`) || ""}${
          (item?._id?.month && `${item?._id?.month}/`) || ""
        }${item?._id?.year}`;
      });
      setXAxis(newXAxis);

      //  Lấy data cho tổng đơn hàng
      const listCount = dataStatistic.data.map((item) => item?.count || 0);
      const newSeriesCount = [
        {
          data: listCount,
          label: "Tổng đơn hàng",
          valueFormatter: valueCountFormatter,
          color: "#ff7777",
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
          color: "#4a5bf7",
        },
      ];
      setSeriesTotalAmount(newSeriesTotalAmount);
    }
  }, [dataStatistic]);

  const onChangeType = (e) => {
    dispatch(
      aggregateOrders({
        type: e.target.value,
      })
    );
  }

  return (
    <div className="statistic-page">
      {contextHolder}
      <div>
        <div className="my-5 px-5 d-flex justify-content-end gap-3 align-items-center"> 
          <b>Thống kê theo: </b>
          <Radio.Group onChange={onChangeType} defaultValue="day" buttonStyle="solid">
            <Radio.Button value="day">Ngày</Radio.Button>
            <Radio.Button value="month">Tháng</Radio.Button>
            <Radio.Button value="year">Năm</Radio.Button>
          </Radio.Group>
        </div>
        <BarChart
          series={seriesCount}
          height={350}
          xAxis={[
            {
              data: xAxis,
              scaleType: "band",
              categoryGapRatio: 0.5,
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
            },
          ]}
        />
      </div>
      {/* <Loading isLoading={loading} /> */}
    </div>
  );
};

export default RevenueStatistics;
