import Hero from "../../components/hero/Hero"
import Cards from "../../components/cards/Cards"
import Categories from "../../components/cateogires/Categories"
import Footer from "../../components/footer/Footer"
import { useGetCarsQuery } from "../../redux/api/cars-api"
import { useState } from "react"
import { Button } from "antd"
const Home = () => {
   const {data, loading} = useGetCarsQuery()
   const [carShow, setCarShow] = useState(8)
  return (
    <>
      <Hero/>
      <Categories/>      
      <div className="my-24">
        <Cards data={data} loading={loading} title="Popular cars" className="grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4" link="/categories" slice={4}/>
      </div>
     <div className='my-24'>
      <Cards data={data} loading={loading} slice={carShow} title="Recommended cars" className="grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4" link="/categories"/>
     
      <div className=" flex w-full justify-center mt-[80px]">
        {
          data?.payload.length > carShow && <Button type="primary" size="large" onClick={() => setCarShow(carShow + 4)}>Show more</Button>
        }
      </div>
     </div>
     <Footer/>
    </>
  )
}

export default Home