import React, { useEffect } from 'react'
import SliderHome from './SliderHome'

import HomeCategory from '../CategoryComponents/HomeCategory';
import HomeBrand from '../BrandComponents/HomeBrand';
import HomeProduct from '../productComponents/HomeProduct';
import MoreSold from '../productComponents/MoreSold';
import PaginationProduct from '../productComponents/PaginationProduct';

import { getWashList } from '../../service/washList/actionWashList';
import { getCart } from '../../service/cart/actionCart';
import { useDispatch } from 'react-redux';


export default function MainHome() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getWashList())
    dispatch(getCart())
  }, [])

  return (
    <>


      <SliderHome />
      <hr className=' text-white' />
      <HomeCategory />
      <hr className=' text-white' />

      <HomeProduct />
      <hr className=' text-white' />
      <HomeBrand />

    </>
  )
}
