import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";

const ReviewQuizzes = () => {
  const navigate = useNavigate();
  const [reviewQuizzes, setReviewQuizzes] = useState([]);
  const getReviewQuizzes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/review-question"
      );
      setReviewQuizzes(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getReviewQuizzes();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-[64px]">
        <h4 class="mt-4 mb-4 text-2xl font-medium leading-tight text-primary text-center py-4">
          Review Your Mermory!
        </h4>
        <div className="w-[75%] mx-auto p-4">
          {reviewQuizzes.length > 0 && (
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="text-xl font-semibold text-indigo-500">Why Review Information?</div>
                <div className="p-2 ">
                  Review strategies are techniques for reengaging with
                  information that you have already learned, so that it stays
                  fresh in your mind. They're particularly valuable when you're
                  learning for a specific purpose – for instance, revising for
                  an assessment or exam.
                </div>
                <div className="text-xl font-semibold text-indigo-500">When you should review your quiz?</div>
                <div className="p-2 ">
                    Memory expert and psychologist Hermann Ebbinghaus' most famous
                  discovery – the "Forgetting Curve" – shows how new information
                  can fade from memory over time, unless you take the time to
                  review it. Ebbinghaus' research also revealed that each time
                  you review information, you can wait a little longer before
                  doing so again.
                </div>
                <div className="text-xl font-semibold text-indigo-500">Our Solution</div>
                <div className="p-2">
                    We have special algorithm to detect when is best time to review your quiz.
                    We already generate your question beside and sort it
                </div>
              </div>
              <div className="flex-1 overflow-y-auto h-[700px]">
                {reviewQuizzes?.map((item) => {
                  return (
                    <div className="p-3">
                      <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                          <div className="text-lg text-center font-mono font-bold">Anonymous Quiz!</div>
                          <div className="flex justify-between items-center py-4">
                            <div className="italic">
                              Best time to review
                            </div>
                            <div>{`${item.name}`}</div>
                              
                          </div>
                          <Button
                            fullWidth
                            size="medium"
                            onClick={() => navigate(`/review-set/${item._id}`)}
                          >
                            Review Now!
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {reviewQuizzes.length === 0 && (
            <div className=" leading-tight text-secondary text-center text-4xl py-4 ">
              Congratulation ! You mermory all quiz
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewQuizzes;
