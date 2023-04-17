import React, { useState } from "react";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import Header from "../../components/common/Header";
import { Navigate } from "react-router-dom";
import {
  BellIcon,
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/solid";
import UserList from "./components/user-list";

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
      <UserCircleIcon className="w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer" />
    ),
    component: UserList,
  },
  {
    title: "Sets management",
    key: siderbarKey.set,
    icon: (
      <AdjustmentsHorizontalIcon className="w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer" />
    ),
    component: UserList,
  },
  {
    title: "Quizs management",
    key: siderbarKey.quiz,
    icon: (
      <Bars3BottomLeftIcon className="w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer" />
    ),
    component: UserList,
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
      <div className="pt-[64px]">
        <aside
          id="default-sidebar"
          className=" z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {sidebarConfig.map((item) => {
                return (
                  <li
                    key={item.title}
                    className="flex "
                    onClick={() => setCurrentPage(item.key)}
                  >
                    <>{item.icon}</>
                    <span className="ml-3">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">
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
