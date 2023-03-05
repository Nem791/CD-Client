import React from "react";
import { ButtonSubmit } from "../../../components/button";
import IconEyeToggle from "../../../components/icons/IconEyeToggle";
import AuthRight from "../components/AuthRight";
import HaveAccount from "../components/HaveAccount";
import InputError from "../components/InputError";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import useSignUpPage from "./useSignUpPage";

const SignUpPage = () => {
  const {
    open,
    handleToggleEyeIcon,
    onSubmitHandler,
    handleSubmit,
    control,
    errors,
    isSubmitting,
  } = useSignUpPage();
  return (
    <Layout>
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
    </Layout>
  );
};

export default SignUpPage;
