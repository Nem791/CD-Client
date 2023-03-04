import React, { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../../utils/date";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import {
  setDaySelected,
  setSmallCalendarMonth,
} from "../../store/schedule/scheduleSlice";
const SmallCalendar = () => {
  const dispatch = useDispatch();
  const [currentMonthIndex, setCurrontMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, daySelected } = useSelector((state) => state.schedule);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  const handelPrevMonth = () => {
    dispatch(setCurrontMonthIndex(currentMonthIndex - 1));
  };

  const handleNextMonth = () => {
    dispatch(setCurrontMonthIndex(currentMonthIndex + 1));
  };

  useEffect(() => {
    setCurrontMonthIndex(monthIndex);
  }, [monthIndex]);

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);

    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  };
  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </p>
        <div>
          <button onClick={handelPrevMonth}>
            <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2"></ChevronLeftIcon>
          </button>
          <button onClick={handleNextMonth}>
            <ChevronRightIcon className="cursor-pointer text-gray-600 mx-2"></ChevronRightIcon>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}

        {currentMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(setSmallCalendarMonth(currentMonthIndex));
                  dispatch(setDaySelected(day));
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
