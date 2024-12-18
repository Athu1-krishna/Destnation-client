import React, { useState, useContext } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import logo from '../assets/travellogo.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Services/allApis';
import { Link } from 'react-router-dom'
import { TokenAuthContext } from '../Context Api/AuthContext';

function Login() {

    const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

    const navigate = useNavigate()

    const [data, setData] = useState({
        password: "", email: ""
    })

    const handleLogin = async () => {
        const { email, password } = data
        if (!email || !password) {
            toast.warning("invalid details...enter details properly")
        }
        else {
            const result = await userLogin({ email, password })
            console.log(result)
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("username", result.data.user)
                sessionStorage.setItem("userDetails", JSON.stringify(result.data.userDetails))
                toast.success("login successfull")
                navigate('/')
                setAuthStatus(true)
            }
            else {
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <section style={{ backgroundColor:'rgb(27, 37, 45)',height:'100vh'}} className='d-flex align-items-center justify-content-center '>
                <Container>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <div className='px-5 py-5' style={{ backgroundColor: "rgba(40, 47, 57, 0.4)",width:'350px'}}>
                            <div className="text-center my-3">
                                <img style={{width:'250px'}} src={logo} alt="logo" />
                                 <h2 className='text-white'>Login</h2>
                            </div>

                            <div>
                                <FloatingLabel controlId="floatingInput" label="Email Address" className="mb-3">
                                    <Form.Control  type="email" placeholder="name@example.com" onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password " className="mb-3">
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                                </FloatingLabel>
                                <Button type='submit' style={{ backgroundColor:'#2db656'}} className='btn w-100 mb-2 fw-bolder' onClick={handleLogin}>Login</Button>
                            </div>
                            <p className='text-light'>Don't have an account?<Link to='/reg' className='text-decoration-none ms-1' style={{ color: '#2db656' }}>Sign Up</Link></p>
                        </div>

                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Login