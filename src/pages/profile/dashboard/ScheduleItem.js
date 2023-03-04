import React from "react";
import dayjs from "dayjs";

const ScheduleItem = ({ schedule, index }) => {
  console.log(schedule);
  return (
    <div className="w-full h-[80px] rounded-xl p-[20px] bg-[#eff5f2] flex items-center gap-[40px]">
      <div className="w-[40px] h-[40px] flex items-center justify-center bg-white text-[#81aa96] text-[16px] font-bold rounded-lg">
        {index + 1}
      </div>

      <p className="font-semibold">{dayjs(schedule?.day).format("DD-MM-YY")}</p>
      <div>
        <p className="font-semibold">{schedule?.title}</p>
        <p className="text-[14px] ">{schedule?.description}</p>
      </div>
    </div>
  );
};

export default ScheduleItem;
