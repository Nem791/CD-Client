import React, { useRef } from "react";
import { useSelector } from "react-redux";

const TestNumberQuestion = () => {
  const { test } = useSelector((state) => state.test);

  return (
    <div className="max-w-[20%] w-full bg-white p-[40px] h-max rounded-xl fixed">
      <p className="text-center font-bold text-[16px]">
        {test?.questions?.length} questions
      </p>
      <div className="mt-[18px] text-center">
        {test?.questions?.map((q, index) => (
          <a
            href={`#question${index}`}
            className="block py-[20px] bg-white hover:bg-[#ffcd1f] text-[14px] font-semibold rounded-xl cursor-pointer"
            key={q._id}
          >
            Question {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TestNumberQuestion;
