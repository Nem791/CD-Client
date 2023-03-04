import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
const ResultHeader = () => {
  const { results } = useSelector((state) => state.results);

  return (
    <div className="p-[60px] bg-[#ffffff] flex items-center gap-x-[20px]">
      <div className="w-full">
        <h1 className="text-[32px] font-[700] leading-none">
          You can do it, keep trying!
        </h1>
        <div className="mt-[30px] text-[16px] font-semibold text-[#646f90]">
          {results?.score}/{results?.userAnswers?.length} Terms
        </div>
        <div className="mt-[20px] max-w-[800px]">
          <LinearProgress
            variant="determinate"
            value={(results?.score / results?.userAnswers?.length) * 100}
            className="p-[10px] rounded-lg"
          />

          <div className="flex mt-[40px] gap-[60px] text-[20px] font-semibold text-[#18ae79]">
            <p className="max-w-[63px] w-full">Correct</p>
            <p className="w-[50px] h-[26px] bg-[#e6fbf3] border-[1px] border-solid border-[#cbf7e6] flex items-center justify-center rounded-lg">
              {results?.score}
            </p>
          </div>
          <div className="flex mt-[15px] gap-[60px] text-[20px] font-semibold text-[#d05700]">
            <p className="max-w-[63px] w-full">Incorrect</p>
            <p className="w-[50px] h-[26px] bg-[#fef6ef] border-[1px] border-solid border-[#ffdcbe] flex items-center justify-center rounded-lg">
              {results?.userAnswers?.length - results?.score}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="border-[10px] flex items-center flex-col justify-center border-solid border-[#facc14] border-b-transparent w-[130px] h-[130px] rounded-full">
          <div className="font-bold text-[40px]">{results.duration}</div>
          <div className="mt-[10px]">minutes</div>
        </div>
        <div className="font-semibold text-[20px] text-center leading-none">
          Finish in
        </div>
      </div>
    </div>
  );
};

export default ResultHeader;
