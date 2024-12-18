import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AdminLogin() {
    const [mail, setEmail] = useState('')
    const [pswd, setPswd] = useState('')
    const navigate = useNavigate()
    const handleMail = (e) => {
        setEmail(e.target.value)
    }
    const handlepswd = (e) => {
        setPswd(e.target.value)
    }
    const adminLogin = () => {
        if (mail === "admin@gmail.com" && pswd === "iamadmin") {
            console.log(mail, pswd)
            navigate('/admindash')
        }
        else {
            toast.error("Enter Valid Information!")
            alert("Are you sure you want to go to admin panel?")
        }
    }

    return (
        <>
            <section style={{ backgroundColor: 'rgb(27, 37, 45)', height: '100vh' }} className='d-flex align-items-center justify-content-center '  >
                <Container>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <div className='px-5 py-5' style={{ backgroundColor: "rgba(40, 47, 57, 0.4)", width: '350px' }}>
                            <div className="text-center">
                                <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png" height={"50px"} alt="" />
                                <h2 className='text-light my-3'>Admin Login</h2>
                            </div>
                            <Form >
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="email" name='mail' onChange={handleMail} placeholder="Enter your Email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Control type="password" name='pswd' onChange={handlepswd} placeholder="Enter password" />
                                </Form.Group>
                                <Button variant="success" className='btn w-100 mb-2' onClick={adminLogin} >Log in</Button>
                            </Form>
                        </div>
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default AdminLogin