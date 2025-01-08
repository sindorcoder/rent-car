import Cars from "../../components/cards/Cards";
import Footer from "../../components/footer/Footer"
import useSearchParamsHook from "../../hooks/useQueryParamas";
import { useSearchCarsQuery } from "../../redux/api/cars-api";

const Search = () => {
    const {getParam} = useSearchParamsHook();
    const {data} = useSearchCarsQuery({q:getParam("q")})

  return (
    <div>
        <div className=" mt-[150px]">
        <Cars data={data} loading={false} className="grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" title="Search cars" />
        </div>
        <Footer/>
    </div>
  )
}

export default Search