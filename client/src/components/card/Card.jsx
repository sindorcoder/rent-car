import { AiOutlineHeart } from "react-icons/ai"; 
/* eslint-disable react/prop-types */
import {
  // CarCardFillHeart,
  CarCardGasoline,
  CarCardManuals,
  CarCardPeople,
} from "../../images/svgs";
import { Link } from "react-router-dom";
// import {  useSelector } from "react-redux";
const CarCard = ({car}) => {
  // const {user} = useSelector(state => state.auth)

  const handleLikeCars = (car) => {
    console.log(car);
    // car.user_id.includes(user._id) ? console.log("already liked") : console.log("liked")
  }

  return (
    <div className="rounded-[10px] bg-white p-6 shadow-lg transition hover:shadow-2xl">
      <div className="flex w-full mb-3 items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">{car.name}</span>
          <span className="text-sm font-bold text-[#90a3bf]">{car.model}</span>
        </div>
        <button onClick={() =>  handleLikeCars(car)} className="w-[40px] h-[40px] flex items-center justify-center rounded-full shadow-cm ">
          {/* <CarCardFillHeart /> */}
          <AiOutlineHeart size={24} />
        </button>
      </div>

      <div className="flex h-[190px] w-full items-center justify-center">
        <img
          className="object-contain"
          src={car.thumbnail}
          alt="Car"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1">
          <CarCardGasoline />
          <span className="text-sm font-medium text-[#90a3bf]">
            40L
          </span>
        </span>
        <span className="flex items-center gap-1">
          <CarCardManuals />
          <span className="text-sm font-medium text-[#90a3bf] capitalize">
            {car.transmission}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <CarCardPeople />
          <span className="text-sm font-medium text-[#90a3bf]">
            {car.seats} People
          </span>
        </span>
      </div>

      <div className="mt-6 flex w-full items-center justify-between">
        <div className="flex items-end gap-1">
          <span className="text-xl font-bold text-[#1a202c]">${car.rent_price}</span>
          <span className="text-xl font-bold text-[#1a202c]">/</span>
          <span className="text-sm font-bold text-[#90a3bf]">day</span>
        </div>
        <Link
          to={`/details/${car._id}`}
          className="mt-2 flex max-w-max rounded bg-blue-600 px-5 py-[10px] text-center text-base font-semibold leading-normal text-white"
        >
          Car Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
