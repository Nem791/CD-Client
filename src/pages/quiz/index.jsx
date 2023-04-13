import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import { useForm } from "react-hook-form";
import { store } from "../../store/configureStore";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import {
  DocumentArrowUpIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
const Quiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [questionsList, setQuestionsList] = useState();
  const [currentQuestIndex, setCurrentQuestIndex] = useState();
  const [workingTime, setWorkingTime] = useState();
  const [intervalId, setIntervalId] = useState();
  const [recommendQuizzes, setRecommendQuizzes] = useState();
  const [loading, setLoading] = useState(true);
  const { handleSubmit, getValues, setValue } = useForm();
  const [testInterval, setTestIntervale] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const getRecommendQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/quiz/recommend/${quizId}`
      );
      setRecommendQuizzes(response.data.data.quizzes);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const sendAnswer = async (formData) => {
    const userId = store.getState().auth.user?._id;
    const questionIds = Object.keys(formData);
    const formDataValues = Object.values(formData);
    const answerList = questionsList.map((item, index) => {
      return {
        question: questionIds[index],
        answer: formDataValues[index],
        user: userId,
        time: workingTime[index],
      };
    });
    try {
      await axios.put(`http://localhost:3000/api/v1/review-question`, {
        data: answerList,
      });
      await getRecommendQuiz();
      setIsFinish(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    clearInterval(intervalId);
    sendAnswer(data);
  };
  const handleSetValue = (name, value) => {
    setValue(name, value);
    handleNext();
  };
  const handleNext = () => {
    clearInterval(intervalId);
    setCurrentQuestIndex(currentQuestIndex + 1);
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
    let array = testInterval;
    array.push(id);
    setTestIntervale(array);
    setIntervalId(id);
  };

  useEffect(() => {
    if (!quizId) return;
    getQuizess();
  }, [quizId]);

  useEffect(() => {
    if (typeof currentQuestIndex === "undefined") return;
    if (currentQuestIndex === questionsList.length) {
      const data = getValues();
      onSubmit(data);
      return;
    }
    countTime();
  }, [currentQuestIndex]);

  if (!questionsList) return <LinearProgress />;
  return (
    <div className="">
      <Header />
      <div className="pt-[64px] mx-auto">
        <div className="grid justify-center py-[10px] min-h-[64px] shadow-sm w-[75%] min-w-[776px] mx-auto">
          <Typography
            sx={{ fontSize: 15, fontWeight: "bold" }}
          >{`${currentQuestIndex}/${questionsList.length}`}</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: "bold" }} color="primary">
            English quiz
          </Typography>
        </div>
        <div className=" grid grid-cols-7 mx-auto min-w-[776px] w-[75%] ">
          <div className="px-6 py-4 col-span-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className={
                  ("text-blue-500 font-mono text-lg",
                  `${currentQuestIndex !== questionsList.length && "hidden"}`)
                }
              >
                Congratuation you tried your best !
              </div>
              {questionsList.map((ques, index) => {
                return (
                  <div
                    className="w-full"
                    style={{
                      display: `${
                        index === currentQuestIndex ? "block" : "none"
                      }`,
                    }}
                  >
                    <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                      {ques.question}
                    </Typography>
                    <div className=" gap-x-6">
                      {ques.options.map((item) => {
                        return (
                          <div
                            className=" border-2 border-gray-300 hover:border-indigo-600 py-4 rounded-md my-4 px-4 min-w-[144px] w-full"
                            key={item}
                            onClick={() => handleSetValue(ques._id, item)}
                          >
                            <div
                              className="text-gray-500 min-w-[144px] w-full"
                              style={{ fontSize: 13, fontWeight: "bold" }}
                            >
                              {item}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </form>

            {currentQuestIndex === questionsList.length && (
              <div className="max-h-[600px] overflow-y-auto">
                {questionsList.map((ques, index) => {
                  const formData = getValues();
                  const formDataValues = Object.values(formData);
                  return (
                    <div className="w-full 	">
                      <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
                        {ques.question}
                      </Typography>
                      <div className=" gap-x-6">
                        {ques.options.map((item) => {
                          return (
                            <div
                              className={clsx(
                                "border-2 py-4 rounded-md my-4 px-4 min-w-[144px] w-full",
                                {
                                  "border-green-500": item === ques.answer,
                                  "border-red-300":
                                    item === formDataValues[index] &&
                                    item !== ques.answer,
                                }
                              )}
                              key={item}
                            >
                              <div
                                className="text-gray-500 min-w-[144px] w-full"
                                style={{ fontSize: 13, fontWeight: "bold" }}
                              >
                                {item}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="tracking px-6 py-4 col-span-3 ">
            <Typography
              sx={{ fontSize: 15, fontWeight: "bold" }}
              color="primary"
            >
              Quiz result
            </Typography>
            <div className="">
              <div className="grid grid-cols-3 w-[55%]">
                {questionsList.map((ques) => {
                  const ansewr = Object.values(getValues());
                  const key = Object.keys(getValues());
                  if (!key.includes(ques._id))
                    return <QuestionMarkCircleIcon width={50} height={50} />;
                  if (ansewr.includes(ques.answer))
                    return (
                      <CheckCircleIcon
                        width={50}
                        height={50}
                        className="text-green-500"
                      />
                    );
                  if (!ansewr.includes(ques.answer))
                    return (
                      <XCircleIcon
                        width={50}
                        height={50}
                        className="text-red-500"
                      />
                    );
                  return <QuestionMarkCircleIcon />;
                })}
              </div>
              {currentQuestIndex === questionsList.length && (
                <div className="pb-8">
                  <div className="text-sm font-bold">
                    Here is some relative quize
                  </div>
                  {loading && (
                    <div className="flex justify-center items-center h-[200px]">
                      <CircularProgress size={80} />
                    </div>
                  )}
                  {recommendQuizzes?.map((item) => {
                    return (
                      <div
                        onClick={() => navigate(`/quiz/${item._id}`)}
                        className="flex items-center border-2 border-gray-300 cursor-pointer hover:border-indigo-600 py-4 rounded-md my-4 px-4 min-w-[144px] w-full"
                      >
                        <div className=""></div>
                        <div>{item.title}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Finish Your Quiz !"
            icon={<DocumentArrowUpIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default Quiz;
