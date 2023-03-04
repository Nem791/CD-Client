import React from "react";
import dayjs from "dayjs";

import logo from "../../assets/img/home/logo.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { setMonthIndex } from "../../store/schedule/scheduleSlice";
import { Link } from "react-router-dom";
const CalendarHeader = () => {
  const dispatch = useDispatch();
  const { monthIndex } = useSelector((state) => state.schedule);

  const handelPrevMonth = () => {
    dispatch(setMonthIndex(monthIndex - 1));
  };

  const handleNextMonth = () => {
    dispatch(setMonthIndex(monthIndex + 1));
  };

  const handleReset = () => {
    dispatch(
      setMonthIndex(
        monthIndex === dayjs().month()
          ? monthIndex + Math.random()
          : dayjs().month()
      )
    );
  };
  return (
    <header className="px-4 py-2 flex items-center">
      <Link to="/home">
        <img src={logo} alt="calendar" className="h-[40px] mr-2 object-cover" />
      </Link>
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button onClick={handelPrevMonth}>
        <ChevronLeftIcon className="cursor-pointer text-gray-600 mx-2"></ChevronLeftIcon>
      </button>
      <button onClick={handleNextMonth}>
        <ChevronRightIcon className="cursor-pointer text-gray-600 mx-2"></ChevronRightIcon>
      </button>
      <h2 className="ml-4 text-xl font-semibold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default CalendarHeader;
