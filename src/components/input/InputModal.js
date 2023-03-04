import React from "react";
import { useController } from "react-hook-form";

const InputModal = ({ id, placeHolder, text, control, className }) => {
  const { field } = useController({
    control,
    name: id,
    defaultValue: "",
  });
  return (
    <div className={className}>
      <input
        id={id}
        type="text"
        placeholder={placeHolder}
        className="outline-none bg-transparent border-none w-full mb-[10px] text-[18px]"
        {...field}
      ></input>
      <span className="block h-[2px] bg-black w-full"></span>
      <span className="mt-[10px] text-[14px] font-semibold text-[#939bb4] uppercase">
        {text}
      </span>
    </div>
  );
};

export default InputModal;
