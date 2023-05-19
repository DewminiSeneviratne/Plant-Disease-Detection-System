import React from "react";
import { auth } from '../../firebase';
import Sidenavbar from './sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../AdminPanel/adminstyles/adminhome.css'
import { signOut } from 'firebase/auth';

const AdminHome = () => {

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

                    <table style={{ width: '50%', marginLeft: '22%' }}>
                        <tr>
                            <th>Total Number of Plants</th>
                        </tr>
                        <tr style={{ backgroundColor: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                            <td>4</td>
                        </tr>
                    </table>

                    <br></br><br></br><br></br><br></br><br></br>

                    <table style={{ width: '50%', marginLeft: '22%' }}>
                        <tr>
                            <th>Total Number of Diseases</th>
                        </tr>
                        <tr style={{ backgroundColor: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                            <td>10</td>
                        </tr>
                    </table>

                </div>
                <br></br><br></br>

            </div>

        </div>

    );
}

export default AdminHome