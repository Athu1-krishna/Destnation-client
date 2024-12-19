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
            <div className='' >
                <h3 className='text-center'>Users</h3>

                <table className="container my-5 text-center bg-dark text-light" style={{width:'550px'}}>
                    <thead>
                        <tr >
                            <th className='p-3'>#</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.length > 0 ?
                                users?.map((user, index) => (
                                    <tr key={index}>
                                        <td className='p-3'>{index + 1}</td>
                                        <td>{user?.username}</td>
                                        <td>{user?.email}</td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td className="text-danger">No Users registered yet!!!</td>
                                </tr>
                        }
                    </tbody>
                </table>


                {/* <Row>
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
                </Row> */}

            </div>
        </>
    )
}

export default Users