import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  CheckMailPage,
  ClassPage,
  ErrorPage,
  ForgotPasswordPage,
  HomePage,
  SetNewPasswordPage,
  SettingPage,
  SignInPage,
  SignUpPage,
  UserProfile,
  CreateSetPage,
  SetPage,
} from "./pages";
import SchedulePage from "./pages/schedule/SchedulePage";
import EssayPage from "./pages/test/EssayPage";
import MultipleChoicePage from "./pages/test/MultipleChoicePage";
import ResultPage from "./pages/test/ResultPage";

import { getIsLogin } from "./store/auth/slice";

const Router = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  // console.log(isLogin);
  useEffect(() => {
    dispatch(getIsLogin(isLogin));
  }, [dispatch, isLogin]);
  return (
    <Routes>
      {/* Đường dẫn / sẽ tự động dc chuyển sang /home */}
      <Route path="/" element={<Navigate to="/home" />}></Route>
      {/* Làm trang Error 404 */}
      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      <Route path="/home" element={<HomePage></HomePage>}></Route>

      <>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPasswordPage></ForgotPasswordPage>}
        ></Route>
        <Route
          path="/checkMail"
          element={<CheckMailPage></CheckMailPage>}
        ></Route>
        <Route
          path="/setNewPassword"
          element={<SetNewPasswordPage></SetNewPasswordPage>}
        ></Route>
      </>

      {isLogin && (
        <>
          <Route
            path="/profile/:userId/*"
            element={<UserProfile></UserProfile>}
          ></Route>
          {/* <Route
            path="/class/:classId/*"
            element={<ClassPage></ClassPage>}
          ></Route> */}
          <Route path="/settings" element={<SettingPage></SettingPage>}></Route>
          <Route
            path="/createSet/:setId"
            element={<CreateSetPage></CreateSetPage>}
          ></Route>
          <Route path="/set/:setId" element={<SetPage></SetPage>}></Route>
          <Route
            path="/set/:setId/multiple-choice/:testId"
            element={<MultipleChoicePage></MultipleChoicePage>}
          ></Route>
          <Route
            path="/set/:setId/essay/:testId"
            element={<EssayPage></EssayPage>}
          ></Route>
          <Route
            path="/set/:setId/result/:testId/:type"
            element={<ResultPage></ResultPage>}
          ></Route>
          <Route
            path="/schedule/:userId"
            element={<SchedulePage></SchedulePage>}
          ></Route>
        </>
      )}
    </Routes>
  );
};

export default Router;
