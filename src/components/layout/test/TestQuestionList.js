import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

import submitImage from "../../../assets/img/typeTest/submit-test.png";
import ButtonSubmit from "../../button/ButtonSubmit";
import ItemMultiple from "./ItemMultiple";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStateChanged from "../../../hooks/useAuthStateChanged";
import { domain } from "../../../utils/common";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../../store/alert/alertSlice";

const TestQuestionList = () => {
  const { testId, setId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { test } = useSelector((state) => state.test);

  const { user } = useAuthStateChanged();

  const a = test?.questions?.map((el, index) => {
    return `question${index + 1}`;
  });

  const b = a?.reduce((a, v) => ({ ...a, [v]: v }), {});
  const yubString = function (obj) {
    // if (obj) {
    //   Object.keys(obj).forEach(function (key) {
    //     obj[key] = yup.string().required("Please choose your answer.");
    //   });
    //   return obj;
    // }
  };

  const schema = yup.object(yubString(b));
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors) {
      dispatch(setShowAlert(true));
      dispatch(setMessage("Please finish all questions in test."));
      dispatch(setType("notice"));
    }
  }, [errors, dispatch]);

  const onSubmitHandler = async (values) => {
    const answer = Object.values(values).map((el, index) => {
      return {
        question: index + 1,
        questionText: test?.questions[index].question,
        options: test?.questions[index].options,
        isCorrect: test?.questions[index]?.answer === el ? true : false,
        correctAnswer: test?.questions[index]?.answer,
        userAnswer: el,
      };
    });
    const score = answer.filter((asn) => asn.isCorrect === true).length;

    const data = {
      testId,
      score,
      user: user._id,
      userAnswers: answer,
      duration: 1,
    };

    if (isValid) {
      try {
        const answerHistory = await axios.post(
          `${domain}/api/v1/answer-history`,
          data
        );

        if (answerHistory) {
          navigate(`/set/${setId}/result/${testId}/multiple-choice`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      className="ml-[80px] w-full right-0 flex flex-col justify-center items-center scroll-smooth transition-all linear"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      {test?.questions?.map((q, index) => (
        <ItemMultiple
          question={q}
          id={`question${index}`}
          index={index}
          key={q._id}
          control={control}
          errors={errors}
        ></ItemMultiple>
      ))}
      <div className="mt-[20px]">
        <img src={submitImage} alt="submit-img" className="w-[400px]" />
      </div>
      <p className="mt-[30px] text-[25px] font-bold">
        All done! Ready to submit your test?
      </p>
      <ButtonSubmit className="w-max font-semibold text-[15px]">
        Submit Test
      </ButtonSubmit>
    </form>
  );
};

export default TestQuestionList;
