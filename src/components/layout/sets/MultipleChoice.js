import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import multipleChoice from "../../../assets/img/typeTest/multiple-choice.png";
import useAuthStateChanged from "../../../hooks/useAuthStateChanged";
import { setQuestions, setTest } from "../../../store/test/testSlice";
import { domain } from "../../../shared/utils/common";
const MultipleChoice = ({ questionMulty }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { setId } = useParams();
  // const { user } = useAuthStateChanged();
  const handleCreateTest = async () => {
    try {
      const { data } = await axios.post(
        `${domain}/api/v1/quiz/create-quiz/643bae9f87163684d33dcd04`
      );
      console.log(data);
      navigate(`/quiz/${data.data.tests._id}`);
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
