import React from "react";

import AuthLeft from "./AuthLeft";

const Layout = ({ children }) => {
  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 overflow-hidden">
      <AuthLeft></AuthLeft>
      {children}
    </div>
  );
};

export default Layout;
