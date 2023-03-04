import React, { useEffect } from "react";
import { useController } from "react-hook-form";

const AnswerItem = ({ option, index, control, name, value }) => {
  const choice = ["A. ", "B. ", "C. ", "D. "];

  const { field } = useController({
    control,
    name: name,
  });

  const handleClick = (e) => {
    const choiceItem = document.querySelectorAll(`.${name}`);
    [...choiceItem].forEach((item) => {
      item.classList.remove("active-question");
    });
    console.log(option);
    if (e.target.value === option) {
      e.target.parentNode.classList.add("active-question");
    }
  };

  return (
    <label
      onClick={handleClick}
      htmlFor={`${name}${index}`}
      className={`${name} border-[4px] p-[20px] rounded-xl hover:border-[#939bb4] transition-all linear cursor-pointer flex`}
    >
      <input
        type="radio"
        {...field}
        value={value}
        id={`${name}${index}`}
        className={"hidden pointer-events-none"}
      ></input>
      <label
        htmlFor={`${name}${index}`}
        className="text-[16px] pointer-events-none"
      >
        {choice[index]}
        {option}
      </label>
    </label>
  );
};

export default AnswerItem;
