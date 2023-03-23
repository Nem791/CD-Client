import { CheckCircleIcon, DocumentArrowUpIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { BottomNavigation, BottomNavigationAction, LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import { store } from '../../store/configureStore';

const DetailReview = () => {
    const { reviewId } = useParams();
    const [questionsList, setQuestionsList] = useState();
    const [data, setData] = useState();
    const [currentQuestIndex, setCurrentQuestIndex] = useState();
    const [workingTime, setWorkingTime] = useState();
    const [intervalId, setIntervalId] = useState();
    const { handleSubmit, getValues, setValue } = useForm();
  
    const sendAnswer = async (formData) => {
      const userId = store.getState().auth.user?._id;
      const questionIds = Object.keys(formData);
      const formDataValues = Object.values(formData);
      const extraInfo = data.questions
      const answerList = questionsList.map((item, index) => {
        return {
          question: questionIds[index],
          answer: formDataValues[index],
          user: userId,
          time: workingTime[index],
          rating: extraInfo[index].rating,
          repetitions: extraInfo[index].repetitions,
          easiness: extraInfo[index].easiness,
          interval: extraInfo[index].interval
        };
      });
      try {
        await axios.put(
          `http://localhost:3000/api/v1/review-question`,
          {
            data: answerList,
          }
        );
      } catch (error) {
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
          `http://localhost:3000/api/v1/review-question/${reviewId}`
        );
        setQuestionsList(res.data.data[0].questionInfo);
        setData(res.data.data[0])
        setWorkingTime(new Array(res.data.data[0].questionInfo).fill(0));
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
      if (!reviewId) return;
      getQuizess();
    }, [reviewId]);
  
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
          <div className=" grid grid-cols-4 mx-auto min-w-[776px] w-[50%] ">
            <div className="px-6 py-4 col-span-3">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      <div className="grid grid-cols-2 gap-x-6">
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
                <div className=" px-8 pb-8">
                  <div className="text-blue-500 font-mono text-lg">Congratuation you tried your best !</div>
                  <div className="text-sm font-bold">Here is some relative quize</div>
                 
                </div>
              )}
            </div>
            <div className="tracking px-6 py-4  ">
              <Typography
                sx={{ fontSize: 15, fontWeight: "bold" }}
                color="primary"
              >
                Quiz result
              </Typography>
              <div className="grid grid-cols-3">
                {questionsList.map((ques) => {
                  const ansewr = Object.values(getValues());
                  const key = Object.keys(getValues());
                  if (!key.includes(ques._id))
                    return <QuestionMarkCircleIcon width={30} height={30} />;
                  if (ansewr.includes(ques.answer))
                    return (
                      <CheckCircleIcon
                        width={30}
                        height={30}
                        className="text-green-500"
                      />
                    );
                  if (!ansewr.includes(ques.answer))
                    return (
                      <XCircleIcon
                        width={30}
                        height={30}
                        className="text-red-500"
                      />
                    );
                  return <QuestionMarkCircleIcon />;
                })}
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
}

export default DetailReview