import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y, Autoplay } from "swiper";

import Header from "../components/common/Header";

import Card from "../components/card/Card";
import CreatedBy from "../components/layout/cardLayout/CreatedBy";
import CardLeft from "../components/layout/cardLayout/CardLeft";
import StillLearning from "../components/layout/cardLayout/StillLearning";
import NotStudied from "../components/layout/cardLayout/NotStudied";
import CardDetails from "../components/card/CardDetails";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  connectWithSocketServer,
  getCard,
  getNotStudied,
  getStudied,
  joinSet,
} from "../realtimeCommunication/socketConnection";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSetInfo } from "../store/set/slice";
import { CreateCardModal, Modal } from "../components/modal";
import {
  setShowCreateCard,
  setShowReview,
  setShowTestModel,
} from "../store/show/showSlice";
import TypeTestModal from "../components/modal/TypeTestModal";
import ReviewModal from "../components/modal/ReviewModal";
import { getCardList } from "../store/card/slice";
import useAuthStateChanged from "../hooks/useAuthStateChanged";

const SetPage = () => {
  const { setId } = useParams();
  const dispatch = useDispatch();
  const [swiper, setSwiper] = React.useState();
  const prevRef = React.useRef();
  const nextRef = React.useRef();
  const { user } = useAuthStateChanged();

  useEffect(() => {
    connectWithSocketServer(user, dispatch);
  }, [user, dispatch]);

  const { cardList } = useSelector((state) => state.card);
  const { cardShow } = useSelector((state) => state.cardDetail);
  const { showTestModel, showReview, showCreateCard } = useSelector(
    (state) => state.show
  );

  useEffect(() => {
    joinSet(setId);
  }, [setId]);

  useEffect(() => {
    dispatch(getCardList(setId));
  }, [dispatch, setId]);

  useEffect(() => {
    getCard(setId);
    getStudied(setId);
    getNotStudied(setId);
  }, [setId]);

  useEffect(() => {
    dispatch(getSetInfo(setId));
  }, [dispatch, setId]);

  // B1: Lấy tất cả các từ vựng tiếng việt trong Card
  const allWordVN = cardList?.map((card) => {
    return card.meaningUsers;
  });

  // B2: Tạo câu trả lời câu hỏi loại trừ đáp án
  const handleOptionsQuestion = (word) => {
    return allWordVN.filter((item) => item !== word);
  };

  // B3: Hàm lấy ra 3 đáp án bất ký
  function getMultipleRandomInArray(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  // B4: Tạo 4 lựa chọn câu trả lời
  const createOption = (word) => {
    const arrayAcceptAnswer = handleOptionsQuestion(word);
    const arrayRandom = getMultipleRandomInArray(arrayAcceptAnswer, 3);
    return [...arrayRandom, word];
  };

  const questionMulty = cardList?.map((card) => {
    return {
      question: card.word,
      type: "multiple-choice",
      options: createOption(card.meaningUsers),
      answer: card.meaningUsers,
    };
  });

  const questionEssay = cardList?.map((card) => {
    return {
      question: card.word,
      type: "essay",
      answer: card.meaningUsers,
    };
  });

  React.useEffect(() => {
    if (swiper) {
      console.log("Swiper instance:", swiper);
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div>
      <Header></Header>
      <div className="pt-[64px] px-[20px] bg-[#f6f7fb]">
        <div className="mt-12 flex">
          <CardLeft></CardLeft>
          <div className="max-w-[70%] px-[20px] pb-[64px] w-full ml-[20px]">
            <div>
              <Swiper
                // autoplay={{ delay: 5000 }}
                spaceBetween={50}
                slidesPerView={1}
                modules={[Navigation, A11y, Autoplay]}
                navigation={{
                  nextEl: ".swiper-next",
                  prevEl: ".swiper-prev",
                }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={setSwiper}
              >
                {cardList?.map((card, index) => (
                  <SwiperSlide key={card._id}>
                    <Card cardInfo={card} index={index}></Card>
                  </SwiperSlide>
                ))}

                <div className="flex justify-end mt-[20px]">
                  <div
                    className="swiper-prev bg-white rounded-full p-[14px] cursor-pointer"
                    ref={prevRef}
                  >
                    <ArrowBackIosRoundedIcon className="text-[40px] text-[#586380]" />
                  </div>
                  <div
                    className="swiper-next bg-white rounded-full p-[14px] ml-[10px] cursor-pointer"
                    ref={nextRef}
                  >
                    <ArrowForwardIosRoundedIcon className="text-[40px] text-[#586380]" />
                  </div>
                </div>
              </Swiper>
            </div>
            <div className="h-[1px] bg-[#d9dde8] mt-[1rem] w-full"></div>
            <CreatedBy></CreatedBy>
            <div className="font-bold text-[#303545] text-[20px] mt-[40px]">
              Terms in this set ({cardList?.length})
            </div>
            <NotStudied></NotStudied>
            <StillLearning></StillLearning>
          </div>
        </div>
      </div>
      <CardDetails show={cardShow}></CardDetails>
      <Modal
        title="Choose type of test"
        showModal={showTestModel}
        handleClose={() => {
          dispatch(setShowTestModel(false));
        }}
      >
        <TypeTestModal
          questionMulty={questionMulty}
          questionEssay={questionEssay}
        ></TypeTestModal>
      </Modal>
      <Modal
        title="How would you rate this set ?"
        showModal={showReview}
        handleClose={() => {
          dispatch(setShowReview(false));
        }}
      >
        <ReviewModal></ReviewModal>
      </Modal>
      <Modal
        showModal={showCreateCard}
        handleClose={() => dispatch(setShowCreateCard(false))}
        title="Create a Flashcard"
      >
        <CreateCardModal
          closeModel={() => dispatch(setShowCreateCard(false))}
        ></CreateCardModal>
      </Modal>
    </div>
  );
};

export default SetPage;
