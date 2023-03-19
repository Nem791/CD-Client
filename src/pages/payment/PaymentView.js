import React from "react";
import Header from "../../components/common/Header";
import logo from "../../assets/img/home/logo.png";
import PlanItems from "./component/PlanItems";

const PaymentView = () => {
  return (
    <div>
      <Header></Header>
      <div className="p-[64px]">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <div className="">
            <img src={logo} alt="logo" className="h-[80px]" />
          </div>
          <div>
            <p className="font-semibold text-[40px] mt-[18px]">
              Choose your plan with us!
            </p>
            <p className="mt-[30px] text-[18px] text-gray-400 tracking-widest">
              Which plan options fits you best?
            </p>
          </div>
        </div>
      </div>
      {/* Plan */}
      <div className="flex items-center justify-center gap-5">
        <PlanItems type="basic"></PlanItems>
        <PlanItems isPopular type="pro"></PlanItems>
        <PlanItems type="enterprise"></PlanItems>
      </div>
    </div>
  );
};

export default PaymentView;
