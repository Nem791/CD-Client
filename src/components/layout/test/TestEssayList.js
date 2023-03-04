import React from "react";
import { useSelector } from "react-redux";
import ItemEssay from "./ItemEssay";
import submitImage from "../../../assets/img/typeTest/submit-test.png";
import { ButtonSubmit } from "../../button";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStateChanged from "../../../hooks/useAuthStateChanged";
import axios from "axios";
import { domain } from "../../../utils/common";

const TestEssayList = () => {
  const { testId, setId } = useParams();
  const { user } = useAuthStateChanged();
  const navigate = useNavigate();
  const { test } = useSelector((state) => state.test);

  const a = test?.questions?.map((el, index) => {
    return `question${index + 1}`;
  });

  const b = a?.reduce((a, v) => ({ ...a, [v]: v }), {});
  const yubString = function (obj) {
    if (obj) {
      Object.keys(obj).forEach(function (key) {
        obj[key] = yup.string().required("Please enter your answer.");
      });
      return obj;
    }
  };

  const schema = yup.object(yubString(b));
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (values) => {
    console.log(values);
    const answer = Object.values(values).map((el, index) => {
      return {
        question: index + 1,
        questionText: test?.questions[index].question,
        correctAnswer: test?.questions[index]?.answer,
        userAnswer: el,
        isCorrect:
          test?.questions[index]?.answer.toLowerCase() === el.toLowerCase()
            ? true
            : false,
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
        console.log(answerHistory);
        if (answerHistory) {
          navigate(`/set/${setId}/result/${testId}/essay`);
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
      {test?.questions?.map((q, index) => {
        return (
          <ItemEssay
            key={q._id}
            id={`question${index}`}
            question={q}
            index={index}
            control={control}
            errors={errors}
          ></ItemEssay>
        );
      })}

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

export default TestEssayList;
