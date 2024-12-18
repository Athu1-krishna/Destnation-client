import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
import { addPhoto } from '../Services/allApis';
import uploadImg from '../assets/uploadProjectImg.png'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


function AddPhoto({ setAddStatus }) {
    const { tid } = useParams()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [preview, setPreview] = useState("")
    const [photoDet, setPhotoDet] = useState({ photo: "" })

    useEffect(() => {
        if (photoDet.photo.type == "image/jpg" || photoDet.photo.type == "image/jpeg" || photoDet.photo.type == "image/png") {
            console.log("Image has correct format")
            setPreview(URL.createObjectURL(photoDet.photo))
        }
        else {
            console.log("Invalid file format! Image should be jpg,png or jpeg")
            setPreview("")
        }
    }, [photoDet.photo])

    const handleUpload = async () => {
        const { photo } = photoDet
        const formData = new FormData()
        formData.append("photo", photo)
        const reqHeader = { "Content-Type": "multipart/form-data" }
        const result = await addPhoto(tid, formData, reqHeader)
        if (result.status == 200) {
            toast.success("Photo uploaded successfully")
            setAddStatus(result)
            setPhotoDet({ photo: "" })
            handleClose()
        } else {
            toast.error(result.response.data)
        }
    }

    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{cursor:'pointer'}} onClick={handleShow}>
                <span style={{fontSize:'2.2rem'}}>📷</span>
                <h6 style={{ marginTop: "-10px" }}>Upload your memories here!</h6>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex align-items-center justify-content-center'>
                    <Row>
                        <label >
                            <input type="file" name='' id='in' style={{ display: 'none' }} onChange={(e) => setPhotoDet({ ...photoDet, photo: e.target.files[0] })} />
                            <img width={'350px'} className='img-fluid ' src={preview ? preview : uploadImg} alt="" />
                        </label>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleUpload}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddPhoto