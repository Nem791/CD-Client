import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ButtonModal } from "../button";
import { InputModal } from "../input";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import slugify from "react-slugify";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";

import {
  createCard,
  updateCard,
} from "../../realtimeCommunication/socketConnection";
import { socket } from "../../App";

import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import { useParams } from "react-router-dom";
import useGetImageUrl from "../../hooks/useGetImageUrl";
import { getCardList } from "../../store/card/slice";
import { domain } from "../../shared/utils/common";
import { setCardList } from "../../store/card/slice";

const CreateCardModal = ({ closeModel }) => {
  const { setId } = useParams();
  const schema = yup.object({
    term: yup.string().required("Please enter your term."),
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

  const dispatch = useDispatch();
  const { user } = useAuthStateChanged();
  const { imageCover, getImageUrl, setImageCover } = useGetImageUrl();
  const { cardInfo } = useSelector((state) => state.card);

  useEffect(() => {
    reset({
      term: cardInfo?.word,
      definition: cardInfo?.meaningUsers,
    });
  }, [cardInfo, reset]);

  const fileRef = useRef(null);
  const onSubmitHandler = async (values) => {
    if (isValid) {
      const searchWord = values.term;
      try {
        const getDefinitonCard = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`,
          {
            withCredentials: false,
            // Để false thì ta ms gọi dc API tránh khỏi thằng CORS
          }
        );

        const { word, phonetic, meanings, phonetics } =
          getDefinitonCard.data[0];

        // Lọc ra các thằng phonetics có audio
        let audio = phonetics.filter((phonetic) => phonetic.audio);

        if (audio && audio.length > 0) {
          audio = audio.find((audio) => audio.audio).audio;
        } else {
          audio = "";
        }

        const meanArr = meanings?.map((mean) => {
          let meanObj = {};
          meanObj["partOfSpeech"] = mean.partOfSpeech;
          meanObj["definitions"] = mean.definitions;

          return meanObj;
        });

        console.log("meanArr", meanArr);

        const formData = new FormData();
        formData.append("filename", imageCover);
        formData.append("word", searchWord);
        meanArr?.forEach((mean) => {
          formData.append("meanings[]", JSON.stringify(mean));
        });
        formData.append("meaningUsers", values.definition);
        formData.append("synonyms", meanings.synonyms || []);
        formData.append("antonyms", meanings.antonyms || []);
        formData.append("pronounce", phonetic || "");
        formData.append("audio", audio || "");
        formData.append("slug", slugify(word));
        formData.append("createdBy", user.id);
        formData.append("setId", setId);

        // const cardData = {
        //   word: searchWord,
        //   meaningUsers: values.definition,
        //   meanings: meanArr,
        //   synonyms: meanings.synonyms || [],
        //   antonyms: meanings.antonyms || [],
        //   pronounce: phonetic || "",
        //   audio: audio || "",
        //   slug: slugify(word),
        //   createdBy: user.id,
        //   setId: setId,
        // };

        if (cardInfo) {
          const resetFile = setImageCover;
          resetFile(cardInfo?.images);
          const cardId = cardInfo?._id;
          const cardDataUpdate = {
            word: values.term,
            meaningUsers: values.definition,
            fileUrl: cardInfo?.images,
          };
          socket?.emit("update-card", { cardDataUpdate, cardId, setId });
          await axios.patch(`${domain}/api/v1/cards`, {});
          const response = await axios.get(
            `${domain}/api/v1/sets/${setId}/getAllCard`
          );
          const { cardList } = response.data.data;
          dispatch(setCardList(cardList));
        } else if (imageCover) {
          await axios.post(`${domain}/api/v1/cards`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          const response = await axios.get(
            `${domain}/api/v1/sets/${setId}/getAllCard`
          );
          const { cardList } = response.data.data;
          dispatch(setCardList(cardList));
        } else {
          dispatch(setShowAlert(true));
          dispatch(setMessage("You must choose image for the card"));
          dispatch(setType("error"));
        }

        // reset form
        reset();
        fileRef.current.value = null;
        const resetFile = setImageCover;
        resetFile(null);
        // Cách truyền setState vào component khác
        const close = closeModel;
        close();
      } catch (err) {
        console.log(err);
        dispatch(setShowAlert(true));
        dispatch(setMessage("Something wrong."));
        dispatch(setType("error"));
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <InputModal
        id="term"
        placeHolder="Add a term..."
        text="Term"
        control={control}
      ></InputModal>
      <p className="text-red-400 font-semibold mb-[10px]">
        {errors.term?.message}
      </p>
      <InputModal
        id="definition"
        placeHolder="Add a definition..."
        text="definition"
        control={control}
      ></InputModal>
      <p className="text-red-400 font-semibold mb-[10px]">
        {errors.definition?.message}
      </p>
      <div className="flex items-center justify-between mb-[18px]">
        <div>
          <input
            type="file"
            id="coverImage"
            name="filename"
            className="mt-[10px] file:bg-primary file:hover:bg-secondary file:border-none file:outline-none file:text-white file:px-[18px] file:py-[8px] file:rounded-full cursor-pointer"
            onChange={getImageUrl}
            ref={fileRef}
          />
          <label className="block text-[14px] font-semibold text-[#939bb4] uppercase tracking-[1px] mt-[10px] mb-[18px]">
            Upload your class cover image.
          </label>
        </div>
      </div>
      <ButtonModal>
        {isSubmitting && imageCover ? (
          <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin mx-auto"></div>
        ) : (
          "Create a card"
        )}
      </ButtonModal>
    </form>
  );
};

export default CreateCardModal;
