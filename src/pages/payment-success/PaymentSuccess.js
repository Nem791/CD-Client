import React from "react";
import Header from "../../components/common/Header";
import PaymentImg from "../../assets/img/payment/payment.jpg";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      <Header></Header>
      <div className="p-[64px] flex justify-center items-center flex-col">
        <div>
          <img src={PaymentImg} alt="errorImg" className=" h-[400px]" />
        </div>
        <h1 className="mt-5 text-[#6bceb1] tracking-[2px] font-semibold text-center text-[40px]">
          Your Payment is Successful
        </h1>
        <p className="mt-5 text-[14px] text-center tracking-wider max-w-[600px]">
          Thank you for your payment. An automated payment receipt will be sent
          to your registered email!
        </p>
        <button className="mt-10 border border-[#4a4a4a] px-8 py-4 font-medium text-[20px] rounded-[80px] hover:scale-110 transition-all ease-linear">
          <Link to={"/"}>Back to home</Link>
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
