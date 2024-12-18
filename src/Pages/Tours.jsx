import React, { useState, useEffect } from 'react'
import { Col, Form, FormGroup } from 'react-bootstrap'
import { allUserTours } from '../Services/allApis'
import { Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import TourCard from '../Components/TourCard'
import Header from '../Components/Header'

function Tours() {

    const [tours, setTours] = useState([])
    const [search, setSearch] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {
        setUser(sessionStorage.getItem("username"))
        if (sessionStorage.getItem('token')) {
            getData()
        }
        else {
            console.log("Login first!")
        }
    }, [search])
    // console.log(tours)

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await allUserTours(header, search)
        if (result.status == 200) {
            setTours(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }

    return (
        <>
            

            <Header />
            <h2 className='text-center mt-5'>Welcome <span className='text-danger'>{user}</span>,</h2>
            <h3 className='text-center my-4'>Experience The Art Of Travel</h3>
            <div className='shadow bg-white rounded-4 p-2 m-5 w-25 m-auto my-5'>
                <Form >
                    <FormGroup className=''>
                        <div className='w-100 d-flex justify-content-center'>
                            <FloatingLabel controlId="floatingInput" label="Where do You wanna Go? " className="">
                                <Form.Control type="text" placeholder="Where do You wanna Go?" onChange={(e) => { setSearch(e.target.value) }} className='px-5' />
                            </FloatingLabel>
                            <span className='bg-danger rounded-circle d-flex justify-content-center align-items-center ms-1' style={{ width: '3.5rem', height: '3.5rem' }} type='submit'>
                                <i className="fa-solid fa-magnifying-glass fa-xl text-light" ></i>
                            </span>
                        </div>
                    </FormGroup>
                </Form>
            </div>

            <Row className='' style={{ margin: "0px" }}>
                {
                    tours.length > 0 ?
                        tours.map(item => (
                            <Col md='3' className='py-2'>
                                <TourCard tours={item} />
                            </Col>
                        )) :
                        <h1>Loading...</h1>
                }
            </Row>


        </>
    )
}

export default Tours