import React, { useState } from "react";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import Header from "../../components/common/Header";
import { Navigate } from "react-router-dom";
import {
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/solid";
import UserList from "./components/user-list";
import Setlist from "./components/set-list";
import Quizlist from "./components/quiz-list";
import clsx from "clsx";

export const siderbarKey = {
  user: "user",
  set: "set",
  quiz: "quizz",
};

export const sidebarConfig = [
  {
    title: "User List",
    key: siderbarKey.user,
    icon: (
      <UserCircleIcon  className="w-8 h-8 text-[#586380] hover:opacity-[0.5] cursor-pointer" />
    ),
    component: UserList,
  },
  {
    title: "Sets management",
    key: siderbarKey.set,
    icon: (
      <AdjustmentsHorizontalIcon className="w-8 h-8 text-[#586380] hover:opacity-[0.5] cursor-pointer" />
    ),
    component: Setlist,
  },
  {
    title: "Quizs management",
    key: siderbarKey.quiz,
    icon: (
      <Bars3BottomLeftIcon className="w-8 h-8 text-[#586380] hover:opacity-[0.5] cursor-pointer" />
    ),
    component: Quizlist,
  },
];

export const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(siderbarKey.user);
  const { user } = useAuthStateChanged();
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  // if (user?.role !== "admin") {
  //   return <Navigate to="/" />;
  // }
  return (
    <div>
      <Header />
      <div className="pt-[64px] flex w-[80%] mx-auto">
        <div className="  w-[300px] h-screen transition-transform -translate-x-full sm:translate-x-0 flex">
          <div className="h-full px-3 w-[300px] py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <div className="space-y-2 font-medium">
              {sidebarConfig.map((item) => {
                return (
                  <div
                    key={item.title}
                    className={clsx("flex cursor-pointer p-4 rounded-lg"  , item.key === currentPage && 'bg-slate-300   ') }
                    onClick={() => {
                      console.log("helllo");
                      setCurrentPage(item.key);
                    }}
                  >
                    <>{item.icon}</>
                    <span className="ml-3 text-lg">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full">
          {sidebarConfig
            .filter((item) => item.key === currentPage)
            .map((item) => {
              return <item.component key={item.key} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
