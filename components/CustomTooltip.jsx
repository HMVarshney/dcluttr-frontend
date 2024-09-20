import { numberTrim } from "@/lib/utils";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const colors = ["#2EB76F", "#9A66ED"];
const labelFormatter = (dateRange) => {
  return (
    <span className="mr-1 ">
      {dateRange?.value !== "custom"
        ? `${moment(dateRange?.from).format("D MMM")} - ${moment(dateRange?.to).format("D MMM")}`
        : `${dateRange?.label}`}
      :
    </span>
  );
};

const CustomTooltip = ({ active, payload, label, coordinate }) => {
  const { isCompareOn, endDateRange, dateRange } = useSelector((state) => state.user);

  if (active && payload && payload.length) {
    return (
      <div
        className="text-xs whitespace-nowrap transition text-black bg-white p-3 rounded-lg flex flex-col justify-between absolute border"
        style={{
          top: coordinate.y - 40,
          left: coordinate.x > 200 ? coordinate.x - 50 : coordinate.x + 30,
          transform: "translate(-50%, -100%)"
        }}
      >
        {/* <p>{payload[0].value.toLocaleString()}</p>${ele.name} */}
        {/* <p>{`Value in ${label} ${payload[0].value.toLocaleString()}`}</p> */}
        {payload.map((ele, i) => (
          <div key={ele.color} className="capitalize flex items-center">
            <div
              className="w-4 -rotate-45 mr-1 border-t"
              style={{ borderColor: colors[i], borderStyle: i === 0 ? "solid" : "dashed" }}
            />
            {labelFormatter(i === 0 ? dateRange : endDateRange)}
            {numberTrim(ele.value)}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
