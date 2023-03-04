import React from "react";
import axios from "axios";

import useGetImageUrl from "../../hooks/useGetImageUrl";
import { ButtonModal } from "../button";
import { InputModal } from "../input";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import { domain } from "../../utils/common";

const ClassModal = () => {
  const { imageCover, getImageUrl } = useGetImageUrl();
  let navigate = useNavigate();

  const { user } = useAuthStateChanged();

  const schema = yup.object({
    classname: yup.string().required("Please enter your class name."),
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    //mode: onChange để sử dụng đc thằng isValid (ko nó sẽ mãi mãi là false)
  });

  const onSubmitHandler = async (values) => {
    if (isValid) {
      try {
        const newClass = await axios.post(`${domain}/api/v1/class`, {
          name: values.classname,
          description: values.description,
          imageCover:
            imageCover ||
            "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
          createdBy: user._id,
          member: user._id,
        });

        const { _id: classId } = newClass.data.data.classes;

        if (newClass) {
          navigate(`/class/${classId}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <InputModal
        id="classname"
        placeHolder="Enter your class name"
        text="Classname"
        control={control}
      ></InputModal>
      <p className="text-red-400 font-semibold mb-[10px]">
        {errors.classname?.message}
      </p>
      <InputModal
        id="description"
        placeHolder="Enter your description"
        text="Description"
        control={control}
        className="mb-[10px]"
      ></InputModal>
      <input
        type="file"
        id="coverImage"
        className="mt-[10px] file:bg-[#8fb397] file:hover:bg-[#4b8063] file:border-none file:outline-none file:text-white file:px-[18px] file:py-[8px] file:rounded-full"
        onChange={getImageUrl}
      />
      <label className="block text-[14px] font-semibold text-[#939bb4] uppercase tracking-[1px] mt-[10px] mb-[18px]">
        Upload your class cover image.
      </label>
      <ButtonModal>
        {isSubmitting ? (
          <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin mx-auto"></div>
        ) : (
          "Create class"
        )}
      </ButtonModal>
    </form>
  );
};

export default ClassModal;
