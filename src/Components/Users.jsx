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

            </div>
        </>
    )
}

export default Users