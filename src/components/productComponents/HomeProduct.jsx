import React from 'react'

import './product.css'

import MoreSold from './MoreSold'
import MoreDiscount from './MoreDiscount'
import MoreRate from './MoreRate'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductSpecificCategory } from '../../service/product/actionProduct'
import { getCategory } from '../../service/Category/actionCategory'
import GetProduct from './GetProduct'
import PaginationProduct from './PaginationProduct'


export default function HomeProduct() {
    const dispach = useDispatch()
    const { dataCategory, error, loading } = useSelector((state) => state.category)

    const asdsa = async () => {
        dispach(getCategory())
        if (dataCategory.result) {

            for (let i = 0; i < dataCategory.result.length; i++) {

                await dispach(getProductSpecificCategory({ id: dataCategory.result[i]._id }))
            }
        }
    }
    useEffect(() => {



    }, [])

    return (
        <div className=' row justify-content-center mt-4'>

            <div className=' col-md-4'>   <MoreSold /> </div>
            <div className=' col-md-4'> <MoreDiscount /></div>
            <div className=' col-md-4'> <MoreRate /></div>

            <GetProduct />
            <PaginationProduct/>
        </div >
    )
}
