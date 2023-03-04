import React from "react";
import keyIcon from "../assets/img/icon/icon-key.png";

import Input from "../components/input/Input";
import ResetLayout from "../components/layout/ResetLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonSubmit } from "../components/button";
import { domain } from "../utils/common";
const ForgotPasswordPage = () => {
  let navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .required("Please enter your email address.")
      .email("Invalid email."),
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmitHandler = async (values) => {
    if (isValid) {
      try {
        const res = await axios.post(`${domain}/api/v1/users/forgotPassword`, {
          email: values.email,
        });

        if (res) {
          navigate("/checkMail");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <ResetLayout
      icon={keyIcon}
      header="Forgot password?"
      subHeader="No worries, we'll send you reset instructions."
    >
      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          id="email"
          placeholder="Enter your email"
          text="Email"
          control={control}
        ></Input>
        <p className="mt-2 text-red-400 font-semibold">
          {errors.email?.message}
        </p>
        <ButtonSubmit className="mt-4">
          {isSubmitting ? (
            <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin"></div>
          ) : (
            "Reset Password"
          )}
        </ButtonSubmit>
      </form>
    </ResetLayout>
  );
};

export default ForgotPasswordPage;
