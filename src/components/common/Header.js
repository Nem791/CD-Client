import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import logo from "../../assets/img/home/logo.png";

import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import { SmallButton } from "../button";
import { UserIcon } from "../box";
import axios from "axios";

import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";

import { domain } from "../../shared/utils/common";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin, user } = useAuthStateChanged();

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
  ];

  let navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required("Please enter your email."),
  });
  const {
    formState: { isValid },
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
      </header>
    </>
  );
};

export default Header;
