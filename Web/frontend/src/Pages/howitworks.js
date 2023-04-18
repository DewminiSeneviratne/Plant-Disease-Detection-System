import React from "react";
import '../Pages/styles/how.css'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/cblogo.png";
import ArowBackIcon from '@rsuite/icons/ArowBack';

function howItWorks() {

  return (

    <div className='howitworksbg'>

      <AppBar style={{ backgroundColor: '#1a7553', padding: '10px', position: 'fixed', height: '100px' }}>
        <Toolbar>
          <Typography variant="h3" noWrap>
            <Avatar style={{ height: '60px', width: '60px', top: '28px', marginLeft: '60px' }} src={logo}></Avatar>

            <div style={{ position: 'absolute', bottom: '17px', left: '20px' }}>
              <button type='submit' style={{ borderRadius: '30px', border: 'none', backgroundColor: '#6bb83b', color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
                <a href='/' style={{ color: "white", textDecoration: 'none' }}>{<ArowBackIcon />}</a>
              </button>
            </div>

            <a style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px', marginLeft: '70px' }} href=''></a>

            <div style={{ position: 'absolute', bottom: '17px', left: '150px' }}>
              <a href='/' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px' }}>CropsAI</a>
            </div>

          </Typography>
        </Toolbar>
      </AppBar>
      <br></br><br></br><br></br><br></br><br></br>

      <div style={{height:'83vh'}}>
        <h1 style={{ color: "white", fontSize: '60px', textAlign: 'left', fontFamily: 'papyrus', backgroundColor:'#11523a' }}>How it works?</h1>
      </div>
        
    </div>

  )
}

export default howItWorks

