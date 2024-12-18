import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import tickImg from '../assets/tick.png'
function Thankyou() {
    return (
        <>
            <Header />
            <section>
                <Container>
                    <Row>
                        <Col className='pt-5 text-center' style={{ margin: "100px" }}>
                            <div>
                                <img width={'200px'} src={tickImg} alt="" />
                                <h1 className=" fw-semibold"> Congratulations 🎉</h1>
                                <h3 className="mb-3"> Your Journey is Booked! </h3>
                                <Link to='/' className='text-decoration-none text-light btn btn-dark mt-2'>
                                    Back Home
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Thankyou