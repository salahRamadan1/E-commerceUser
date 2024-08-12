import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getReview } from '../../../service/review/actionReview';
import image from '../../../images/1.avif'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import './review.css'
import { Alert } from '@mui/material';
export default function GetReview({ id }) {
    const [value, setValue] = useState(2);
    const dispatch = useDispatch();
    const {
        error, loading, dataReview
    } = useSelector((state) => state.review)
    useEffect(() => {

        dispatch(getReview(id))

    }, [])
    const [num, setnum] = useState([3])
    return (
        <div className=' p-2  mt-5'>
            <h3 className='  '>Product Ratings & Reviews   </h3>
            <hr />
            <div className=' row g-5'>
                <div className=' col-md-4'>
                    <h4>Overall Rating</h4>
                    <Rating name="read-only" sx={{ backgroundColor: "#fff", borderRadius: "15px" }} value={5} readOnly />
                    <p>Based on 84 ratings</p>

                    <div className=' d-flex justify-content-between'>
                        <Rating name="read-only" sx={{}} value={5} readOnly />
                        <p style={{ fontSize: "13px" }}>The number of people :100</p>
                    </div>
                    <div className=' d-flex justify-content-between'>
                        <Rating name="read-only" sx={{}} value={4} readOnly />
                        <p style={{ fontSize: "13px" }}>The number of people :56</p>
                    </div>
                    <div className=' d-flex justify-content-between'>
                        <Rating name="read-only" sx={{}} value={3} readOnly />
                        <p style={{ fontSize: "13px" }}>The number of people :15</p>
                    </div>
                    <div className=' d-flex justify-content-between'>
                        <Rating name="read-only" sx={{}} value={2} readOnly />
                        <p style={{ fontSize: "13px" }}>The number of people :68</p>
                    </div>
                    <div className=' d-flex justify-content-between'>
                        <Rating name="read-only" sx={{}} value={1} readOnly />
                        <p style={{ fontSize: "13px" }}>The number of people :23</p>
                    </div>
                    <p className=' fw-bold'>How do I review this product?</p>
                    <p className=' text-break mb-3'>If you recently purchased this product from noon, you can go to your Orders page and click on the Submit Review button</p>
                    <p className=' fw-bold'>Where do the reviews come from?</p>
                    <p>Our reviews are from noon customers who purchased the product and submitted a review</p>
                </div>
                <div className='col-md-8'>
                    {dataReview && <>
                        <h3 > {dataReview.length}   Reviews</h3>
                        <hr className=' w-75 mx-auto' />
                        {/* user */}
                        {dataReview.map((elm, i) => (<div key={i}>


                            <div className=' d-flex align-items-start justify-content-between'>
                                <div>

                                    <img src={elm.user && elm.user.profileImage} className=' imageUsers me-2' alt={elm.user && elm.user.name} />
                                    <p>{elm.user.name}</p>
                                </div>
                                <div  >
                                    <p>{elm.createdAt.split('T')[0]}</p>
                                </div>

                            </div>
                            <Rating name="read-only" value={elm.ratingAverage} readOnly />
                            <p>{elm.title}</p>
                            <hr className=' text-center mx-auto' />
                        </div>



                        ))}
                    </>


                    }

                </div>



























 
         
            </div>



        </div>
    )
}
