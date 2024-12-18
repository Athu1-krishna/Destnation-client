import React, { useState, useEffect } from 'react'
import { Card, CardBody } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import base_url from '../Services/base_url';

function TourCard({ tours }) {

    return (
        <>
            <div className='d-flex justify-content-between '>
                <Card className='w-100'>
                    <Link to={`/tourdet/${tours._id}`}>
                        <img src={tours.image && `${base_url}/uploads/${tours.image}`} width={'100%'} height={"350px"} alt="tour-img" />
                    </Link>
                    <CardBody>
                       
                        <div className='d-flex align-items-center justify-content-between'>
                            <h4> 
                                <Link to={`/tourdet/${tours._id}`} className='text-decoration-none text-dark fw-bold text-4xl'>
                                {tours.packageName}
                                </Link>
                            </h4>
                            <Link to={`/bookingdet/${tours._id}`} className='text-white bg-dark text-decoration-none px-3 py-2 fw-bolder rounded'>Book Now</Link>

                        </div>
                        
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default TourCard