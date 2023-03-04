import React from "react";
import ResetLayout from "../components/layout/ResetLayout";
import emailIcon from "../assets/img/icon/icon-mail.png";
import { ButtonSubmit } from "../components/button";

const CheckMailPage = () => {
  return (
    <ResetLayout
      icon={emailIcon}
      header="Check your email"
      subHeader="We sent a password reset link to your email."
    >
      <form className="mt-[20px]">
        <a
          href="https://mail.google.com"
          className={`px-[15px] py-[10px] bg-[#90b498] color-white flex items-center justify-center w-full text-white text-lg mt-[40px] rounded-md mb-[30px]`}
        >
          Open email app
        </a>
      </form>
    </ResetLayout>
  );
};

export default CheckMailPage;
