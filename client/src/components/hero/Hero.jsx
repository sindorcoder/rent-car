import { Carousel } from 'antd';
import { useGetCarsQuery } from '../../redux/api/cars-api';

const Hero = () => {

  const {data} = useGetCarsQuery()
  return (
    
<div className='mt-[150px]'>
<Carousel arrows autoplay infinite={true} dots={false}>
    {data?.payload.map((item) => (
      <div key={item._id} className="w-full !flex items-center justify-center min-h-screen  relative ">
        <div className='relative w-full flex items-center justify-center'>
        <div className='absolute top-[-430px] left-[100px] z-[-1] h-full w-full'>
          <h2 className='text-[170px] font-bold' style={{background: `linear-gradient(to bottom,  ${item.colors[0]} 0%, ${item.colors[1]} 100%)`, toBottom: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{item.model}</h2>
          <p className="text-[70px] ml-[52px] font-bold  " style={{background: `linear-gradient(to bottom,   ${item.colors[0]} 0%, ${item.colors[1]} 100%)`, toBottom: 0, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{item.name}</p>
        </div>
        <div className='absolute'>
          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
        </div>
        </div>
      </div>
    ))}
  </Carousel>
</div>
  )
};

export default Hero;