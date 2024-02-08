import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ReduxToolkit/Store";
import { getUserName } from "../ReduxToolkit/Reducer";

export default function LoginForm({
  passWord,
  setPassWord,
  HandleLoginRequest,
}: {
  passWord: string;
  setPassWord: React.Dispatch<React.SetStateAction<string>>;
  HandleLoginRequest: () => Promise<void>;
}) {
  const userName = useSelector((state: RootState) => state.userName);
  const dispatch = useDispatch();

  return (
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
          value={userName}
          onChange={(e) => {
            dispatch(getUserName(e.target.value));
          }}
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
          value={passWord}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
          maxLength={6}
          required
        />
      </div>
      <div className="w-full h-[28px] flex justify-end gap-2 max-sm:w-[260px]">
        <p className="text-base font-medium text-[#00ACED]">
          مرا به خاطر بسپار
        </p>
        <input type="checkbox" />
      </div>
      <button
        className="w-full h-[47px] flex justify-center items-center rounded-lg bg-[#46B666] max-sm:w-[260px]"
        onClick={HandleLoginRequest}
      >
        <p className="text-base font-normal text-[#FFFFFF]">ورود</p>
      </button>
    </div>
  );
}
