import { LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";

const ReviewQuizzes = () => {
  const [reviewQuizzes, setReviewQuizzes] = useState();
  const getReviewQuizzes = async () => {
    try {
    const res = await axios.get('http://localhost:3000/api/v1/review-question');
    console.log(res.data.data)
    } catch (error) {
        
    }
  };
  useEffect(() => {
    getReviewQuizzes();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-[64px]">asdasd</div>
    </div>
  );
};

export default ReviewQuizzes;
