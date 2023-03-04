import React from "react";

import axios from "axios";
import { useForm } from "react-hook-form";

import IconEyeToggle from "../../components/icons/IconEyeToggle";
import useToggleValue from "../../hooks/useToggleValue";

import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSocial, ButtonSubmit } from "../../components/button";

import { InputError, InputForm } from "../../components/input";
import { useDispatch } from "react-redux";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";
import {
  AuthLeft,
  AuthRight,
  AuthSocial,
  HaveAccount,
  LineText,
} from "../../components/layout/auth/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { domain } from "../../utils/common";

const SignInPage = () => {
  const { value: open, handleToggleValue: handleToggleEyeIcon } =
    useToggleValue();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const handleAlert = () => {
    dispatch(setShowAlert(true));
    dispatch(setMessage("Login successful!"));
    dispatch(setType("success"));
  };

  const handleAlertError = (err) => {
    dispatch(setShowAlert(true));
    dispatch(setMessage(err));
    dispatch(setType("error"));
  };
  const schema = yup.object({
    email: yup.string().email("Invalid email. Please try again."),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(8, "Your password must have at least 8 characters."),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   {
    //     message:
    //       "Your password must have at least 8 characters, 1 uppercase, 1 lowercasr, 1 special character",
    //   }
    // ),
    // Mật khẩu tối thiểu tám ký tự, ít nhất một ký tự hoa,
    // một ký tự viết thường, một số và một ký tự đặc biệt:
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
    console.log(values);
    if (isValid) {
      try {
        const user = await axios.post(`${domain}/api/v1/users/login`, {
          email: values.email,
          password: values.password,
        });
        // console.log(user);
        handleAlert();
        if (user) {
          navigate("/home");
        }
      } catch (err) {
        handleAlertError(err.response.data.message);
        console.error(err);
      }
    }
  };
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response?.user;
      console.log(user);

      const newUser = await axios.post(
        `${domain}/api/v1/users/signUpWithGoogle`,
        {
          email: user.email,
          typeAccount: "google",
          avatarUrl: user.photoURL,
          name: user.displayName,
        }
      );
      handleAlert();
      if (newUser) {
        navigate("/home");
      }
    } catch (err) {
      handleAlertError("Login failed! Please try again later.");
      console.log(err);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const onInvalid = (errors) => console.error(errors);
  return (
    <>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 overflow-hidden">
        <AuthLeft></AuthLeft>
        <AuthRight
          title="Log in to Mindcard"
          subtitle="Welcome back! login with your data that you entered during registration"
        >
          <div className="px-[120px]">
            <AuthSocial>
              <ButtonSocial
                title="Login with Facebook"
                imgSrc="https://img.icons8.com/bubbles/50/000000/facebook-new.png"
                alt="facebook-login"
                onClick={signInWithFacebook}
              ></ButtonSocial>
              <ButtonSocial
                title="Login with Google"
                imgSrc="https://img.icons8.com/clouds/100/000000/google-logo.png"
                alt="google-login"
                onClick={signInWithGoogle}
              ></ButtonSocial>
            </AuthSocial>
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
              {errors?.email && (
                <InputError>{errors?.email.message}</InputError>
              )}
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
            <p className="text-center text-[#c8c8c8] font-semibold text-[17px] mb-10 pt-[18px] hover:text-[#90b498] transition-all linear">
              <Link to={"/forgotPassword"}>Forgot your password?</Link>
            </p>
          </div>
        </AuthRight>
      </div>
    </>
  );
};

export default SignInPage;
