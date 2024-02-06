import ProductsHeader from "./ProductsHeader";
import ProductBasket from "../assets/productBasket.svg";
import Pagination from "../assets/pagination.svg";
import CloseImage from "../assets/close.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   const GetProducts = async () => {
  //     console.log("start getting");
  //     try {
  //       const response = await axios.get(
  //         "https://taskapi.hiweb.ir/api/General/Product/ProductList?count=50&skip=0",
  //         {
  //           headers: {
  //             accept: "application/json",
  //           },
  //         }
  //       );

  //       const data = await response.data;
  //       console.log(data);
  //     } catch (error) {
  //       // do not forgot to error handling!!
  //       console.error("Error:", error);
  //     }
  //   };

  //   GetProducts();
  // }, []);

  const AddProduct = async () => {
    console.log("start creating post");
    try {
      const response = await axios.post(
        "https://taskapi.hiweb.ir/api/General/Product/AddProduct",
        {
          ProductTitle: title,
          ProductPrice: price,
          Description: description,
          file: file,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.data;
      console.log(data);
    } catch (error) {
      // do not forgot to error handling!!
      console.error("Error:", error);
      alert("مشکلی پیش آمده لظفا دوباره تلاش کنید");
    }
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 630,
    height: 640,
    bgcolor: "#FFFFFF",
    borderRadius: "16px",
    outline: "none",
    fontFamily: "Vazirmatn",
  };

  return (
    <div className="max-w-[1440px] w-full h-screen flex flex-col">
      <ProductsHeader setOpen={setOpen} />
      <div className="w-full h-full flex justify-center items-center">
        <img src={ProductBasket} />
      </div>
      <div className="h-[104px] flex items-center justify-between border-t border-t-[#A0A0A0]">
        <img src={Pagination} />
      </div>

      {/* Modal add product */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-full h-full flex items-center justify-center rounded-2xl relative">
              <img
                src={CloseImage}
                onClick={handleClose}
                className="absolute left-5 top-5 cursor-pointer"
              />
              <div className="h-[570px] w-[340px] flex flex-col gap-5">
                <div className="h-[25px] w-full flex items-end justify-end text-base font-normal text-black">
                  افزودن محصول
                </div>
                <div className="h-[78px] w-full">
                  <div className="w-full h-full flex flex-col max-sm:w-[260px]">
                    <div className="h-[33px] flex justify-end text-base font-normal text-[#A0A0A0]">
                      نام محصول
                    </div>
                    <input
                      type="text"
                      placeholder="نام محصول..."
                      className="h-[48px] w-full rounded-lg pr-4 text-sm font-normal outline-none border border-[#9A9A9A]"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="h-[78px] w-full">
                  <div className="w-full h-full flex flex-col max-sm:w-[260px]">
                    <div className="h-[33px] flex justify-end text-base font-normal text-[#A0A0A0]">
                      قیمت محصول
                    </div>
                    <input
                      type="text"
                      placeholder="قیمت محصول..."
                      className="h-[48px] w-full rounded-lg pr-4 text-sm font-normal outline-none border border-[#9A9A9A]"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="h-[151px] w-full">
                  <div className="w-full h-full flex flex-col max-sm:w-[260px]">
                    <div className="h-[33px] flex justify-end text-base font-normal text-[#A0A0A0]">
                      توضیحات
                    </div>
                    <textarea
                      placeholder="..."
                      className="h-[121px] w-full rounded-lg pr-4 text-sm font-normal outline-none border border-[#9A9A9A] resize-none"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="h-[78px] w-full">
                  <div className="w-full h-full flex flex-col max-sm:w-[260px]">
                    <div className="h-[33px] flex justify-end text-base font-normal text-[#A0A0A0]">
                      بارگذاری عکس محصول
                    </div>
                    <input
                      type="file"
                      className="h-[48px] w-full rounded-lg pr-4 text-sm font-normal outline-none border border-[#9A9A9A] block text-slate-500
                      file:h-full file:rounded-lg file:border-none file:bg-[#C9C9C9] file:text-[#5C5C5C] cursor-pointer"
                    />
                  </div>
                </div>
                <div className="h-[47px] w-full flex">
                  <button className="w-1/2 h-full flex justify-center items-center bg-[#46B666] rounded-lg text-base font-normal text-white">
                    ثبت محصول
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-1/2 h-full flex justify-center items-center bg-white rounded-lg text-base font-normal"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
