import ProductsHeader from "./ProductsHeader";
import ProductBasket from "../assets/productBasket.svg";
import CloseImage from "../assets/close.svg";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import NextLable from "../assets/next.svg";
import PreviousLable from "../assets/previous.svg";
import { RootState } from "../ReduxToolkit/Store";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

interface ProductList {
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  rate: number;
  title: string;
  view: number;
}

export default function Products() {
  const [products, setProducts] = useState<ProductList[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const loggedInState = useSelector((state: RootState) => state.loggedin);

  const navigate = useNavigate();

  const GetProducts = async () => {
    console.log(loggedInState);
    setLoading(true);
    if (loggedInState === true) {
      try {
        const response = await axios.get(
          `https://taskapi.hiweb.ir/api/General/Product/ProductList?count=8`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.data;
        console.log(data.data.list);
        setProducts(data.data.list);
        console.log(products);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else if (loggedInState === undefined) {
      <Loading />;
    } else if (loggedInState === false) {
      navigate("/login");
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const HandlePagination = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://taskapi.hiweb.ir/api/General/Product/ProductList?count=8&skip=${
          page * 8
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.data;
      console.log(data.data.list);
      setProducts(data.data.list);
      console.log(products);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    HandlePagination();
  }, [page]);

  const HandlePrevPage = () => {
    if (page <= 0) {
      setPage(0);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  const HandleNextPage = () => {
    if (page >= 3) {
      setPage(0);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    setFile(image);
  };

  const AddProduct = async () => {
    if (
      title !== "" &&
      price !== 0 &&
      description !== "" &&
      file !== undefined
    ) {
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
              accept: "text/plain",
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const data = await response.data;
        console.log(data);
        setOpen(false);
        alert("محصول شما با موفقیت ثبت شد");
      } catch (error) {
        console.error("Error:", error);
        alert("مشکلی پیش آمده لطفا دوباره تلاش کنید");
      }
    } else {
      alert("لطفا مشخصات محصول را کامل و درست وارد نمایید");
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
      <div className="w-full h-[100vh] flex justify-center items-center">
        {products.length === 0 ? (
          <img src={ProductBasket} />
        ) : (
          <div className="w-full min-h-[85vh] h-[100%] flex justify-center items-center gap-4 flex-wrap">
            {loading ? (
              <h1>لطفا منتظر بمانید</h1>
            ) : (
              products.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="w-[348px] h-[300px] flex flex-col rounded-lg shadow-xl shadow-[#0000001A] bg-white"
                  >
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className="w-full h-[50%] rounded-lg bg-cover bg-no-repeat"
                    ></div>
                    <div className="w-full h-[50%] flex flex-col rounded-br-lg rounded-bl-lg bg-white">
                      <div className="w-full text-right p-2 text-base font-medium text-black">
                        {item.title}
                      </div>
                      <div className="w-full text-right p-2 text-sm font-extralight text-[#5C5C5C]">
                        {item.description}
                      </div>
                      <div className="w-full text-right p-1">
                        {item.price} قیمت
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className="h-[104px] flex items-center justify-between border-t border-t-[#A0A0A0]">
        <div className="w-fit flex justify-around gap-4">
          <img
            onClick={HandlePrevPage}
            height={18}
            width={18}
            src={PreviousLable}
            className="h-[30px] w-[30px] rounded-md flex justify-center items-center border border-[#c9c9c9] cursor-pointer"
          />
          <p className="h-[30px] w-[30px] rounded-md flex justify-center items-center border border-[#c9c9c9] cursor-pointer">
            {page + 1}
          </p>
          <img
            onClick={HandleNextPage}
            height={18}
            width={18}
            src={NextLable}
            className="h-[30px] w-[30px] rounded-md flex justify-center items-center border border-[#c9c9c9] cursor-pointer"
          />
        </div>
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                      value={price === 0 ? "" : price}
                      onChange={(e) => setPrice(Number(e.target.value))}
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
                      className="h-[121px] w-full rounded-lg pr-4 pt-4 pl-4 text-sm font-normal outline-none border border-[#9A9A9A] resize-none"
                      dir="rtl"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
                <div className="h-[47px] w-full flex">
                  <button
                    onClick={AddProduct}
                    className="w-1/2 h-full flex justify-center items-center bg-[#46B666] rounded-lg text-base font-normal text-white"
                  >
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
