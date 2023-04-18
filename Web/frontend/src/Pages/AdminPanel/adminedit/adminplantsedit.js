import React, { useState, useEffect } from "react";
import Sidenavbar from '../sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../adminstyles/adminhome.css'
import ArowBackIcon from '@rsuite/icons/ArowBack';
import '../adminedit/admineditform.css'

const adminplantsEdit = () => {

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
                                <a href='/' style={{ color: '#1a7553', textDecoration: 'none', fontFamily: 'papyrus' }} >{<OffRoundIcon />}</a>
                                <span class="admintooltiptext">Logout</span>
                            </h1>

                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#1a7553' }}></hr>
                </div>
                <br></br><br></br><br></br><br></br><br></br>

                <div style={{ marginLeft: '350px' }}>

                    <button type='submit' style={{ borderRadius: '30px', border: 'none', backgroundColor: '#6bb83b', color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
                        <a href='/adminplants' style={{ color: "white", textDecoration: 'none' }}>{<ArowBackIcon />}</a>
                    </button>

                    <p style={{ fontFamily: 'Poppins', fontSize: '40px', fontWeight: 'bold', cursor: 'default' }}>Edit Plants</p> <br></br>
                </div>


                <div className='adminedit'>
                    <h1 style={{ cursor: 'default' }}>Edit Plants</h1>
                    <form name='adminplantsedit_form'>
                        <input
                            type='text'
                            required
                            placeholder="Plant Name"
                        />
                        <input
                            type='text'
                            required
                            placeholder="Plant Image"
                        />

                        <button type='submit' style={{
                            borderRadius: '30px', border: 'none', backgroundColor: '#6bb83b',
                            color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
                        }}>Update</button>
                    </form>
                </div>
                <br></br><br></br>

            </div>

        </div>

    );
}

export default adminplantsEdit