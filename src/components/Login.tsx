import React from "react";
import loginImage from "../assets/login.png";
import HiwebImage from "../assets/hiweb.png";

export default function Login() {
  return (
    <main className="max-w-[1440px] w-full h-screen flex max-md:flex-col max-md:justify-center max-md:items-center max-sm:flex-col max-sm:justify-center max-sm:items-center">
      <div className="h-full w-2/5 flex flex-col justify-center items-center gap-14 xl:w-2/4 lg:w-2/3 md:w-3/4">
        <img src={HiwebImage} width={"136px"} height={"91px"} />
        <div className="w-[482px] h-[437px] flex justify-center items-center rounded-2xl bg-white border border-[#9A9A9A] max-sm:w-[300px]">
          <div className="h-[321px] w-[386px] flex flex-col gap-7 max-sm:justify-center max-sm:items-center">
            <div className="w-full h-[81px] flex flex-col max-sm:w-[260px]">
              <div className="h-[33px] flex justify-end text-base font-normal text-[#A0A0A0]">
                نام کاربری
              </div>
              <input
                type="text"
                placeholder="نام کاربری..."
                className="h-[48px] w-full rounded-lg pr-4 text-sm font-normal outline-none border border-[#9A9A9A]"
                dir="rtl"
              />
            </div>
            <div className="w-full h-[81px] flex flex-col max-sm:w-[260px]">
              <div className="h-[33px] flex justify-end text-base font-normal text-[#A0A0A0]">
                کلمه عبور
              </div>
              <input
                type="password"
                placeholder="کلمه عبور..."
                className="h-[48px] w-full rounded-lg pr-4 text-sm font-normal outline-none border border-[#9A9A9A]"
                dir="rtl"
              />
            </div>
            <div className="w-full h-[28px] flex justify-end gap-2 max-sm:w-[260px]">
              <p className="text-base font-medium text-[#00ACED]">
                مرا به خاطر بسپار
              </p>
              <input type="checkbox" />
            </div>
            <div className="w-full h-[47px] flex justify-center items-center rounded-lg cursor-pointer bg-[#46B666] max-sm:w-[260px]">
              <p className="text-base font-normal text-[#FFFFFF]">ورود</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-3/5 flex justify-center items-center">
        <img src={loginImage} width={"100%"} />
      </div>
    </main>
  );
}
