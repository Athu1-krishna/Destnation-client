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
            toast.error("Trip Deleted!!")
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
                <table className="container my-5 table table-striped " style={{width:'60vw'}}>
                    <thead>
                        <tr>
                            <th className='p-2'>#</th>
                            <th>Package Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>No. of People</th>
                            <th>Total Amount</th>
                            <th>...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients?.length > 0 ?
                                clients?.map((item, index) => (
                                    <tr key={index}>
                                        <td className='p-2'>{index + 1}</td>
                                        <td>{item?.packageName}</td>
                                        <td>{item?.fullName}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.phone}</td>
                                        <td>{new Date(item.bookAt).toLocaleDateString('en-IN', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</td>
                                        <td>{item?.guestSize}</td>
                                        <td> &#x20B9;{item.totalAmount}</td>
                                        <td> <button className='btn pt-2' onClick={() => { handleDelete(item?._id) }}>
                                            <i className="fa-solid fa-trash-can fa-xl text-danger"></i>
                                        </button></td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td className="text-danger">No Bookings yet!</td>
                                </tr>
                        }
                    </tbody>
                </table>
               
            </div>
        </>
    )
}

export default BookedInfo