import React from "react";
import Navbar from "./Navbar";
import backgroundImage from "./assets/final11234.png";

export const HomePage = () => {
  return (
    <>
      <Navbar />
      <div
        className="items-center p-[100px] flex flex-col place-content-center m-[100px]"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }} // Set the background image
      >
        <div className=" items-center p-[100px] flex gap-[140px] place-content-center m-[50px]">
          <a
            href="VideoInput"
            className="bg-slate-700 w-[170px] p-2 text-white rounded-md text-center"
          >
            Violation Detection
          </a>
          <br />
          <a className="bg-slate-700 w-[170px] p-2 text-white rounded-md text-center">
            Violation Avoidance
          </a>
        </div>
      </div>
    </>
  );
};
