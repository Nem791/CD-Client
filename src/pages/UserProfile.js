import React from "react";
import Header from "../components/common/Header";

import NavLeft from "../components/nav/NavLeft";
import NavMiddle from "../components/nav/NavMiddle";
import NavRight from "../components/nav/NavRight";

const UserProfile = () => {
  return (
    <div className="bg-[#f6f7fb]">
      <Header></Header>
      <div className="pt-[64px] w-full flex h-full">
        {/* Left */}
        <NavLeft></NavLeft>

        {/* Middle */}
        <NavMiddle></NavMiddle>

        {/* Right */}
        <NavRight></NavRight>
      </div>
    </div>
  );
};

export default UserProfile;
