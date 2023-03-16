import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import { useForm } from "react-hook-form";
const Quiz = () => {
  const { quizId } = useParams();
  const [questionsList, setQuestionsList] = useState();
  const [currentQuestIndex, setCurrentQuestIndex] = useState();
  const [workingTime, setWorkingTime] = useState();
  const [intervalId, setIntervalId] = useState();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    clearInterval(intervalId);
    console.log({data,workingTime});
  };
  const handleNext = () => {
    clearInterval(intervalId);
    setCurrentQuestIndex(currentQuestIndex + 1);
  };
  const handlePrev = () => {
    clearInterval(intervalId);
    setCurrentQuestIndex(currentQuestIndex - 1);
  };
  const getQuizess = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/quiz/${quizId}`
      );
      setQuestionsList(res.data.data.test);
      setWorkingTime(new Array(res.data.data.test.length).fill(0));
      setCurrentQuestIndex(0);
    } catch (error) {
      console.log(error);
    }
  };

  const countTime = () => {
    const id = setInterval(() => {
      setWorkingTime((prev) =>
        prev.map((item, index) => {
          if (index !== currentQuestIndex) return item;
          return item + 1;
        })
      );
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    if (!quizId) return;
    getQuizess();
  }, [quizId]);

  useEffect(() => {
    if (typeof currentQuestIndex === "undefined") return;
    countTime();
  }, [currentQuestIndex]);


  if (!questionsList) return <>loading...</>;

  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {questionsList.map((ques, index) => {
              return (
                <div
                  style={{
                    display: `${
                      index === currentQuestIndex ? "block" : "none"
                    }`,
                  }}
                >
                  <FormLabel> {ques.question}</FormLabel>
                  {ques.options.map((item) => {
                    return (
                      <div>
                        <input
                          type="radio"
                          value={item}
                          {...register(ques._id)}
                        />
                        {item}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {currentQuestIndex === questionsList.length - 1 && (
              <Button type="submit">Finish</Button>
            )}
            {currentQuestIndex !== questionsList.length - 1 && (
              <div className="flex">
                <Button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestIndex === 0}
                >
                  Back
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Quiz;
