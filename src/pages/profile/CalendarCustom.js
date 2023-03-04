import React, { useState } from "react";

// import Calender from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const CalendarCustom = () => {
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
};

export default CalendarCustom;
