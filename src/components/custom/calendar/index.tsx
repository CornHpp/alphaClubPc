import React, { useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import type { Dayjs } from "dayjs";
import dayLocaleData from "dayjs/plugin/localeData";
import type { CalendarProps } from "antd";
import "./index.css";
import Image from "next/image";
import leftArrow from "@/assets/popup/leftArrow.svg";
import rightArrow from "@/assets/popup/rightArrow.svg";
import { Calendar } from "@/components/shadcn/ui/calendar";
import timeIcon from "@/assets/popup/time.svg";
import dateIcon from "@/assets/popup/date.svg";

import { Select } from "antd";
import { formatDate } from "@/lib/util/index";

dayjs.extend(dayLocaleData);

interface CalendarViewProps {
  setMergeedTime: (value: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const { setMergeedTime } = props;
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [timeList, setTimeList] = React.useState<any[]>([]);
  const [time, setTime] = React.useState(formatDate(new Date(), "yyyy/MM/dd"));

  const [cacheCurrentTime, setCacheCurrentTime] = React.useState<any>(
    new Date()
  );

  const [specificTime, setSpecificTime] = React.useState(timeList[0]?.value);

  useEffect(() => {
    const list = generateTimeArray();

    const lists = list.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    setTimeList(lists);
  }, []);

  const onChangeFunc = (days: Date, hours: string) => {
    const currentDay = formatDate(days, "yyyy-MM-dd");
    var currentHour = (hours || timeList[0]?.value) + ":00";
    const mergeTime = currentDay + " " + currentHour;
    setMergeedTime(mergeTime);
  };

  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full"
        onDayClick={(value) => {
          console.log(value);
          const val = formatDate(value, "yyyy/MM/dd");
          setTime(val);
          setCacheCurrentTime(value);
          onChangeFunc(value, specificTime);
        }}
      />

      <div className="mt-[32px] text-[14px] font-medium text-[#404140]">
        Event Time
      </div>

      <div className="mt-[4px] w-full flex items-center">
        <div className="flex items-center w-[163px] h-[50px] border-[2px] border-[#0D0D0D] border-solid rounded-[27px] justify-center">
          <Image
            src={dateIcon}
            alt=""
            width={16}
            height={15}
            className="mr-[4px]"
          ></Image>
          <span className="text-[16px] font-medium mt-[2px]">{time}</span>
        </div>
        <div className="ml-[8px] time">
          {timeList.length && (
            <Select
              defaultValue={timeList[0]?.value}
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              style={{ width: 105, height: 50, borderRadius: "27px" }}
              onChange={(val) => {
                setSpecificTime(val);
                onChangeFunc(cacheCurrentTime, val);
              }}
              options={timeList}
            />
          )}
        </div>
        {/* <div className="ml-[8px] time">
          <Select
            defaultValue="AM"
            style={{ width: 72, height: 50, borderRadius: "27px" }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            onChange={() => {}}
            options={[
              { value: "AM", label: "AM" },
              { value: "PM", label: "PM" },
            ]}
          />
        </div> */}
      </div>
    </div>
  );
};

export const generateTimeArray = () => {
  const result = [];
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  let current = new Date(now);

  // 将分钟调整为15的倍数
  const roundedMinutes = Math.ceil(current.getMinutes() / 15) * 15;
  current.setMinutes(roundedMinutes);

  while (current < tomorrow) {
    const hours = current.getHours().toString().padStart(2, "0");
    const minutes = current.getMinutes().toString().padStart(2, "0");
    result.push(`${hours}:${minutes}`);

    // 增加15分钟
    current.setMinutes(current.getMinutes() + 15);
  }

  return result;
};

export default CalendarView;
