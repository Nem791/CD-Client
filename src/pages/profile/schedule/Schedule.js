import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./schedule.scss";
import { FireIcon } from "@heroicons/react/24/solid";

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
      <div className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
        Streak days
      </div>
      <div className=" text-gray-300 font-mono text-sm py-5">
        Streak Learning is sequential learning, which means that learners are
        required to go through the sessions in a designated sequence (order)
      </div>
      <div className="p-5">
        <div className="flex justify-center">
          <div>
            <div className="text-lg font-mono italic">
              You are a rock You are on
            </div>
            <div>
              <span className="text-lg ">{userSteak?.streaks?.length}</span> day
              steak
            </div>
          </div>
          <div>
            <FireIcon
              className="text-red-500"
              width={80}
              height={80}
            ></FireIcon>
          </div>
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
