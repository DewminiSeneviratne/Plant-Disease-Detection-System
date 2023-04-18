import React, { useState, useEffect } from "react";
import { auth, db } from '../../firebase';
import { collection, orderBy, query } from "firebase/firestore";
import { getDocs } from 'firebase/firestore';
import Sidenavbar from './sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../AdminPanel/adminstyles/adminhome.css'
import { signOut } from 'firebase/auth';

const AdminHome = () => {

    const [showData, setShowData] = useState([]);

    const getDataPlants = collection(db, "Plants");
    const getDataDiseases = collection(db, "Diseases");

    useEffect(() => {

        const q = query(getDataPlants, orderBy("PlantName"));

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
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

                    <p style={{ fontFamily: 'Poppins', fontSize: '40px', fontWeight: 'bold', cursor: 'default' }}>Home</p> <br></br>

                    <table style={{ width: '90%' }}>
                        <tr>
                            <th>Total Number of Plants</th>
                            <th>Total Number of Diseases</th>
                            <th>Total Number of Signed Up Users</th>
                        </tr>
                        <tr style={{ backgroundColor: 'white', fontWeight: 'bold', fontSize:'20px' }}>
                            <td>4</td>
                            <td>10</td>
                            <td></td>
                        </tr>
                    </table>

                    <br></br><br></br>

                    <table style={{ width: '90%' }}>
                        <tr>
                            <th>Plants</th>
                            <th>Diseases</th>
                        </tr>
                        {showData.map(({ id, post }) => {
                            return (
                                <tr key={id}>
                                    <td>{post.PlantName}</td>
                                    <td>{post.DiseaseName}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <br></br><br></br>

            </div>

        </div>

    );
}

export default AdminHome