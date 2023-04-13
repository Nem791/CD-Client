import React from "react";
import { Link } from "react-router-dom";
import { ButtonSubmit } from "../../../components/button";
import IconEyeToggle from "../../../components/icons/IconEyeToggle";
import AuthRight from "../components/AuthRight";
import ButtonSocial from "../components/ButtonSocial";
import HaveAccount from "../components/HaveAccount";
import InputError from "../components/InputError";
import InputForm from "../components/InputForm";
import Layout from "../components/Layout";
import LineText from "../components/LineText";
import useSignInPage from "./useSignInPage";

const SignInPage = () => {
  const {
    open,
    handleToggleEyeIcon,

    handleSubmit,
    onSubmitHandler,
    signInWithGoogle,
    signInWithFacebook,
    onInvalid,

    errors,
    control,
    isSubmitting,
  } = useSignInPage();
  return (
    <Layout>
      <AuthRight
        title="Log in"
        subtitle="Welcome back! login with your data that you entered during registration"
      >
        <div className="px-[120px]">
          <div>
            <ButtonSocial
              title="Login with Facebook"
              imgSrc="https://img.icons8.com/fluency/48/null/facebook.png"
              alt="facebook-login"
              onClick={signInWithFacebook}
            ></ButtonSocial>
            <ButtonSocial
              title="Login with Google"
              imgSrc="https://img.icons8.com/fluency/48/null/google-logo.png"
              alt="google-login"
              onClick={signInWithGoogle}
            ></ButtonSocial>
          </div>
          <LineText></LineText>
          <form onSubmit={handleSubmit(onSubmitHandler, onInvalid)}>
            <InputForm
              label="Email"
              iconName="mail"
              type="text"
              id="email"
              control={control}
              error={errors.email?.message}
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
            <ButtonSubmit
              type="submit"
              className={`${isSubmitting ? "opacity-50" : ""}`}
              // Khi đang submit thì button bị disabled
              isSubmitting={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin"></div>
              ) : (
                "Login"
              )}
            </ButtonSubmit>
          </form>

          <HaveAccount
            text="Don't have an account?"
            link="Register"
            to={"/sign-up"}
          ></HaveAccount>
          <LineText className="hidden"></LineText>
          <p className="text-center text-[#c8c8c8] font-semibold text-[17px] mb-10 pt-[18px] hover:text-secondary transition-all linear">
            <Link to={"/forgotPassword"}>Forgot your password?</Link>
          </p>
        </div>
      </AuthRight>
    </Layout>
  );
};

export default SignInPage;
