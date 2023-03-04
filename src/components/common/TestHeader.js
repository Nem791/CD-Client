import React from "react";
import QuizIcon from "@mui/icons-material/Quiz";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useSelector } from "react-redux";

const TestHeader = ({ testKind }) => {
  const { test } = useSelector((state) => state.test);

  const { results } = useSelector((state) => state.results);

  return (
    <div className="max-h-[63px] flex items-center justify-between py-[15px] px-[20px] fixed bg-white z-20 w-full border border-b-[0.0625rem] solid">
      <div className="flex items-center">
        <QuizIcon sx={{ fontSize: 30 }} className="text-[#8eb397]"></QuizIcon>
        <div className="ml-[12px] text-[18px] font-semibold text-[#335A44]">
          {testKind}
        </div>
      </div>
      <div className="text-center">
        <div className="text-[16px] font-bold text-[#335A44]">
          {test?.questions?.length || results?.userAnswers?.length} questions
        </div>
        <div className="text-[14px] font-semibold">
          {test?.set?.name ||
            `Test result of ${results?.user?.name.toUpperCase()}`}
        </div>
      </div>
      <div className="border-[1px] rounded-full p-[4px] hover:bg-[#f6f7fb] transition-all linear cursor-pointer">
        <CloseRoundedIcon></CloseRoundedIcon>
      </div>
    </div>
  );
};

export default TestHeader;
