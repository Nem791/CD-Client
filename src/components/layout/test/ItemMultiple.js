import React from "react";
import { useForm } from "react-hook-form";
import AnswerItem from "./AnswerItem";

const ItemMultiple = ({ question, id, index, control, errors }) => {
  return (
    <div
      className="bg-white p-[32px] max-w-[700px] w-full rounded-xl relative mt-[20px]"
      id={id}
    >
      <div>
        <p className="mt-[20px] text-[#939bb4] font-semibold text-[16px]">
          Select the correct definition
        </p>
        <p className="mt-[20px] text-[20px]">{question.question}</p>
      </div>
      <div className="absolute p-[10px] bg-yellow-400 font-semibold rounded-xl top-0 -translate-x-[50%] -translate-y-[25%]">
        Question {index + 1}
      </div>

      <div className="grid grid-cols-2 gap-[14px] mt-[20px]">
        {question.options.map((op, i) => (
          <div key={i}>
            <AnswerItem
              option={op}
              index={i}
              control={control}
              name={`question${index + 1}`}
              value={op}
            ></AnswerItem>
          </div>
        ))}
      </div>
      <p className="text-red-400 font-semibold mb-[10px] mt-[10px]">
        {errors[`question${index + 1}`]?.message}
      </p>
    </div>
  );
};

export default ItemMultiple;
