import React, { useEffect, useState } from 'react'
import { cancelBooking, getBooking } from '../Services/allApis'
import { toast } from 'react-toastify'
import { Col, Row } from 'react-bootstrap'

function BookedInfo() {

    const [clients, setClients] = useState([])

    useEffect(() => {
        allClients()
    }, [])

    const allClients = async () => {
        const result = await getBooking()
        if (result.status == 200) {
            setClients(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    console.log(clients)

    const handleDelete = async (id) => {
        const result = await cancelBooking(id)
        if (result.status == 200) {
            toast.error("Trip Cancelled!!")
            allClients()
        }
        else {
            toast.error(result.response)
        }
    }

    return (
        <>
            <div className='my-5 '>
                <h3 className='text-center'>PACKAGES BOOKED</h3>

                <Row className='d-flex justify-content-evenly'>

                    {
                        clients.length > 0 ?
                            clients.map(item => (
                                <Col md='5' className='d-flex justify-content-center'>
                                    <div className='w-100 mt-5 p-5 text-white' style={{ backgroundColor:"#3cbe9e"}}>
                                        <h4>Package Name : <span className='text-danger fw-bolder' > {item.packageName}</span></h4>
                                        <h5>Name : {item.fullName}</h5>
                                        <h6>Email  :{item.email}</h6>
                                        <h6>Phone : {item.phone}</h6>
                                        <h6>Date : {new Date(item.bookAt).toLocaleDateString('en-IN', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</h6>
                                        <h6>No. of people : {item.guestSize}</h6>
                                        <div className='d-flex justify-content-between'>
                                            <h5><b>Total Amount :</b><span className='text-dark'> &#x20B9;{item.totalAmount}</span></h5>
                                            <button className='btn pt-2' onClick={() => { handleDelete(item?._id) }}>
                                                <i className="fa-solid fa-trash-can fa-xl text-danger"></i>
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            )) :
                            <h5>No Bookings!</h5>
                    }
                </Row>

            </div>
        </>
    )
}

export default BookedInfo