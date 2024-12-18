import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TourImages from '../Components/TourImages'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { allUserTours, homeTours } from '../Services/allApis'
import TourCard from '../Components/TourCard'
import flight from '../assets/flight.png'
import camera from '../assets/camera.png'
import bag from '../assets/bag.png'
import camp from '../assets/camp.png'

function Home() {
    const [tours, setTours] = useState([])
    const [toursHome, setToursHome] = useState([])
    const [logStatus, setLogStatus] = useState(false)
    const [search, setSearch] = useState("")
    const [photos, setPhotos] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getData()
            getHomeTours()
            setLogStatus(true)
        }
        else {
            console.log("Login first!")
            setLogStatus(false)
        }
    }, [search])

    const getData = async () => {
        const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
        const result = await allUserTours(header, search)
        if (result.status == 200) {
            setTours(result.data)
            const allPhotos = result.data.flatMap(tour => tour.photo.slice(0, 1))
            setPhotos(allPhotos)
        }
        else {
            console.log(result.response.data)
        }
    }
    const getHomeTours = async () => {
        const result = await homeTours()
        if (result.status == 200) {
            setToursHome(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    // console.log(toursHome)
    // console.log(photos)

    return (
        <>
            <Header />

            {/* hero section */}

            <section style={{ height:'80vh', padding:'50px', marginTop:'20px'}} className=' d-flex align-items-center justify-center'>
                <Container className='mt-sm-5'>
                    <Row >
                      <Col sm='12' md='6' className='d-flex align-items-center '>
                      <div className='m-5'>
                                <h1>EMBRACE</h1>
                                <h1>THE</h1>
                                <h1>EXPLORATION</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad vitae quae minus. Velit ipsa cumque illo fuga at, repellat quisquam incidunt mollitia vol</p>

                      </div>
                      </Col>
                      <Col sm='12' md='6'  style={{ height:'70vh'}}>
                            <img className='img-fluid' style={{objectFit:'contain',width:'100%', height:'100%'}} src="https://i.pinimg.com/736x/15/49/36/154936af1ecdd665089cf4b436d01fba.jpg" alt="" />
                      </Col>
                    </Row>
                </Container>
            </section>


            <section className='mx-auto d-flex align-items-center justify-content-center' style={{ marginTop: "150px" }} >
                <Container className='mx-auto'>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Col sm='12' md='4' lg='3' className='mx-auto'>
                            <div style={{ width: '250px', height: '300px', backgroundColor:'#9abac3'}} className='p-4 text-center text-white'>
                                <img width={'70px'} src={flight} alt="" className='my-3'/>
                                <h3>Tour And Travel</h3>
                                <p  className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad vitae quae minus. Velit ipsa cumque illo</p>
                            </div>
                        </Col>
                        <Col sm='12' md='4' lg='3'>
                            <div style={{ width: '250px', height: '300px', backgroundColor: '#a8b0ba' }} className='p-4 text-center text-white'>
                                <img width={'70px'} src={camp} alt="" className='my-3' />
                                <h3>Camping</h3>
                                <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad vitae quae minus. Velit ipsa cumque illo</p>
                            </div>
                        </Col>
                        <Col sm='12' md='4' lg='3'>
                            <div style={{ width: '250px', height: '300px', backgroundColor: '#6c888a' }} className='p-4 text-center text-white'>
                                <img width={'70px'} src={bag} alt="" className='my-3' />
                                <h3>Adventure Tour</h3>
                                <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad vitae quae minus. Velit ipsa cumque illo</p>
                            </div>
                        </Col>
                        <Col sm='12' md='4' lg='3'>
                            <div style={{ width: '250px', height: '300px', backgroundColor: '#47586e' }} className='p-4 text-center text-white'>
                                <img width={'70px'} src={camera} alt="" className='my-3' />
                                <h3>Outbound Activity</h3>
                                <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad vitae quae minus. Velit ipsa cumque illo</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>



            <section className="w-100 p-5">
                <Row>
                    {
                        !logStatus ?
                            
                            <section className='mx-auto d-flex align-items-center justify-content-center' style={{ marginTop: "150px" }} >
                                <Container className='mx-auto'>
                                    <Row className='d-flex align-items-center justify-content-center'>
                                        <Col sm='12' md='4' lg='3' >
                                            <div style={{ width: '300px', height: '350px', }}>
                                                <img className='img-fluid' style={{ objectFit: 'contain', width: '100%', height: '100%' }} src="https://i.pinimg.com/736x/35/4b/9c/354b9c8727c6bb9f9f2a91e36a4ce6aa.jpg" alt="" />
                                            </div>
                                        </Col>
                                        <Col sm='12' md='4' lg='3'>
                                            <div style={{ width: '300px', height: '350px' }} >
                                                    <img className='img-fluid' style={{objectFit:'contain', width:'100%', height:'100%'}} src="https://i.pinimg.com/736x/31/b0/03/31b003586c87cb6a336448cc0766f3f6.jpg" alt="" />
                                            </div>
                                        </Col>
                                        <Col sm='12' md='4' lg='3'>
                                            <div style={{ width: '300px', height: '350px' }} >
                                                <img className='img-fluid' style={{ objectFit: 'contain', width: '100%', height: '100%' }} src="https://i.pinimg.com/736x/ef/83/c9/ef83c9c981f7197d30d401784ca33c4d.jpg" alt="" />
                                            </div>
                                        </Col>
                                        <Col sm='12' md='4' lg='3'>
                                            <div style={{ width: '300px', height: '350px' }} >
                                                <img className='img-fluid' style={{ objectFit: 'contain', width: '100%', height: '100%' }} src="https://i.pinimg.com/736x/d3/d8/6a/d3d86a028e0bc80dff478c4559d275b1.jpg" alt="" />
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                            :

                            <div>

                                {/*  packages section */}

                                <div className='m-5'>
                                    <img src="" alt="" />
                                    <h2 className='text-center mb-5'>Tour Packages</h2>

                                    <div id="carouselExampleControls" className="carousel slide carousel-fade w-50 m-auto" data-ride="carousel">
                                        <div className="carousel-inner">
                                            {toursHome.length > 0 &&
                                                toursHome.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                    >
                                                        <TourCard tours={item} />
                                                    </div>
                                                ))}
                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon btn btn-outline-info" aria-hidden="true"></span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon btn btn-outline-info" aria-hidden="true"></span>
                                        </a>
                                    </div>

                                    <div className='text-center mt-4'>
                                        <Link to={'/tours'} className='text-decoration- text-black'>More Packages...</Link>
                                    </div>
                                </div>
                             
                            </div>
                    }
                
                </Row>

            </section >
            <section style={{ height: '80vh', padding: '50px', marginTop: '20px' }} className=' d-flex align-items-center '>
                <Row className='d-flex justify-content-between'>
                    <Col className='d-flex justify-content-center align-items-center ps-5'>
                        <div>
                            <h2>ABOUT US</h2>
                            <h3>DestiNation</h3>
                            <p>Obsessed with the idea of empowering the travelers with best vacation deals.To provide the best tour and travel experiences, our packages are customizable at the time of booking.At DestiNation, we know that a holiday, ideally, should not be all about planning, finding and making bookings.  </p>
                        </div>
                    </Col>
                    <Col lg='6' className='p-5' style={{ height: '70vh' }}>
                        <img className='img-fluid' style={{ objectFit: 'contain', width: '100%', height: '100%' }} src="https://i.pinimg.com/736x/bd/d6/bb/bdd6bb1faea91e47d21d83ce59c0d438.jpg" alt="" />
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default Home