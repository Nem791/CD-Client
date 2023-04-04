import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./schedule.scss";
const Schedule = () => {
  const { userId } = useParams();
  const [userSteak, setUserSteak] = useState();
  const [calendarValue, setCalendarValue] = useState(new Date());

  const getSteak = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/v1/schedule/user-streak/${userId}`
    );
    setUserSteak(res.data.data.data);
    console.log(res);
  };

  useEffect(() => {
    getSteak();
  }, []);

  return (
    <div className="schedule-container">
      {/* 7daysteak */}
      <div>
        <div className="flex">
          <div>
            <div>You are a rock You are on</div>
            <div>{userSteak?.streaks?.length} day steak</div>
          </div>
          <div>fire....!</div>
        </div>
        <div>7days</div>
      </div>
      {/* calender steak */}
      <div>
        <Calendar
          // onChange={setCalendarValue}
          value={calendarValue}
          tileContent={(tileArg) => {
            const isSeek = userSteak?.streaks.some((steakString) => {
              console.log(new Date(steakString).toISOString(), 123132);
              console.log(tileArg.date.toISOString(), 3333);
              return (
                new Date(steakString).toISOString() ===
                tileArg.date.toISOString()
              );
            });
            if (isSeek) {
              return <div>Done!</div>;
            }
            return <div></div>;
          }}
          tileClassName={(tileArg) => {
            const isSeek = userSteak?.streaks.some((steakString) => {
              console.log(new Date(steakString).toISOString(), 123132);
              console.log(tileArg.date.toISOString(), 3333);
              return (
                new Date(steakString).toISOString() ===
                tileArg.date.toISOString()
              );
            });
            if (isSeek) {
              return "seekinggggggg";
            }
            return "";
          }}
        />
      </div>
    </div>
  );
};

export default Schedule;
