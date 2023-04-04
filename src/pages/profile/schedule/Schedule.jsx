import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./schedule.scss";
import { FireIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const Schedule = () => {
  const { userId } = useParams();
  const [userSteak, setUserSteak] = useState();
  const [calendarValue, setCalendarValue] = useState(new Date());
  const arrayDaysSteak = new Array(7).fill("test");

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
      <div className="mt-0 mb-2 text-3xl font-bold leading-tight text-primary text-center py-4">
        Streak days
      </div>
      <div className=" text-gray-500 font-mono text-sm p-5">
        Streak Learning is sequential learning, which means that learners are
        required to go through the sessions in a designated sequence (order)
      </div>
      <div className="p-5 shadow-lg my-4 rounded-md">
        <div className="flex justify-center py-2 ">
          <div>
            <div className="text-2xl font-mono font-bold italic text-red-300">
              You are a rock You are on
            </div>
            <div className="text-sm text-gray-300 text-center">
              <span className="text-3xl px-2 text-yellow-700">
                {userSteak?.streaks?.length}
              </span>{" "}
              day steak
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
        <div className="flex justify-center">
          {arrayDaysSteak.map((_, index) => {
            console.log({ index, _ });
            return (
              <div className="flex items-center">
                <CheckCircleIcon
                  width={50}
                  height={50}
                  className={clsx(
                    index <= userSteak?.streaks.length - 1
                      ? "text-green-500"
                      : "text-gray-500"
                  )}
                ></CheckCircleIcon>
                {index < arrayDaysSteak.length - 1 && (
                  <div className="border border-black w-3" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* calender steak */}
      <div>
        <div className="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
          Calendar
        </div>
        <div className="flex justify-center">
          <Calendar
            // onChange={setCalendarValue}
            value={calendarValue}
            tileContent={(tileArg) => {
              const isSeek = userSteak?.streaks.some((steakString) => {
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
    </div>
  );
};

export default Schedule;
