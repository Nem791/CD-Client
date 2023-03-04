import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import IconEyeToggle from "../../components/icons/IconEyeToggle";
import useToggleValue from "../../hooks/useToggleValue";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { ButtonSubmit } from "../../components/button";
import InputForm from "../../components/input/InputForm";
import InputError from "../../components/input/InputError";

import {
  AuthLeft,
  AuthRight,
  HaveAccount,
} from "../../components/layout/auth/index";
import { domain } from "../../utils/common";

const SignUpPage = () => {
  const { value: open, handleToggleValue: handleToggleEyeIcon } =
    useToggleValue();

  let navigate = useNavigate();

  const schema = yup.object({
    username: yup.string().required("Please enter your username."),
    email: yup
      .string()
      .required("Please enter your email address.")
      .email("Invalid email."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Your password must have at least 8 characters."),
    confirm: yup
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
    // values: dữ liệu trong form
    if (isValid) {
      try {
        await axios.post(`${domain}/api/v1/users/signup`, {
          name: values.username,
          email: values.email,
          password: values.password,
          passwordConfirm: values.confirm,
        });

        navigate("/sign-in");
      } catch (err) {
        console.log(err);
      }
    }

    // console.log(values);
  };

  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 overflow-hidden">
      <AuthLeft></AuthLeft>
      <AuthRight
        title="Sign up to Mindcard"
        subtitle="Sign up and start learning. It's free"
      >
        <div className="px-[120px]">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <InputForm
              label="Username"
              iconName="person"
              type="text"
              id="username"
              error={errors.username?.message}
              control={control}
            ></InputForm>
            {errors?.username && (
              <InputError>{errors?.username.message}</InputError>
            )}
            <InputForm
              label="Email"
              iconName="mail"
              type="text"
              id="email"
              error={errors.email?.message}
              control={control}
            ></InputForm>
            {errors?.email && <InputError>{errors?.email.message}</InputError>}
            <InputForm
              label="Password"
              iconName="lock-closed"
              type={`${open ? "text" : "password"}`}
              id="password"
              error={errors.password?.message}
              control={control}
            >
              <IconEyeToggle
                open={open}
                onClick={handleToggleEyeIcon}
              ></IconEyeToggle>
            </InputForm>
            {errors?.password && (
              <InputError>{errors?.password.message}</InputError>
            )}

            <InputForm
              label="Confirm Password"
              iconName="shield-checkmark"
              type="password"
              id="confirm"
              control={control}
              error={errors.confirm?.message}
            ></InputForm>
            {errors?.confirm && (
              <InputError>{errors?.confirm.message}</InputError>
            )}
            <ButtonSubmit
              type="submit"
              className={`${isSubmitting ? "opacity-50" : ""}`}
              // Khi đang submit thì button bị disabled
              isSubmitting={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin"></div>
              ) : (
                "Sign up"
              )}
            </ButtonSubmit>
          </form>
          <HaveAccount
            text="Already have an account?"
            link="Log in"
            to={"/sign-in"}
          ></HaveAccount>
        </div>
      </AuthRight>
    </div>
  );
};

export default SignUpPage;
