import { useState } from 'react'
import '../Pages/styles/forms.css'
import { db, auth } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/cblogo.png";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import OffRoundIcon from '@rsuite/icons/OffRound';
import { signOut } from 'firebase/auth';

import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

function addRemedies() {
    return (
        <div className='addremediesformbg'>
            <AppBar style={{ backgroundColor: '#1a7553', padding: '10px', position: 'fixed', height: '100px' }}>
                <Toolbar>
                    <Typography variant="h3" noWrap>
                        <Avatar style={{ height: '60px', width: '60px', top: '28px', marginLeft: '60px' }} src={logo}></Avatar>

                        <div style={{ position: 'absolute', bottom: '17px', left: '20px' }}>
                            <button type='submit' style={{ borderRadius: '30px', border: 'none', backgroundColor: '#6bb83b', color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
                                <a href='/plantdiseases' style={{ color: "white", textDecoration: 'none' }}>{<ArowBackIcon />}</a>
                            </button>
                        </div>

                        <a style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px', marginLeft: '70px' }} href=''></a>

                        <div style={{ position: 'absolute', bottom: '17px', left: '150px' }}>
                            <a href='/' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px' }}>CropsAI</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '17px', right: '60px', }}>
                            <a href='/' onClick={() => signOut(auth)} style={{ color: 'white', textDecoration: 'none', fontFamily: 'papyrus' }} >{<OffRoundIcon />}</a>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <br></br><br></br><br></br><br></br><br></br>

            <div className='auth'>
                <h1 style={{ cursor: 'default' }}>Add Remedies</h1>
                <form name='registration_form'>
                    <input
                        type='text'
                        //value={userName}
                        placeholder="Plant Name"
                        required
                    //onChange={e => setUserName(e.target.value)} 
                    />

                    <input
                        type='email'
                        //value={userEmail}
                        placeholder="Plant Disease"
                        required
                    //onChange={e => setUserEmail(e.target.value)} 
                    />

                    <input
                        type='password'
                        //value={userPassword}
                        required
                        placeholder='Remedies'
                    // onChange={e => setUserPassword(e.target.value)} 
                    />

                    <textarea name="remedies" rows={4} cols={20}
                        type='password'
                        //value={confirmPassword}
                        required
                        placeholder='Add Remedies'
                        style={{ width: '100%', padding: '10px', fontSize: '17px' }}
                    //onChange={e => setConfirmPassword(e.target.value)} 
                    />

                    <button type='submit' className="signinupbutton"
                        style={{
                            borderRadius: '30px', border: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
                        }}>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default addRemedies