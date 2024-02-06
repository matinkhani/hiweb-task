export default function Success() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#57B872]">
        <div className="w-6 h-3 border-t-2 border-r-2 transform rotate-[135deg] border-white rounded-sm mb-1"></div>
      </div>
      <p className="text-sm font-medium text-[#46B666] leading-7">
        .ورود شما با موفقیت انجام شد
      </p>
    </div>
  );
}
