import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/travellogo.png'
function AdminHeader() {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/')
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-black">
                <Container>
                    <Navbar.Brand href="#home">
                        <img className='img-fluid' width={'200px'} src={logo} alt="" />
                    </Navbar.Brand>
                    <div className='bg-light'> <Navbar.Toggle aria-controls="responsive-navbar-nav" /></div>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className=" mx-auto">
                            <a href="#trips" style={{}} className='text-decoration-none text-white fw-bolder me-5'>Packages</a>
                            <a href="#bookings" className='text-decoration-none text-white fw-bolder me-5'>Bookings</a>
                            <a href="#users" className='text-decoration-none text-white fw-bolder '>Users</a>
                        </Nav>
                        <Nav>
                            <button className='btn btn-outline-danger fw-bolder' onClick={handleLogout}>
                                Logout
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default AdminHeader