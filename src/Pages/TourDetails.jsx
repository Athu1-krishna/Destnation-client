import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { getReview } from '../Services/allApis'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SingleTour, addReviews } from '../Services/allApis'
import base_url from '../Services/base_url'
import Header from '../Components/Header'
import AddPhoto from '../Components/AddPhoto'
function TourDetails() {

    const [addStatus, setAddStatus] = useState({})

    const [tours, setTours] = useState([])
    console.log(`touressdfdkj :::${JSON.stringify(tours)}`);
    
    const { tid } = useParams()
    const user = sessionStorage.getItem("username")
    const [reviews, setReviews] = useState({
        username: user, reviewText: "", rating: ""
    })
    const [allReviews, setAllReviews] = useState({
        username: user, reviewText: "", rating: ""
    })
    const [averageRating, setAverageRating] = useState(0);
    const [photos, setPhotos] = useState("")


    useEffect(() => {

        getData()

    }, [addStatus])

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }

        const result = await SingleTour(tid, header)
        if (result.status == 200) {
            setTours(result.data)
            setPhotos(result.data.photo)
        }
        else {
            console.log(result.response.data)
        }

        const review = await getReview(tid, header)
        if (review.status == 200) {
            setAllReviews(review.data.rev)
            setAverageRating(review.data.averageRating)
        } else {
            console.log(review.response.data)
        }
    }

    const handleAddReview = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }

        const { username: user, reviewText, rating } = reviews
        const result = await addReviews(tid, reviews, header)
        if (!reviewText || !rating) {
            toast.warning("Give Rating & Message")
        } else {
            if (result.status == 200) {
                toast.success("Review added successfully!")
                setReviews({
                    reviewText: "", rating: ""
                })
                setAddStatus(result)
            }
            else {
                toast.error(result.response.data)
            }
            console.log(result)
        }
    }
    // console.log(allReviews)
    // console.log(photos)


    return (
        <>
            <Header />
            <Row style={{padding:'80px'}}>
                <Col lg='7'>
                    <img src={tours.image && `${base_url}/uploads/${tours.image}`} className='w-100 rounded' alt="" height={"450px"} />

                </Col>
                <Col lg='5' style={{padding:'10px 0px'}} className='text-center d-flex align-items-center justify-content-center'>
                    <div style={{width:'350px'}} >
                        <h2 className='text-center mb-3 text-danger fw-bolder' >{tours.packageName}</h2>
                        <h4 className='text-success fw-bolder'>{tours.rate}/- <span className='text-xs text-dark'>per person</span></h4>

                        <p>{tours.description}</p>
                        <p className='text-black'>
                            Rating : <span>{averageRating}⭐</span>
                        </p>
                        <p className='text-black'>
                             Maximum  {tours.maxGroupSize} People
                        </p>
                        <Link to={`/bookingdet/${tid}`} className='btn btn-dark btn-lg mt-3' style={{width:'150px'}} >Book Now </Link>
                    </div>

                </Col>

            </Row>
            <div>
              
                <div className='d-flex align-items-center justify-content-center'>
                    <div className=" p-3 mt-4  w-50 ">
                        <AddPhoto setAddStatus={setAddStatus} />

                        <div className='mt-3'>
                            <div className='d-flex align-items-center justify-content-center '>
                                <span>Choose Rating :</span>
                                <span className='star' onClick={e => setReviews({ ...reviews, rating: 1 })}>
                                    1 ⭐
                                </span>
                                <span className='star' onClick={e => setReviews({ ...reviews, rating: 2 })}>
                                    2 ⭐
                                </span>
                                <span className='star' onClick={e => setReviews({ ...reviews, rating: 3 })}>
                                    3 ⭐
                                </span>
                                <span className='star' onClick={e => setReviews({ ...reviews, rating: 4 })}>
                                    4 ⭐
                                </span>
                                <span className='star' onClick={e => setReviews({ ...reviews, rating: 5 })}>
                                    5 ⭐
                                </span>
                            </div>

                            <div className="border rounded w-50 d-flex justify-content-center align-items-center mx-auto mt-2">
                                <input className='border-0 w-100 p-2' type="text" placeholder='share your Review' onChange={e => setReviews({ ...reviews, reviewText: e.target.value })} />
                                <button className="btn btn-dark ms-2" type='submit' onClick={handleAddReview}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {
                    photos.length > 0 &&
                    <div className='m-5'>
                        <Row className='m-5'>
                            {

                                photos.map(item => (
                                    <Col md='3' className='my-2'>
                                        <img src={item && `${base_url}/${item}`} width={'100%'} alt="tour-img" height={'300px'} />
                                    </Col>
                                ))

                            }
                        </Row>
                    </div>
                }


            </div>
        </>
    )
}

export default TourDetails