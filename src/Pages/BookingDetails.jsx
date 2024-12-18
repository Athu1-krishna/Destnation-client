import React, { useState, useEffect } from 'react'
import { Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import Booking from '../Components/Booking'
import { useParams } from 'react-router-dom'
import { SingleTour, getReview } from '../Services/allApis'
import base_url from '../Services/base_url'
import Header from '../Components/Header'
function BookingDetails() {
    const [tours, setTours] = useState([])
    const { tid } = useParams()
    const user = sessionStorage.getItem("username")
    const [reviews, setReviews] = useState({
        username: user, reviewText: "", rating: ""
    })
    const [allReviews, setAllReviews] = useState({
        username: user, reviewText: "", rating: ""
    })
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await SingleTour(tid, header)
        const review = await getReview(tid, header)

        if (result.status == 200) {
            setTours(result.data)
            setAverageRating()
        }
        else {
            console.log(result.response.data)
        }
        if (review.status == 200) {
            setAllReviews(review.data.rev)
            setAverageRating(review.data.averageRating)
        }
        else {
            console.log(review.response.data)
        }
    }

    return (
        <>
            <Header />
            <Row style={{padding:'50px 150px'}} >
                <Col lg='8' sm='12' className='d-flex align-items-center justify-content-center' >
                        <div className="">
                            <img src={tours.image && `${base_url}/uploads/${tours.image}`} className='w-75 rounded mx-auto' alt="" height={"400px"} />
                            <div className="w-75 border p-3 d-flex justify-content-center">
                                <h4>{tours.packageName}</h4>
                            </div>
                        </div>
                </Col>
                <Col lg='4' sm='12' xs='12'>
                    
                        <Booking tour={tours} avgRating={averageRating} allReviews={allReviews} />
                    
                </Col>
            </Row>
           
            {/*TOUR REVIEW START */}
            <div className="border mt-5 p-3 m-auto mx-5">
                <div className='d-flex justify-content-between'>
                    <h4>Reviews ({allReviews?.length}) </h4>
                    <div className='d-flex mb-5'>
                        (<h5 className='me-1'>{averageRating}</h5>
                        <span style={{ color: '#ffc800' }}><i className="fa-solid fa-star" ></i></span> )
                    </div>
                </div>

                <ListGroup>
                    <div className="row">

                        {
                            allReviews.length > 0 ?
                                allReviews.map(item => (
                                    <div className="my-4 border rounded-4 col-3 mx-2" style={{backgroundColor:'#dcdcdc'}}>
                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex justify-content-between'>
                                                <span style={{fontSize:'3rem'}} className='text-danger fw-bolder'>&#8220;</span>
                                            </div>
                                            <span className='mt-3'>
                                                {item.rating} ⭐
                                            </span>
                                        </div>
                                        <p className='text-center'>"{item.reviewText}"</p>
                                       <div className='d-flex justify-content-between'>
                                           
                                            <p>({new Date(item.createdAt).toLocaleDateString('en-IN', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })})</p>
                                            <span>-{item.username}</span>
                                       </div>
                                    </div>
                                )) :
                                <h3>No Reviews!</h3>
                        }
                    </div>

                </ListGroup>
            </div>

        </>
    )
}

export default BookingDetails