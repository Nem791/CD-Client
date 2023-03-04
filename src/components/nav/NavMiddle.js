import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/profile/dashboard/Dashboard";
import MySet from "../../pages/profile/myset/MySet";
import Schedule from "../../pages/profile/schedule/Schedule";

const NavMiddle = () => {
  return (
    <div className="max-w-[60%] w-full p-[40px] bg-[#fff]">
      <Routes>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/mySet" element={<MySet></MySet>}></Route>
        <Route path="/schedule" element={<Schedule></Schedule>}></Route>
      </Routes>
    </div>
  );
};

export default NavMiddle;
