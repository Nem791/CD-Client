import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../modal";

import { ButtonModal, SmallButton } from "../button";
import { Notification, UserIcon } from "../box";
import logo from "../../assets/img/home/logo-wordup.png";
// import logo from "../../assets/img/home/logo.png";

import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import axios from "axios";

import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";
// import { connectWithSocketServer } from "../../realtimeCommunication/socketConnection";
import FriendInvitation from "../box/FriendInvitation";
import MessageList from "../box/MessageList";
import { setShowInvitationBox } from "../../store/show/showSlice";

import { domain } from "../../shared/utils/common";
import { InputModal } from "../input";
import { socket } from "../../App";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin, user } = useAuthStateChanged();

  const { showInvitationBox } = useSelector((state) => state.show);

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
      to: `/leaderboard`,
      title: "Leaderboard",
    },
    {
      id: 4,
      to: `/quiz`,
      title: "Quiz",
    },
    {
      id: 5,
      to: `/review-set`,
      title: "Review",
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

  const fakeEmit = () => {
    socket.emit("room-join", { data: "asdasd" });
  };

  fakeEmit();

  const handleAlert = () => {
    dispatch(setShowAlert(true));
    dispatch(setMessage("You are not logged in! Please log in to get access."));
    dispatch(setType("notice"));
  };

  // useEffect(() => {
  //   if (isLogin) {
  //     connectWithSocketServer(user, dispatch);
  //   }
  // }, [isLogin, user, dispatch]);

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

  return (
    <>
      <header className="max-h-[63px] flex items-center justify-between py-[15px] px-[20px] fixed bg-white z-20 w-full border border-b-[0.0625rem] solid">
        {/* Header left */}
        <div className="flex items-center">
          <Link to="/">
            {/* <img src={logo} alt="logo" className="h-[48px]" /> */}
            <img src={logo} alt="logo" className="h-[180px] " />
          </Link>
          <ul className="lg:flex hidden text-[16px] font-medium text-[#2e3856] items-center">
            {ListLink.map((link) => (
              <li className="ml-[16px] text-[#1e1c1c]" key={link.id}>
                <Link to={link.to}>{link.title}</Link>
              </li>
            ))}
            <MessageList></MessageList>
            <li>
              <SmallButton
                className="text-white bg-primary hover:bg-secondary relative"
                onClick={isLogin ? goToSetPage : handleAlert}
              >
                <span>Create</span>
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
