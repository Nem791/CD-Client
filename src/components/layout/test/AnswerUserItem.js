import React from "react";

import ChoiceUser from "./ChoiceUser";
import CheckIcon from "@mui/icons-material/Check";
import { useParams } from "react-router-dom";

const AnswerUserItem = ({ result }) => {
  const { type } = useParams();
  console.log(type);

  // console.log(result);
  return (
    <div className="bg-white p-[32px] max-w-[700px] w-full rounded-xl relative mt-[20px]">
      <div>
        <p className="mt-[20px] text-[#939bb4] font-semibold text-[16px]">
          Select the correct definition
        </p>
        <p className="mt-[20px] text-[20px]">{result?.questionText}</p>
      </div>
      <div className="absolute p-[10px] bg-yellow-400 font-semibold rounded-xl top-0 -translate-x-[50%] -translate-y-[25%]">
        Question {result?.question}
      </div>

      {type !== "essay" && (
        <div className="grid grid-cols-2 gap-[14px] mt-[20px]">
          {result?.options?.map((op, index) => (
            <ChoiceUser
              key={index}
              options={op}
              index={index}
              result={result}
            ></ChoiceUser>
          ))}
        </div>
      )}
      {type === "essay" && (
        <div>
          <div className="mt-[18px] text-[#ff983a] font-semibold">
            YOUR ANSWER
          </div>
          <div className="flex items-center gap-[10px] mt-[10px]">
            <div className="text-[16px]">{result?.userAnswer}</div>
          </div>
        </div>
      )}

      <div>
        <div className="mt-[18px] text-[#30b280] font-semibold">
          CORRECT ANSWER
        </div>
        <div className="flex items-center gap-[10px] mt-[10px]">
          <CheckIcon></CheckIcon>
          <div className="text-[16px]">{result?.correctAnswer}</div>
        </div>
      </div>
    </div>
  );
};

export default AnswerUserItem;
