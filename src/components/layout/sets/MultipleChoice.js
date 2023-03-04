import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import multipleChoice from "../../../assets/img/typeTest/multiple-choice.png";
import useAuthStateChanged from "../../../hooks/useAuthStateChanged";
import { setQuestions, setTest } from "../../../store/test/testSlice";
import { domain } from "../../../utils/common";
const MultipleChoice = ({ questionMulty }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setId } = useParams();
  const { user } = useAuthStateChanged();
  const handleCreateTest = async () => {
    try {
      const test = await axios.post(`${domain}/api/v1/test`, {
        type: "multiple-choice",
        user: user._id,
        set: setId,
      });

      const testId = test.data.data.tests._id;
      const question = await axios.post(`${domain}/api/v1/questions`, {
        questionMulty,
        testId: test.data.data.tests._id,
        type: "multiple-choice",
      });

      dispatch(setQuestions(question.data.data.questions));
      dispatch(setTest(test.data.data.tests));
      navigate(`/set/${setId}/multiple-choice/${testId}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="max-w-[268px] w-full border-[1px] border-[#6bceb1] rounded-xl cursor-pointer"
      onClick={handleCreateTest}
    >
      <img
        src={multipleChoice}
        alt="multiple-choice"
        className="hover:scale-110 transition-all linear"
      />
      <h1 className="text-center bg-[#6bceb1] p-[10px] text-white font-semibold text-[16px] rounded-b-lg">
        Multiple Choice
      </h1>
    </div>
  );
};

export default MultipleChoice;
