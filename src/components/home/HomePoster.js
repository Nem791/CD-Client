import React from "react";

import PosterGirl from "../../assets/img/home/poster-girl2.png";
import logo from "../../assets/img/home/logo-wordup-verticle.png";

const HomePoster = () => {
  return (
    <nav className="w-full bg-primary p-[64px]">
      <div className="mt-[64px] w-full h-full z-2 flex items-center justify-between">
        <div>
          <h1 className="max-w-[600px] text-[60px] font-bold leading-[70px]">
            Study anytime, wherever you are
          </h1>

          <h3 className="mt-[28px] text-[20px] tracking-[1px]">
            📚 Study any subject you want form hundreds of courses with Wordup
            📚
          </h3>
          <div className="mt-[70px] pt-[20px] flex gap-10 items-center bg-white justify-center rounded-[40px] h-[180px] justify-items-center">
            <div className="flex items-center flex-col">
              <div>
                <span className="text-[70px] font-bold tracking-1">50</span>
                <span className="font-semibold text-[40px] tracking-1">+</span>
              </div>
              <div className="mt-[10px] text-[16px]">Career Courses</div>
            </div>
            <div className="flex items-start flex-col">
              <div>
                <span className="text-[70px] font-bold tracking-1">1M</span>
                <span className="font-semibold text-[40px]">+</span>
              </div>
              <div className="mt-[10px] text-[16px]">Our Students</div>
            </div>
            <div className="flex items-center flex-col">
              <div>
                <span className="text-[70px] font-bold">90</span>
                <span className="font-semibold text-[40px]">+</span>
              </div>
              <div className="mt-[10px] text-[16px]">Lecture views</div>
            </div>
            <button className="bg-black px-4 py-4 rounded-lg text-white text-[20px]">
              Get Started
            </button>
          </div>
        </div>
        <div>
          <div
            style={{
              width: "500px",
              height: "600px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              background: "white",
            }}
          >
            <img
              src={PosterGirl}
              alt="poster-girl"
              className="h-[600px] w-[500px] rounded-[1.5rem] object-cover block"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomePoster;
