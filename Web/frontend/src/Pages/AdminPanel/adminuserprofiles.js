import React, { useState, useEffect } from "react";
import { auth, db } from '../../firebase';
import { collection, orderBy, query } from "firebase/firestore";
import { getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import Sidenavbar from './sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../AdminPanel/adminstyles/adminhome.css'
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';

const AdminProfiles = () => {

    const getDataRefContract = collection(db, "Users");
    const q = query(getDataRefContract);

    const [showData, setShowData] = useState([]);

    useEffect(() => {

        const getData = async () => {
            const data = await getDocs(getDataRefContract);

            setShowData(data.docs.map((doc) => ({ post: doc.data(), id: doc.id })));
            //console.log(data)
        };

        getData();
    })

    return (
        <div>
            <div className='adminbg' >

                <Sidenavbar />

                {/*Navigation Bar*/}
                <div style={{ position: 'fixed', top: '0', width: '100%', backgroundColor: '#F4F4F4', marginLeft: '300px' }}>
                    <div style={{
                        //position: 'relative',
                        height: '81px',
                        width: '100%'
                    }}>
                        <div style={{ position: 'absolute', bottom: '22px', right: '350px', }} class="admintooltip">
                            <h1>
                                <a href='/' onClick={() => signOut(auth)} style={{ color: '#1a7553', textDecoration: 'none', fontFamily: 'papyrus' }} >{<OffRoundIcon />}</a>
                                <span class="admintooltiptext">Logout</span>
                            </h1>

                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#1a7553' }}></hr>
                </div>
                <br></br><br></br><br></br><br></br><br></br>

                <div style={{ marginLeft: '350px' }}>

                    <p style={{ fontFamily: 'Poppins', fontSize: '40px', fontWeight: 'bold', cursor: 'default' }}>Users</p> <br></br>

                    <table style={{ width: '95%' }}>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Contact Number</th>
                                <th>Address</th>
                                <th>Occupation</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData.map(({ id, post }) => {
                                return (
                                    <tr key={id}>
                                        <td>{post.name}</td>
                                        <td>{post.email}</td>
                                        <td>{post.password}</td>
                                        <td>{post.contactno}</td>
                                        <td>{post.address}</td>
                                        <td>{post.occupation}</td>
                                        <td>
                                            <button type='submit' style={{
                                                borderRadius: '30px', border: 'none',
                                                backgroundColor: '#4c9cae', color: 'white', fontSize: '20px',
                                                fontWeight: 'bold', cursor: 'pointer'
                                            }}>{<EditIcon />}</button>
                                        </td>
                                        <td>
                                            <button type='submit' style={{
                                                borderRadius: '30px', border: 'none',
                                                backgroundColor: '#e93f3f', color: 'white', fontSize: '20px',
                                                fontWeight: 'bold', cursor: 'pointer'
                                            }}>{<TrashIcon />}</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <br></br><br></br>

            </div>

        </div>

    );
}

export default AdminProfiles