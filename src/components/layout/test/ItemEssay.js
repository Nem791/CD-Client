import React from "react";
import { useController } from "react-hook-form";

const ItemEssay = ({ question, id, index, control, errors }) => {
  const { field } = useController({
    control,
    name: `question${index + 1}`,
    defaultValue: "",
  });
  return (
    <div
      className="bg-white p-[32px] max-w-[700px] w-full rounded-xl relative mt-[20px]"
      id={id}
    >
      <div>
        <p className="mt-[20px] text-[#939bb4] font-semibold text-[16px]">
          Type the answer in Vietnamese
        </p>
        <p className="mt-[20px] text-[20px]">{question.question}</p>
      </div>
      <div className="absolute p-[10px] bg-yellow-400 font-semibold rounded-xl top-0 -translate-x-[50%] -translate-y-[25%]">
        Question {index + 1}
      </div>
      <input
        type="text"
        className="mt-[20px] bg-[#f6f7fb] w-full p-[16px] rounded-xl hover:border-b-[2px] hover:border-b-[#596481]"
        placeholder="Your answer"
        {...field}
      />
      <p className="text-red-400 font-semibold mb-[10px] mt-[10px]">
        {errors[`question${index + 1}`]?.message}
      </p>
    </div>
  );
};

export default ItemEssay;
