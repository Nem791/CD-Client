import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import handIcon from "../../../assets/img/profile/hand.png";
import { getSchedule } from "../../../store/schedule/scheduleSlice";
import BarChart from "../BarChart";
import CalendarCustom from "../CalendarCustom";
import ScheduleItem from "./ScheduleItem";
import StaticInfoItem from "./StaticInfoItem";
import useAuthStateChanged from "../../../hooks/useAuthStateChanged";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import QuizIcon from "@mui/icons-material/Quiz";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

const Dashboard = () => {
  const { userId } = useParams();
  const { user } = useAuthStateChanged();

  const dispatch = useDispatch();

  const { savedEvent } = useSelector((state) => state.schedule);

  const scheduleToday = savedEvent?.filter(
    (el) =>
      dayjs(el.day).format("DD-MM-YY") === dayjs(Date.now()).format("DD-MM-YY")
  );

  useEffect(() => {
    dispatch(getSchedule(userId));
  }, [dispatch, userId]);
  return (
    <div>
      <div>
        <div className="flex items-center">
          <p className="font-semibold text-[24px]">Hello {user?.name}</p>
          <img
            src={handIcon}
            alt="hand-icon"
            className="ml-[14px] w-[32px] h-[32px]"
          />
        </div>
        <div className="text-[#b6b9c1] text-[16px] mt-[5px]">
          Let's learn something new today!
        </div>
      </div>
      <div className="mt-[40px] grid grid-cols-3 gap-[15px]">
        <StaticInfoItem
          labels="Number of Study Set"
          subLabel="Sets"
          colorIcons="text-[#9eb8ac]"
          bgIcons="bg-[#eff5f2]"
        >
          <AutoStoriesIcon></AutoStoriesIcon>
        </StaticInfoItem>
        <StaticInfoItem
          labels="Number of Test"
          subLabel="Tests"
          colorIcons="text-[#ffcc43]"
          bgIcons="bg-[#fff7e3]"
        >
          <QuizIcon></QuizIcon>
        </StaticInfoItem>
        <StaticInfoItem
          labels="Average Score"
          subLabel=""
          colorIcons="text-[#df8d7f]"
          bgIcons="bg-[#fef2ef]"
        >
          <ScoreboardIcon></ScoreboardIcon>
        </StaticInfoItem>
      </div>
      <div className="mt-[24px] flex w-full">
        {/* max-w-[55%] */}
        <div className="w-full ">
          <p className="mb-[20px] font-bold text-[18px]">Average Score</p>
          <div className="border-[1px] solid border-[#e0e3e9] rounded-xl p-[20px]">
            <BarChart></BarChart>
          </div>
        </div>
        {/* <div>
          <CalendarCustom></CalendarCustom>
        </div> */}
      </div>

      <div className="mt-[24px]">
        <p className="mb-[20px] font-bold text-[18px]">Your Schedule</p>
        <div className="w-full h-[300px] border-[1px] solid border-[#e0e3e9] rounded-lg p-[20px] overflow-y-auto">
          <p className="mb-[20px] font-bold text-[18px]">Today</p>
          <div className="mt-[20px] flex flex-col gap-[20px] ">
            {scheduleToday?.map((schedule, index) => (
              <ScheduleItem schedule={schedule} index={index}></ScheduleItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
