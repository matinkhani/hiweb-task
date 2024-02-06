import { useState } from "react";
import loginImage from "../assets/login.png";
import HiwebImage from "../assets/hiweb.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ReduxToolkit/Store";
import Loading from "./Loading";
import LoginForm from "./LoginForm";
import Success from "./Success";
import { getUserName } from "../ReduxToolkit/Reducer";

export default function Login() {
  const [passWord, setPassWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const select = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  let accessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const HandleLoginRequest = async () => {
    console.log("start logging in");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://taskapi.hiweb.ir/api/Security/UserLogin/Login",
        {
          userName: select.userName,
          passWord: passWord,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      const data = await response.data;
      localStorage.setItem("accessToken", data.data.accessToken?.access_token);
      localStorage.setItem(
        "refreshToken",
        data.data.accessToken?.refresh_token
      );
      navigate("/products");
      console.log(data);
      console.log("accessToken", data.data.accessToken?.access_token);
      console.log("refreshToken", data.data.accessToken?.refresh_token);
    } catch (error) {
      // do not forgot to error handling!!
      console.error("Error:", error);
      dispatch(getUserName(""));
      setLoading(false);
      setPassWord("");
      alert("مشکلی پیش آمده لظفا دوباره تلاش کنید");
    }
  };

  let refreshToken = localStorage.getItem("refreshToken");

  const HandleRefreshToken = async () => {
    console.log("start refreshing token");
    try {
      const response = await axios.post(
        "https://taskapi.hiweb.ir/api/Security/UserLogin/RefreshToken",
        {
          userName: select.userName,
          refreshToken: refreshToken,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      localStorage.setItem("accessToken", data.data.accessToken?.access_token);
      localStorage.setItem(
        "refreshToken",
        data.data.accessToken?.refresh_token
      );
      console.log(data);
      console.log("accessToken", data.data.accessToken?.access_token);
      console.log("refreshToken", data.data.accessToken?.refresh_token);
    } catch (error) {
      // do not forgot to error handling!!
      console.error("Error:", error);
    }
  };

  return (
    <main className="max-w-[1440px] w-full h-screen flex max-md:flex-col max-md:justify-center max-md:items-center max-sm:flex-col max-sm:justify-center max-sm:items-center">
      <div className="h-full w-2/5 flex flex-col justify-center items-center gap-14 xl:w-2/4 lg:w-2/3 md:w-3/4">
        <img
          src={HiwebImage}
          width={"136px"}
          height={"91px"}
          alt="hiweb logo"
        />
        <div className="w-[482px] h-[437px] flex flex-col justify-center items-center rounded-2xl bg-white border border-[#9A9A9A] max-sm:w-[300px]">
          {success && <Success />}
          {loading ? (
            <Loading />
          ) : (
            <LoginForm
              passWord={passWord}
              setPassWord={setPassWord}
              HandleLoginRequest={HandleLoginRequest}
            />
          )}
        </div>
      </div>
      <div className="h-full w-3/5 flex justify-center items-center">
        <img src={loginImage} width={"100%"} alt="login image" />
      </div>
    </main>
  );
}
