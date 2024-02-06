import { useSelector } from "react-redux";
import LogoutImage from "../assets/logout.svg";
import PlusImage from "../assets/plus.svg";
import { RootState } from "../ReduxToolkit/Store";
import { logout } from "../PathRestriction/useAuth/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProductsHeader({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const select = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  return (
    <div className="h-[104px] flex items-center justify-between border-b border-b-[#A0A0A0]">
      <div className="w-[510px] h-full flex items-center justify-center gap-6">
        <div
          onClick={() => {
            logout(navigate);
          }}
          className="w-[60px] flex items-center justify-around cursor-pointer"
        >
          <p className="text-sm font-normal text-[#FF6666]">خروج</p>
          <img src={LogoutImage} alt="logout" />
        </div>
        <div className="min-w-[136px] h-full flex items-center justify-center text-base font-normal text-[#5C5C5C]">
          {select.userName}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-[266px] h-[47px] flex items-center justify-center gap-3 bg-[#46B666] rounded-lg"
        >
          <p className="text-base font-normal text-white">افزودن محصول</p>
          <img src={PlusImage} alt="add" height={18} width={18} />
        </button>
      </div>
      <div className="w-[121px] h-full flex items-center justify-center text-lg font-bold text-[#5C5C5C]">
        لیست محصولات
      </div>
    </div>
  );
}
