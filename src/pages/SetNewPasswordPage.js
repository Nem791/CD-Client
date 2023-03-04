import React from "react";
import { useForm } from "react-hook-form";
import keyIcon from "../assets/img/icon/icon-key.png";
import { ButtonSubmit } from "../components/button";

import Input from "../components/input/Input";
import ResetLayout from "../components/layout/ResetLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { domain } from "../utils/common";

const SetNewPasswordPage = () => {
  let navigate = useNavigate();

  const schema = yup.object({
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Your password must have at least 8 characters."),
    confirmPassword: yup
      .string()
      .required("Please enter confirm password.")
      .oneOf(
        [yup.ref("password"), null],
        "Please make sure your password match."
      ),
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
        await axios.patch(
          `${domain}/api/v1/users/resetPassword/${values.resetToken}`,
          {
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }
        );
        navigate("/sign-in");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ResetLayout
      icon={keyIcon}
      header="Set new password"
      subHeader="Your new password must be different to previously used passwords."
    >
      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          id="password"
          placeholder="Enter your new password"
          text="Password"
          control={control}
        ></Input>
        <Input
          id="confirmPassword"
          placeholder="Confirm your new password"
          text="Confirm Password"
          control={control}
        ></Input>
        <Input
          id="resetToken"
          placeholder="Enter your reset password token"
          text="Reset Password Token"
          control={control}
        ></Input>
        <ButtonSubmit className="mt-4">Reset password</ButtonSubmit>
      </form>
    </ResetLayout>
  );
};

export default SetNewPasswordPage;
