import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useGetImageUrl from "../../hooks/useGetImageUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCardList, setCardList, setSetId } from "../../store/card/slice";
import {
  deleteCard,
  getCardOfSet,
  joinSet,
} from "../../realtimeCommunication/socketConnection";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";

import { ButtonSubmit, SmallButton } from "../../components/button";
import Header from "../../components/common/Header";
import { InputModal } from "../../components/input";
import { CreateCardModal, Modal } from "../../components/modal";
import CardDemo from "../../components/item/CardDemo";
import axios from "axios";

import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import slugify from "react-slugify";
import { domain } from "../../utils/common";

const CreateSetPage = () => {
  const navigate = useNavigate();
  const { setId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const { imageCover, getImageUrl, setImageCover } = useGetImageUrl();
  const { user } = useAuthStateChanged();

  const { cardList } = useSelector((state) => state.card);

  // console.log(cardList.map);

  const dispatch = useDispatch();

  useEffect(() => {
    joinSet(setId);
  }, [setId]);

  useEffect(() => {
    dispatch(getCardList(setId));
  }, [dispatch, setId]);

  useEffect(() => {
    dispatch(setSetId(setId));
  }, [dispatch, setId]);

  const schema = yup.object({
    setname: yup.string().required("Please enter your set name.", {}),
  });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    //mode: onChange để sử dụng đc thằng isValid (ko nó sẽ mãi mãi là false)
  });

  const handleShowModel = () => {
    setShowModal(true);
  };

  const fileRef = useRef(null);

  const onSubmitHandler = async (values) => {
    if (isValid) {
      try {
        if (imageCover) {
          console.log({
            name: values.setname,
            description: values.description,
            createdBy: user._id,
            numCards: cardList.length,
            image: imageCover,
            slug: slugify(values.setname),
          });
          const sets = await axios.patch(`${domain}/api/v1/sets/${setId}`, {
            name: values.setname,
            description: values.description,
            createdBy: user._id,
            numCards: cardList.length,
            image: imageCover,
            slug: slugify(values.setname),
          });
          reset();
          fileRef.current.value = null;
          const resetFile = setImageCover;
          resetFile(null);
          navigate(`/set/${setId}`);
        }
      } catch (err) {
        console.log(err);
        dispatch(setShowAlert(true));
        dispatch(setMessage("Something wrong."));
        dispatch(setType("error"));
      }
    }
  };

  const handleDeleteCard = (cardId) => {
    try {
      deleteCard(cardId);
    } catch (err) {
      dispatch(setShowAlert(true));
      dispatch(setMessage("Something wrong."));
      dispatch(setType("error"));
    }
  };
  return (
    <div className="bg-[#f6f7fb]">
      <Header></Header>
      <div className="p-[64px]">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mt-10 flex justify-between">
            <h1 className="text-[28px] font-bold tracking-[1px]">
              Create a new set
            </h1>
            <SmallButton
              className={"bg-[#8fb397] hover:bg-[#4b8063] text-white"}
            >
              Create
            </SmallButton>
          </div>
          <div className="grid items-center grid-cols-2">
            <div className="max-w-[600px] w-full mt-[48px]">
              <InputModal
                id="setname"
                placeHolder="Enter a title, like “Biology - Chapter 22: Evolution”"
                text="Title"
                control={control}
              ></InputModal>
              <p className="text-red-400 font-semibold mb-[10px]">
                {errors.setname?.message}
              </p>
              <InputModal
                id="description"
                placeHolder="Add a description..."
                text="Description"
                control={control}
              ></InputModal>
            </div>

            <div>
              <input
                ref={fileRef}
                type="file"
                id="coverImage"
                className="mt-[10px] file:bg-[#8fb397] file:hover:bg-[#4b8063] file:border-none file:outline-none file:text-white file:px-[18px] file:py-[8px] file:rounded-full"
                onChange={getImageUrl}
              />
              <label className="block text-[14px] font-semibold text-[#939bb4] uppercase tracking-[1px] mt-[10px] mb-[18px]">
                Upload your class cover image.
              </label>
            </div>
          </div>
        </form>
        <div className="mt-10 flex justify-between">
          <h1 className="text-[28px] font-bold tracking-[1px]">
            Create Flashcards
          </h1>
        </div>
        <div className="mt-[20px] grid gap-y-[10px]">
          <ButtonSubmit
            className="bg-[#8fb397] hover:bg-[#4b8063] text-white"
            onClick={handleShowModel}
          >
            Create card
          </ButtonSubmit>
          {cardList.map((card, index) => (
            <CardDemo
              setId={setId}
              key={card._id}
              card={card}
              index={index}
              deleteCard={handleDeleteCard}
            ></CardDemo>
          ))}
        </div>
      </div>
      <Modal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        title="Create a Flashcard"
      >
        <CreateCardModal
          closeModel={() => setShowModal(false)}
        ></CreateCardModal>
      </Modal>
    </div>
  );
};

export default CreateSetPage;
