import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/img/home/logo.png";
import useToggleValue from "../../hooks/useToggleValue";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import { ButtonModal, SmallButton } from "../button";
import { CreateBox, Notification, UserIcon } from "../box";
import axios from "axios";
import { ClassModal, Modal } from "../modal";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";
import { connectWithSocketServer } from "../../realtimeCommunication/socketConnection";
import FriendInvitation from "../box/FriendInvitation";
import MessageList from "../box/MessageList";
import { InputModal } from "../input";
import { setShowInvitationBox } from "../../store/show/showSlice";
import { domain } from "../../utils/common";
import VideoList from "../box/VideoList";

const Header = () => {
  const { value: show, handleToggleValue: handleIconClick } = useToggleValue();
  const { showInvitationBox } = useSelector((state) => state.show);

  const dispatch = useDispatch();
  const { isLogin, user } = useAuthStateChanged();
  console.log("isLogin", isLogin);

  // const [showModal, setShowModal] = useState(false);

  const ListLink = [
    {
      id: 1,
      to: "#",
      title: "Home",
    },
    {
      id: 2,
      to: `/schedule/${user?._id}`,
      title: "Schedule",
    },
    {
      id: 3,
      to: "#",
      title: "About us",
    },
  ];

  let navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required("Please enter your email."),
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    //mode: onChange để sử dụng đc thằng isValid (ko nó sẽ mãi mãi là false)
  });

  const handleLogout = async () => {
    try {
      await axios.get(`${domain}/api/v1/users/logout`);
      // refresh lại trang
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleShowModel = () => {
  //   setShowModal(true);
  // };

  const handleAlert = () => {
    dispatch(setShowAlert(true));
    dispatch(setMessage("You are not logged in! Please log in to get access."));
    dispatch(setType("notice"));
  };

  const goToSetPage = async () => {
    try {
      const sets = await axios.post(`${domain}/api/v1/sets`, {
        name: "Test Set",
      });

      const setId = sets.data.data.sets._id;
      if (sets) {
        navigate(`/createSet/${setId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLogin) {
    } else {
      connectWithSocketServer(user, dispatch);
    }
  }, [isLogin, user, dispatch]);

  const onSubmitHandler = async (values) => {
    if (isValid) {
      try {
        await axios.post(`${domain}/api/v1/friend-invitation/invite`, {
          targetMailAddress: values.email,
        });

        dispatch(setShowInvitationBox(false));
        setShowInvitationBox(false);
        dispatch(setShowAlert(true));
        dispatch(setMessage("Invitation has been sent"));
        dispatch(setType("success"));
      } catch (err) {
        console.log(err);
        dispatch(setShowInvitationBox(false));
        setShowInvitationBox(false);
        dispatch(setShowAlert(true));
        dispatch(setMessage(err.response.data.message));
        dispatch(setType("error"));
      }
    }
  };
  return (
    <>
      <header className="max-h-[63px] flex items-center justify-between py-[15px] px-[20px] fixed bg-white z-20 w-full border border-b-[0.0625rem] solid">
        {/* Header left */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-[48px]" />
          </Link>
          <ul className="lg:flex hidden text-[16px] font-medium text-[#2e3856] items-center">
            {ListLink.map((link) => (
              <li className="ml-[16px]" key={link.id}>
                <Link to={link.to}>{link.title}</Link>
              </li>
            ))}
            <li>
              <SmallButton
                className="text-white bg-primary hover:bg-secondary relative"
                onClick={isLogin ? goToSetPage : handleAlert}
              >
                <span>Create</span>
                {/* <CreateBox
                  showBox={show}
                  isLogin={isLogin}
                  handleShowModel={handleShowModel}
                ></CreateBox> */}
              </SmallButton>
            </li>
          </ul>
        </div>
        {/* Header right */}
        <div className="text-[#2e3856] gap-[20px] items-center hidden lg:flex">
          {!isLogin && (
            <>
              <SmallButton className="bg-white hover:bg-[#f6f7fb]">
                <Link to={"/sign-in"}>Log in</Link>
              </SmallButton>
              <SmallButton className="bg-[#ffcd1f] hover:bg-[#ffdc62]">
                <Link to={"/sign-up"}>Sign up</Link>
              </SmallButton>
            </>
          )}
          {isLogin && (
            <>
              <FriendInvitation></FriendInvitation>
              <MessageList></MessageList>
              <VideoList></VideoList>
              <Notification></Notification>
              <SmallButton
                className="bg-[#ffcd1f] hover:bg-[#ffdc62]"
                onClick={handleLogout}
              >
                Log out
              </SmallButton>
              <UserIcon></UserIcon>
            </>
          )}
        </div>

        {/* Responsive */}
        <div
          className={`menu-button w-[30px] h-[30px] cursor-pointer block lg:hidden ${
            show ? "show" : ""
          }`}
          onClick={handleIconClick}
        >
          <span className="w-full rounded-lg h-[4.5px] bg-[#96998b] block mt-[6px] transition ease duration-200"></span>
          <span className="w-full rounded-lg h-[3.5px] bg-[#96998b] block mt-[6px] transition ease duration-200"></span>
          <span className="w-full rounded-lg h-[4.5px] bg-[#96998b] block mt-[6px] transition ease duration-200"></span>
        </div>
        {/* Menu */}
        <div
          className={`menu-sections absolute h-screen top-full height-0 left-0 right-0 bg-[#ffffff] w-full flex items-center justify-center lg:hidden ${
            show ? "show" : ""
          }`}
        >
          <ul className="my-0 mx-[2rem] text-center">
            <li className="py-[1.25rem] text-[2.5rem] text-[#90b498] tracking-[10px] cursor-pointer">
              Home
            </li>
            <li className="py-[1.25rem] text-[2.5rem] text-[#90b498] tracking-[10px] cursor-pointer">
              Dictionaries
            </li>
            <li className="py-[1.25rem] text-[2.5rem] text-[#90b498] tracking-[10px] cursor-pointer">
              About us
            </li>
          </ul>
        </div>

        {/* <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
          <ClassModal></ClassModal>
        </Modal> */}

        <Modal
          showModal={showInvitationBox}
          handleClose={() => dispatch(setShowInvitationBox(false))}
          title="Add Friend"
        >
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <InputModal
              id="email"
              placeHolder="Enter your friend's email"
              text="email"
              control={control}
            ></InputModal>
            <p className="text-red-400 font-semibold mb-[10px]">
              {errors.email?.message}
            </p>
            <ButtonModal>
              {isSubmitting ? (
                <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent border-b-transparent animate-spin mx-auto"></div>
              ) : (
                "Invite member"
              )}
            </ButtonModal>
          </form>
        </Modal>
      </header>
    </>
  );
};

export default Header;
