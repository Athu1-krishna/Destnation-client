import React, { useState } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom'
import logo from '../assets/travellogo.png'
import { toast } from 'react-toastify'
import { userRegister } from '../Services/allApis'
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        username: "", password: "", email: ""
    })

    const handleRegister = async () => {
        const { username, password, email } = data
        if (!username || !password || !email) {
            toast.warning("Enter input details Properly!!")
        }
        else {
            const result = await userRegister(data)
            console.log(result)
            if (result.status == 201) {
                toast.success("User Registration Successfull")
                setData({ username: "", password: "", email: "" })
                navigate('/login')
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
    return (
        <>
            <section style={{ backgroundColor: 'rgb(27, 37, 45)', height: '100vh' }} className='d-flex align-items-center justify-content-center '>
                <Container>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <div className='px-5 py-3' style={{ backgroundColor: "rgba(40, 47, 57, 0.4)", width: '350px' }}>
                            <div className="text-center">
                                <img style={{ width: '250px' }} src={logo} alt="logo" />
                                <h2 className='text-light'>Register</h2>
                            </div>

                            <div className='mt-4'>
                                <FloatingLabel controlId="floatingInput" label="Username" >
                                    <Form.Control className='my-3' type="text" placeholder="Username" onChange={(e) => { setData({ ...data, username: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Email address" >
                                    <Form.Control className='my-3' type="email" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control className='mb-3' type="password" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                </FloatingLabel>
                                <Button type='submit' style={{ backgroundColor: '#2db656', }} className='btn w-100 mb-2 fw-bolder' onClick={handleRegister}>Create Account</Button>
                            </div>
                            <p className='text-white'>Already have an account?<Link to='/login' className='text-decoration-none ms-1' style={{ color: '#2db656' }}>Login</Link></p>
                        </div>

                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Register