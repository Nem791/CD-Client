import { useNavigate } from "react-router-dom";
import useToggleValue from "../../../hooks/useToggleValue";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { domain } from "../../../shared/utils/common";

const useSignUpPage = () => {
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
  };

  return {
    open,
    handleToggleEyeIcon,
    onSubmitHandler,
    handleSubmit,
    control,
    errors,
    isSubmitting,
  };
};

export default useSignUpPage;
