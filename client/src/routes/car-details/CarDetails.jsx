import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCarsQuery,
  useGetDetailsCarMutation,
} from "../../redux/api/cars-api";
import { useState, useEffect } from "react";
import { Container } from "../../utils";
import reviews from "../../images/Reviews.svg";
import Cards from "../../components/cards/Cards";
import Footer from "../../components/footer/Footer"
import { CarCardFillHeart } from "../../images/svgs";
import { Button } from "antd";
const CarDetails = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [getDetailsCar, { data: payload }] = useGetDetailsCarMutation();
  const { data, loading } = useGetCarsQuery();

  useEffect(() => {
    getDetailsCar(id).then((response) => {
      setSelectedImage(response?.data?.payload?.images[0]);
    });
  }, [id, getDetailsCar]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleOrders = (data) => {
    navigate("/orders", { state: data });
  }

  return (

  <>
    <Container>
      <div>

        <div className="flex-col lg:flex-row flex gap-14 my-[80px]">
          <div className="w-full bg-gray-300 p-2 rounded-2xl">

            <div>

              <div className="bg-gray-100 max-h-[430px] p-2 w-full items-center flex justify-center  rounded-xl">
                <img
                  className="rounded-xl w-full h-[430px] object-contain"
                  src={selectedImage}
                  alt={payload?.payload?.name}
                />
              </div>
              {
                payload?.payload?.images.length > 1 && (
                  
              <div className="flex gap-2 overflow-x-auto my-5">
              {payload?.payload?.images.map((image, index) => (
                <img
                  width={200}
                  key={index}
                  src={image}
                  alt={payload?.payload?.name}
                  onClick={() => handleImageClick(image)}
                  className={`cursor-pointer object-contain rounded-2xl p-2 ${
                    image === selectedImage
                      ? " rounded-2xl p-2 bg-blue-800 "
                      : ""
                  }`}
                />
              ))}
            </div>
                )
              }
            </div>
          </div>
          <div className="shadow-cm p-[24px] w-full  rounded-xl">

            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[32px] font-bold">
                  {payload?.payload?.name}
                </h2>
                <img src={reviews} alt="reviews" />
              </div>
              <div className="cursor-pointer mt-[10px]">
                <CarCardFillHeart />
              </div>
            </div>
            <div className="my-[32px]">
              <p>{payload?.payload?.description.slice(0, 195) + "..."}</p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex  gap-[44px]">
                <div className="flex w-full  gap-5">
                  <span className="text-[20px] w-full  text-[#90A3BF] font-normal tracing-[-2%]">
                    Car Model
                  </span>
                  <span className="text-[20px] w-full  text-[#596780] leading-[30px] tracing-[-2%] font-semibold">
                    {payload?.payload?.model}
                  </span>
                </div>

                <div className="flex gap-5 w-full">
                  <span className="text-[20px] w-full  text-[#90A3BF] font-normal tracing-[-2%]">
                    Capacity
                  </span>
                  <span className="text-[20px] w-full  text-[#596780] leading-[30px] tracing-[-2%] font-semibold">
                    {payload?.payload?.seats}
                  </span>
                </div>
              </div>

              <div className="flex gap-[44px]">
                <div className="flex gap-5 w-full">
                  <span className="text-[20px] w-full  text-[#90A3BF] font-normal tracing-[-2%]">
                    Steering{" "}
                  </span>
                  <span className="text-[20px] w-full  text-[#596780] leading-[30px] tracing-[-2%] font-semibold">
                    {payload?.payload?.transmission}
                  </span>
                </div>

                <div className="flex gap-5 w-full">
                  <span className="text-[20px] w-full  text-[#90A3BF] font-normal tracing-[-2%]">
                    Gasoline{" "}
                  </span>
                  <span className="text-[20px] w-full  text-[#596780] leading-[30px] tracing-[-2%] font-semibold">
                    {payload?.payload?.capacity_fuel}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-[68px] flex justify-between items-center">
              <div className="flex flex-col">
                <h2 className="text-[32px] font-bold">
                  ${payload?.payload?.price}/
                  <span className="text-[#90A3BF] text-[16px]">days</span>
                </h2>
                <span className="text-[16px] font-bold text-[#90A3BF]">
                  $<s>{payload?.payload?.rent_price}.00</s>
                </span>
              </div>
              <div>
                <Button type="primary" onClick={() => handleOrders(payload?.payload)} className="mt-2 flex max-w-max rounded bg-blue-600 px-8 py-[30px] text-center text-base font-semibold leading-normal text-white">
                  Rent Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cards
        data={data}
        loading={loading}
        title="Recommended cars"
        slice={8}
        className="grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"
      />

      <div className=" flex w-full justify-center mt-[80px]">
        <Button
          type="primary"
          className="px-10 py-6"
          onClick={() => navigate("/categories")}
        >
          Show More
        </Button>
      </div>
    </Container>
    <Footer/>
  </>
  );
};

export default CarDetails;
