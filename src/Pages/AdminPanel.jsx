import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import uploadImg from '../assets/uploadProjectImg.png'
import AdminEdit from '../Components/AdminEdit';
import BookedInfo from '../Components/BookedInfo';
import { addTours, allTours, deleteTour } from '../Services/allApis';
import { addTourResponseContext } from '../Context Api/Contextapi';
import { editTourResponseContext } from '../Context Api/Contextapi';
import Users from '../Components/Users';
import AdminHeader from '../Components/AdminHeader';

function AdminPanel() {
    const { addTourResponse, setAddTourResponse } = useContext(addTourResponseContext)
    const { editTourResponse, setEditTourResponse } = useContext(editTourResponseContext)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [search, setSearch] = useState("")


    const [preview, setPreview] = useState("")
    const [tourData, setTourData] = useState({
        packageName: "", state: "", description: "", rate: "", maxGroupSize: "", image: ""
    })
    const [imageStatus, setImageStatus] = useState(false)
    const [tours, setTours] = useState([])


    useEffect(() => {
        console.log(tourData)
        if (tourData.image.type == "image/jpg" || tourData.image.type == "image/jpeg" || tourData.image.type == "image/png") {
            setImageStatus(false)
            setPreview(URL.createObjectURL(tourData.image))
        }
        else {
            setImageStatus(true)
            setPreview("")
        }
    }, [tourData.image, search])

    const handleAddTour = async () => {
        const { packageName, state, description, rate, maxGroupSize, image } = tourData
        if (!packageName || !state || !description || !rate || !maxGroupSize || !image) {
            toast.warning("Provide Complete Data!!")
            // console.log(packageName, state, description, rate, maxGroupSize, image)
        }
        else {
            const formData = new FormData()
            formData.append("packageName", packageName)
            formData.append("state", state)
            formData.append("description", description)
            formData.append("rate", rate)
            formData.append("maxGroupSize", maxGroupSize)
            formData.append("image", image)

            const reqHeader = {
                "Content-Type": "multipart/form-data"
            }
            const result = await addTours(formData, reqHeader)
            if (result.status == 200) {
                toast.success(`${tourData.packageName} added successfully!`)
                setTourData({
                    packageName: "", state: "", description: "", rate: "", maxGroupSize: "", image: ""
                })
                setAddTourResponse(result)
                handleClose()
            }
            else {
                toast.error(result.response.data)
            }
        }
    }
    useEffect(() => {
        getAllTours()
    }, [addTourResponse, editTourResponse])

    const getAllTours = async () => {
        const result = await allTours(search)
        // console.log(result)
        if (result.status == 200) {
            setTours(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }

    const handleDeleteTour = async (id) => {

        const header = {
            "Content-Type": "application/json",
        }
        const result = await deleteTour(id, header)
        if (result.status == 200) {
            toast.error("One package has been deleted!!")
            getAllTours()
        }
        else {
            console.log(result)
            toast.error(result.response.data)
        }
    }

    return (
        <>
            <AdminHeader />
            <div className='m-5 '>
                <div>
                    <div className='m-5'>
                        <h3>Welcome, <span className='text-danger fw-bolder'>Admin</span></h3>
                    </div>
                    <div className=' d-flex justify-content-center'>
                        <button className='btn p-3 bg-success text-white fw-bolder' style={{ marginTop: "25px" , border:"none", outline:"none"}} onClick={handleShow}>ADD NEW PACKAGE<i className="fa-solid fa-plus fw-bolder ms-3 "></i></button>
                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Add Package</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Row>
                                    <Col>
                                        <label >
                                            <input type="file" name='' id='in' style={{ display: 'none' }} onChange={(e) => setTourData({ ...tourData, image: e.target.files[0] })} />Location Image
                                            <img className='img-fluid' src={preview ? preview : uploadImg} alt="" />
                                        </label>

                                    </Col>
                                    <Col>
                                        <div>
                                            <FloatingLabel controlId="titleinp" label="Package Name" className="mb-3">
                                                <Form.Control type="text" placeholder="Package Name" onChange={e => setTourData({ ...tourData, packageName: e.target.value })} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="langinp" label="Location" className="mb-3">
                                                <Form.Control type="text" placeholder="Where does the tour occurs" onChange={e => setTourData({ ...tourData, state: e.target.value })} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="githubinp" label="Rate" className='mb-3'>
                                                <Form.Control type="text" placeholder="Package Rate" onChange={e => setTourData({ ...tourData, rate: e.target.value })} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="githubinp" label="MaxGroupSize" className='mb-2'>
                                                <Form.Control type="text" placeholder="MaxGroupSize" onChange={e => setTourData({ ...tourData, maxGroupSize: e.target.value })} />
                                            </FloatingLabel>
                                        </div>
                                    </Col>
                                    <FloatingLabel controlId="overviewinp" label="Description" className="mb-3">
                                        <Form.Control type='text-box' placeholder="Briefly about Package" onChange={e => setTourData({ ...tourData, description: e.target.value })} />
                                    </FloatingLabel>
                                </Row>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={handleAddTour}>Add</Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='mt-5' id='trips'>
                        <h2 className='text-center '> PACKAGES</h2>
                        <div className='d-flex'>
                            <table className="container my-5 bg-dark text-light text-center" style={{width:'60vw'}}>
                                <thead>
                                    <tr>
                                        <th className='p-3'>#</th>
                                        <th>Package Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tours?.length > 0 ?
                                            tours?.map((item, index) => (
                                                <tr key={item?._id}>
                                                    <td className='p-3'>{index + 1}</td>
                                                    <td>{item?.packageName}</td>
                                                    <td><AdminEdit tours={item} /></td>
                                                    <td> <button className='btn mt-3 bg-danger text-light' onClick={() => { handleDeleteTour(item?._id) }} >
                                                      DELETE
                                                    </button></td>

                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className="text-danger">Not Package added yet!</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr />

                    <div id='bookings'>
                        <BookedInfo />
                    </div>
                    <hr />

                    <div id='users' className='p-5'>
                        <Users />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminPanel