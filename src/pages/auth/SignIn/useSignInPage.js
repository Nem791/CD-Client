import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useToggleValue from "../../../hooks/useToggleValue";
import { useCookies } from "react-cookie";

import {
  setMessage,
  setShowAlert,
  setType,
} from "../../../store/alert/alertSlice";
import axios from "axios";
import { domain } from "../../../shared/utils/common";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import useFireBase from "../../../shared/helper/useFireBase";

const useSignInPage = () => {
  const { value: open, handleToggleValue: handleToggleEyeIcon } =
    useToggleValue();

  const { auth } = useFireBase();
  const [cookies, setCookie] = useCookies(["jwt"]);

  const dispatch = useDispatch();
  let navigate = useNavigate();

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
        const user = await axios.post(`${domain}/api/v1/users/login`, {
          email: values.email,
          password: values.password,
        });

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

      if (newUser) {
        console.log(newUser);
        setCookie("jwt", newUser.data.token, { path: "/" });
        localStorage.setItem("jwt", newUser.data.token);
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
    } catch (err) {
      console.log(err);
    }
  };

  const onInvalid = (errors) => console.error(errors);

  return {
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
  };
};

export default useSignInPage;
