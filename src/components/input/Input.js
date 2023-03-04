import React from "react";
import { useController } from "react-hook-form";

const Input = ({ id = "", placeholder = "", text = "Username", control }) => {
  const { field } = useController({
    control,
    name: id,
    defaultValue: "",
  });
  return (
    <>
      <label
        htmlFor={id}
        className="block text-left mb-2 font-semibold text-[15px] mt-4"
      >
        {text}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        className="w-full py-4 px-6 border rounded-xl text-sm font-medium outline-none"
        {...field}
      />
    </>
  );
};

export default Input;
