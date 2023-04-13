import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { joinSchedule } from "../../realtimeCommunication/socketConnection";

import { getSchedule, setMonthIndex } from "../../store/schedule/scheduleSlice";

import { getMonth } from "../../shared/utils/date";
import CalendarHeader from "./CalendarHeader";
import EventModal from "./EventModal";
import Month from "./Month";
import SideBar from "./SideBar";
const SchedulePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { monthIndex, smallCalendarMonth, showEventModal } = useSelector(
    (state) => state.schedule
  );

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  // useEffect(() => {
  //   connectWithSocketServer(user, dispatch);
  // }, [user, dispatch]);

  useEffect(() => {
    joinSchedule(userId);
  }, [userId]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      dispatch(setMonthIndex(smallCalendarMonth));
    }
  }, [dispatch, smallCalendarMonth]);

  useEffect(() => {
    dispatch(getSchedule(userId));
  }, [dispatch, userId]);
  return (
    <>
      {showEventModal && <EventModal></EventModal>}
      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <SideBar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
