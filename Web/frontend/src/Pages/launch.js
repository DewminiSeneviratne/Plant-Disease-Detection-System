import React, { add, useState, useEffect, useRef } from "react";
import '../Pages/styles/launch.css'
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/cblogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AdminIcon from '@rsuite/icons/Admin';

function Launch() {
    const containerElements = useRef(null);
    //let container = document.getElementById('container')

    useEffect(() => {

        setTimeout(() => {
            containerElements.current.classList.add('sign-in')
        }, 200)
    })
    return (
        <>
            <AppBar style={{ backgroundColor: '#1a7553', padding: '10px', position: 'fixed', height: '100px' }}>
                <Toolbar>
                    <Typography variant="h3" noWrap>
                        <Avatar style={{ height: '60px', width: '60px', top: '28px', marginLeft: '60px' }} src={logo}></Avatar>

                        <a style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px', marginLeft: '70px' }} href=''></a>

                        <div style={{ position: 'absolute', bottom: '17px', left: '150px' }}>
                            <a href='/' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px' }}>CropsAI</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '17px', right: '60px', }} class="admintooltip">
                            <a href='/adminlogin' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', height: '60px', width: '60px' }} >{<AdminIcon />}</a>
                            <span class="admintooltiptext">Admin Login</span>
                        </div>

                        <div style={{ position: 'absolute', bottom: '16px', right: '200px', }}>
                            <a href='/howitworks' style={{ fontSize: '30px', color: "white", textDecoration: 'none', fontFamily: 'papyrus', height: '60px', width: '60px' }} >How it works?</a>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>

            <div id="container" class="container" name="container" ref={containerElements}>
                <div class="row">
                    <div class="col align-items-center flex-col sign-up">

                    </div>
                    <div class="col align-items-center flex-col sign-in">
                        <div class="form-wrapper align-items-center">
                            <div class="form sign-in">

                                <p style={{ fontSize: '25px', cursor: 'default' }}>
                                    <b>
                                        Try CropsAI Now !
                                    </b>
                                </p>
                                <button style={{ width: "70%", height: "60px" }} className="uploadimagebutton">
                                    <a style={{ color: "white", textDecoration: 'none', fontSize: '25px', fontWeight: 'bold' }}
                                        href='/upload'>Upload Image</a>
                                </button>
                                <p style={{ fontSize: '18px', cursor: 'default' }}>
                                    <span>
                                        <br></br>Join With Us to Share Your Knowledge <br></br>
                                    </span>
                                    <a style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}
                                        className="signuphere"
                                        href='/login'>
                                        Sign In Here
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row content-row">
                    <div class="col align-items-center flex-col">
                        <div class="text sign-in">
                            <h2>
                                <Avatar style={{ height: '120px', width: '120px' }} src={logo}></Avatar>
                            </h2>

                            <h2 style={{ color: "white", fontSize: '90px', textAlign: 'left', fontFamily: 'papyrus' }}>
                                CropsAI <br></br>
                            </h2>
                            <h2 style={{ color: "white", fontSize: '28px', textAlign: 'left' }}>
                                Identify plant diseases  <br></br>in seconds with the <br></br> click of a button.
                            </h2>

                        </div>
                        <div class="img sign-in">
                        </div>
                    </div>
                </div>
                <footer style={{ backgroundColor: '#1a7553', width: '100%', textAlign: 'center', marginBottom: '0px', padding: '50px', position: 'relative' }}>

                    <p style={{ backgroundColor: '#1a7553', color: 'white', fontSize: '25px', fontWeight: 'bold', cursor: 'default' }}>
                        CropsAI<br></br> </p>
                    <p style={{ backgroundColor: '#1a7553', color: 'white', fontSize: '20px', cursor: 'default' }}>
                        Plant Disease Detection System<br></br>
                        <a style={{ backgroundColor: '#1a7553', color: 'white', fontSize: '15px', textDecoration: 'none' }}
                            href="mailto:hege@example.com">info@cropsai.lk</a> <br></br>
                        <a style={{ backgroundColor: '#1a7553', color: 'white', fontSize: '15px', textDecoration: 'none' }}
                            href="tel:#">
                            +94 117 400 400 or +94 777 740 750</a>
                    </p>
                </footer>
            </div>
        </>
    )
}

export default Launch