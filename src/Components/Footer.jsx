import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/travellogo.png'

function Footer() {
    return (
        <>
            <div style={{ height: "300px" }} className='mt-5 bg-black w-100'>
                <Row className="d-flex justify-content-between bg-black text-center p-5">
                    {/* intro */}
                    <Col xs='12' md='3' lg='3' style={{ width: "",color:'gray' }} >
                        <img style={{width:'200px'}} className='img-fluid mb-3' src={logo} alt="logo" />
                        <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
                        <p>Code licensed Media player, docs CC BY 3.0.</p>
                        <p>Currently v5.3.3.</p>
                    </Col>
                    {/* links */}
                    <Col xs='12' md='3' lg='3' className="d-flex flex-column">
                        <h5 className='text-white'>Links</h5>
                        <Link style={{color:'gray'}} className='text-decoration-none py-3' to={'/gal'}>Gallery</Link>
                        <Link style={{color:'gray'}} className='text-decoration-none' to={'/login'}>Login</Link>
                        <Link style={{color:'gray'}} className='text-decoration-none pt-3' to={'/reg'}>Register</Link>
                        <Link style={{color:'gray'}} className='text-decoration-none py-3' to={'/adminlogin'}>Admin Panel</Link>
                    </Col>
                    {/* guides */}
                    <Col xs='12' md='3' lg='3' className="d-flex flex-column">
                        <h5 className='text-white'>Guides</h5>
                        <a href="https://react.dev/" style={{ textDecoration: 'none', color: "gray" }} target='_blind'>React</a>
                        <a href="https://reactrouter.com/en/main" style={{ textDecoration: 'none', color: "gray" }} target='_blind'>React Router</a>
                        <a href="https://react-bootstrap.netlify.app/" style={{ textDecoration: 'none', color: "gray" }} target='_blind'>React Bootstrap</a>
                    </Col>
                    {/* contacts */}
                    <Col xs='12' md='3' lg='3' className="d-flex flex-column">
                        <h5 className='text-white'>Contact</h5>
                        <div className="d-flex">
                            <input placeholder='Enter your Email' type="text" className="form-control me-2" />
                            <button className="btn btn-primary"><i className='fa-solid fa-arrow-right'></i></button>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-twitter'></i></a>
                            <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-instagram'></i></a>
                            <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-facebook'></i></a>
                            <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-linkedin'></i></a>
                            <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i className='fa-brands fa-github'></i></a>
                        </div>
                    </Col>
                    
                </Row>
                <div className='container-fluid p-0 bg-black px-5 py-3'>
                    <p className="text-center text-light mx-4">Copyright &copy;<span className='text-warning'> Athul Krishna</span>, DestiNation App. Build with React, Node, MongoDB, Express</p>
                </div>
            </div>
        </>
    )
}

export default Footer