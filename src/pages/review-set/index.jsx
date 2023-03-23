import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
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
      setReviewQuizzes(res.data.data)
      console.log(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getReviewQuizzes();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-[64px]">
        <h4 class="mt-0 mb-2 text-2xl font-medium leading-tight text-primary text-center py-4">
          Review Your Mermory!
        </h4>
        <div className="w-[75%] mx-auto">
          {reviewQuizzes.length > 0 && (
            <Grid container spacing={4}>
              {reviewQuizzes?.map((item) => {
                return (
                  <Grid xs={3} key={item._id}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <div className="flex justify-between items-center mb-3">
                          <Typography
                            sx={{ fontSize: 15 }}
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {item.name}
                          </Typography>
                          
                        </div>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                        >
                          <div className="font-medium leading-tight text-primary">
                            Description
                          </div>
                          <div className="quiz-describle">
                            {item.reviewDate}
                          </div>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          size="medium"
                          onClick={() => navigate(`/review-set/${item._id}`)}
                        >
                          Review Now!
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
          {reviewQuizzes.length ===0 &&<div className=" leading-tight text-secondary text-center text-4xl py-4 ">
            Congratulation ! You  mermory all quiz 
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ReviewQuizzes;
