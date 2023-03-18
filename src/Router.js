import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  CheckMailPage,
  ErrorPage,
  ForgotPasswordPage,
  HomePage,
  SetNewPasswordPage,
  SettingPage,
  UserProfile,
  CreateSetPage,
  SetPage,
} from "./pages";
import SignInPage from "./pages/auth/SignIn/SignInPage";
import SignUpPage from "./pages/auth/SignUp/SignUpPage";
import PaymentView from "./pages/payment/PaymentView";
import LeaderBoardPage from "./pages/leaderboard";
import DetalLeaderBoard from "./pages/leaderboard/[id]";
import Quiz from "./pages/quiz";
import QuizzesPage from "./pages/quizzes";
import SchedulePage from "./pages/schedule/SchedulePage";
import EssayPage from "./pages/test/EssayPage";
import MultipleChoicePage from "./pages/test/MultipleChoicePage";
import ResultPage from "./pages/test/ResultPage";

import { getIsLogin } from "./store/auth/slice";

const Router = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getIsLogin(isLogin));
  }, [dispatch, isLogin]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}></Route>
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
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/leaderboard/:quizId" element={<DetalLeaderBoard />} />
      </>

      {isLogin && (
        <>
          <Route
            path="/profile/:userId/*"
            element={<UserProfile></UserProfile>}
          ></Route>

          <Route path="/settings" element={<SettingPage></SettingPage>}></Route>
          <Route
            path="/createSet/:setId"
            element={<CreateSetPage></CreateSetPage>}
          ></Route>
          <Route path="/quiz" element={<QuizzesPage />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
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
          <Route path="/payment" element={<PaymentView></PaymentView>}></Route>
        </>
      )}
    </Routes>
  );
};

export default Router;
