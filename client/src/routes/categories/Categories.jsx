import CategorySidebar from "../../components/sidebar/CategorySidebar"
import Footer from "../../components/footer/Footer"
import Cards from "./../../components/cards/Cards"
import { Container } from "../../utils"
import { useGetCarsQuery } from "../../redux/api/cars-api";
import { useSearchParams } from "react-router-dom";


const Categories = () => {
    const [searchParams] = useSearchParams();
    const {data, isLoading} = useGetCarsQuery({categories: searchParams.getAll("categories"), model: searchParams.getAll("models")});
  return (
    <>
    <div className="my-14">
        <Container>
           <div className="flex gap-5 items-start">
                <CategorySidebar model={data?.payload} defaultCategoryId={searchParams.get("categories")}/>
                <Cards data={data} loading={isLoading} className="grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" title="Sport cars"/>
           </div>
        </Container>
    </div>
    <Footer/>
    </>
  )
}

export default Categories