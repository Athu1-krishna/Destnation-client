import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { getUsers } from '../Services/allApis'

function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const result = await getUsers()
        if (result.status == 200) {
            setUsers(result.data)
        }
        else {
            console.log(result.response.data)
        }
    }
    console.log(users)

    return (
        <>
            <div className='my-5' >
                <h3 className='text-center'>Users</h3>

                <Row>
                    {
                        users.length > 0 ?
                            users.map(item => (
                                <Col md='4' className='d-flex justify-content-center'>
                                    <div style={{ backgroundColor:'#dc4a5a'}} className='w-100 text-light mt-5 p-5 text-center'>
                                        <h4>User Name : {item.username}</h4>
                                        <h4>Email : {item.email}</h4>
                                    </div>
                                </Col>
                            )) :
                            <h5>No Users!</h5>
                    }
                </Row>

            </div>
        </>
    )
}

export default Users