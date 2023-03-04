import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import essay from "../../../assets/img/typeTest/essay.png";

import useAuthStateChanged from "../../../hooks/useAuthStateChanged";
import { setQuestions, setTest } from "../../../store/test/testSlice";
import { domain } from "../../../utils/common";

const Essay = ({ questionEssay }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setId } = useParams();
  const { user } = useAuthStateChanged();

  const handleCreateTest = async () => {
    try {
      const test = await axios.post(`${domain}/api/v1/test`, {
        type: "essay",
        user: user._id,
        set: setId,
      });
      const testId = test.data.data.tests._id;
      const question = await axios.post(`${domain}/api/v1/questions`, {
        questionEssay,
        testId: testId,
        type: "essay",
      });
      console.log(question);
      dispatch(setQuestions(question.data.data.questions));
      dispatch(setTest(test.data.data.tests));
      navigate(`/set/${setId}/essay/${testId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="max-w-[268px] w-full border-[1px] border-[#e35959] rounded-xl cursor-pointer"
      onClick={handleCreateTest}
    >
      <img
        src={essay}
        alt="essay"
        className="hover:scale-110 transition-all linear"
      />
      <h1 className="text-center bg-[#e35959] p-[10px] text-white font-semibold text-[16px] rounded-b-lg">
        Essay
      </h1>
    </div>
  );
};

export default Essay;
