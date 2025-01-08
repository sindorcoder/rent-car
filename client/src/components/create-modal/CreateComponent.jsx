import { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import BasicInformations from "../../components/stepOne/stepOne";
import VisualInformations from "../../components/stepTwo/stepTwo";
import TechnicalInformations from "../../components/stepThree/stepThree";
import Footer from "../footer/Footer";
import { useSendCarFormMutation } from "../../redux/api/cars-api"
import { useLocation, useNavigate } from "react-router-dom";
import { useGetDetailsCarMutation, useUpdateCarsMutation } from "../../redux/api/cars-api";

const steps = [
  {
    title: "Basic Information",
    content: (carData, setCarData) => <BasicInformations carData={carData} setCarData={setCarData} />,
  },
  {
    title: "Visual and Pricing Information",
    content: (carData, setCarData) => <VisualInformations carData={carData} setCarData={setCarData} />,
  },
  {
    title: "Technical Information",
    content: (carData, setCarData) => <TechnicalInformations carData={carData} setCarData={setCarData} />,
  },
];

const Create = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const [getDetailsCar, { data: carDataInfo }] = useGetDetailsCarMutation();
  const [updateCars, { data: updateData, isSuccess: updateSuccess }] = useUpdateCarsMutation();
  const [current, setCurrent] = useState(0);
  const [sendCarForm, { data, isSuccess }] = useSendCarFormMutation();
  const [carData, setCarData] = useState({
    name: "",
    images: [],
    description: "",
    category: "",
    model: "",
    color: "",
    transmission: "",
    status: "active",
    seats: null,
    year: null,
    fuel: null,
    price: null,
    rent_price: null,
    discount: null,
    thumbnail: null,
    usage_per_km: null
  });

  const expectedFields = [
    
    "name",
    "images",
    "description",
    "category",
    "model",
    "color",
    "transmission",
    "status",
    "seats",
    "year",
    "fuel",
    "price",
    "rent_price",
    "discount",
    "thumbnail",
    "usage_per_km"
  ];


  useEffect(() => {
    if (state?.id) {
      getDetailsCar(state?.id);
    }
  }, [state?.id]);

  useEffect(() => {
    if (carDataInfo?.payload && pathname === "/edit/") {
      setCarData({ ...carDataInfo?.payload });
    }
  }, [carDataInfo, pathname]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleSendForm = () => {
    const filteredCarData = Object.fromEntries(
      Object.entries(carData).filter(([key]) => expectedFields.includes(key))
    );

    if (carDataInfo?.payload && pathname === "/edit/") {
      updateCars({ body: filteredCarData, id: carDataInfo?.payload?._id });
    } else {
      sendCarForm(filteredCarData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success(data?.message),
        setTimeout(() => {
          navigate("/dashboard/cars");
        }, 1200);
    }
  }, [isSuccess]);
  
  useEffect(() => {
    if (updateSuccess && updateData) {
      message.success(updateData?.message),
        setTimeout(() => {
          navigate("/dashboard/cars");
        }, 1200);
    }
  }, [updateSuccess, updateData]);

  return (
    <>
      <div className="container flex items-center justify-center pt-[50px]">
        <div className="flex flex-col justify-between shadow-cm gap-10 rounded-xl w-full max-w-[1000px] bg-white p-10 lg:flex-row">
          <div className="flex h-auto flex-col justify-between lg:flex-1">
            <Steps current={current} items={items} className="mb-10" />

            <div className="flex h-auto flex-1 flex-col justify-between">
              <div>{steps[current].content(carData, setCarData)}</div>

              <div className="mt-10 flex justify-end space-x-3">
                {current > 0 && (
                  <Button className="bg-gray-700 text-white" size="large" onClick={() => prev()}>
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 ? (
                  <Button
                    size="large"
                    onClick={() => next()}
                    className="bg-[#000064] text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleSendForm}
                    className="bg-green-500"
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Create;
