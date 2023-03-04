import React from "react";

const ChoiceUser = ({ options, index, result }) => {
  const choice = ["A. ", "B. ", "C. ", "D. "];

  const isCorrect = options === result.correctAnswer;
  const isFail =
    options !== result.correctAnswer && options === result.userAnswer;

  return (
    <label
      className={`border-[4px] p-[20px] rounded-xl transition-all linear cursor-pointer flex ${
        isCorrect ? "border-[#27b16e] bg-[#f2fbf5]" : ""
      } ${isFail ? "border-[#d05a0e] bg-[#fef6ef]" : ""}`}
    >
      <input type="radio" className={"hidden pointer-events-none"}></input>
      <label className="text-[16px] pointer-events-none">
        {choice[index]}
        {options}
      </label>
    </label>
  );
};

export default ChoiceUser;
