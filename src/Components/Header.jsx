import React, { useEffect, useState, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/travellogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userBookings } from '../Services/allApis';
import { Nav } from 'react-bootstrap';


function Header() {
    const [show, setShow] = useState(false);

    const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

    const user = sessionStorage.getItem("username")

    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [booking, setBooking] = useState([])


    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
        getData()
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        navigate('/')
        setAuthStatus(false)
        window.location.reload();
    }

    const getData = async () => {
        const result = await userBookings()
        if (result.status == 200) {
            setBooking(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    console.log(booking)
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-black">
                <Container>
                    <Navbar.Brand href="#home">
                        <img className='img-fluid' width={'200px'} src={logo} alt="" />
                    </Navbar.Brand>
                    <div className='bg-light'> <Navbar.Toggle aria-controls="responsive-navbar-nav" /></div>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className=" mx-auto text-center">
                            <Link className='text-decoration-none text-light fw-bolder me-4' to={'/'}>Home</Link>
                            <Link className='text-decoration-none text-light fw-bolder me-4' to={'/tours'}>Tours</Link>
                            <Link className='text-decoration-none text-light fw-bolder me-4' to={'/gal'}>Gallery</Link>
                        </Nav>
                        <Nav>
                            <div className='text-center'>

                                {
                                    token ?
                                        <div>
                                            <Button variant='success' className='ms-5 me-4 fw-bolder text-decoration-none text-white btn btn-outline-success' onClick={() => setShow(true)}>
                                                Profile
                                            </Button>
                                            <button className='btn btn-outline-danger fw-bolder' onClick={handleLogout}>
                                                Logout
                                            </button>
                                           

                                            <Modal
                                                show={show}
                                                onHide={() => setShow(false)}
                                                dialogClassName="modal-90w"
                                                aria-labelledby="example-custom-modal-styling-title"
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="example-custom-modal-styling-title">
                                                        Bookings
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {
                                                        booking.length > 0 ?
                                                            booking.map(item => (
                                                                <div className='my-2 p-3 border'>
                                                                    <h5>Package : <span className='text-warning'>{item.packageName}</span></h5>
                                                                    <h6>Date : {new Date(item.bookAt).toLocaleDateString('en-IN', {
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        year: 'numeric'
                                                                    })}</h6>
                                                                    <h6>Amount: <span className='fw-bolder text-info'>{item.totalAmount}</span></h6>
                                                                </div>
                                                            ))
                                                            :
                                                            <h3>No Trip Booked yet!</h3>
                                                    }
                                                </Modal.Body>
                                            </Modal>
                                        </div>

                                        :
                                        <div className='me-5'>
                                            <Link className='btn btn-primary me-3' to={'/login'}>Log In</Link>
                                            <Link className='btn btn-primary' to={'/reg'}>Sign Up</Link>
                                        </div>
                                }

                            </div>
                        </Nav>
                    </Navbar.Collapse>
                    
                </Container>
            </Navbar>
           
        </>
    )
}

export default Header