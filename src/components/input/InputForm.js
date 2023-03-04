import React from "react";
import { useController } from "react-hook-form";

const InputForm = ({
  label,
  iconName,
  type,
  children,
  id,
  control,
  error = false,
}) => {
  const { field } = useController({
    control,
    name: id,
    defaultValue: "",
  });
  return (
    <div
      className={`flex px-[20px] py-[14px] bg-[#f3f3f3] rounded-xl items-center mt-[40px] relative z-10 border-[2px] solid border-transparent ${
        error ? "border-[#ff805d]" : ""
      }`}
    >
      <div className="flex w-full">
        <ion-icon
          name={iconName}
          class="w-[30px] h-[52px] md hydrated"
        ></ion-icon>
        <div className="ml-[20px] grow">
          <label htmlFor={id} class="block mb-[4px] text-lg">
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            className="outline-0 bg-[#f3f3f3] text-lg w-full"
            {...field}
          ></input>
        </div>
      </div>
      {children && (
        <span className="w-[30px] h-[52px] absolute right-6 top-2/4 -translate-y-2/4 cursor-pointer select-none">
          {children}
        </span>
      )}
    </div>
  );
};

export default InputForm;
