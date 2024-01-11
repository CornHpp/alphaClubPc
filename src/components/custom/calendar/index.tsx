import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import type { CalendarProps } from "antd";
import "./index.css";
import Image from "next/image";
import leftArrow from "@/assets/popup/leftArrow.svg";
import rightArrow from "@/assets/popup/rightArrow.svg";

dayjs.extend(dayLocaleData);

const App: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return <div className="w-[full] h-[503px]"></div>;
};

export default App;
