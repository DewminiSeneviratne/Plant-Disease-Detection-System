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

import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';

function Register() {

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userContactno, setUserContactno] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userOccupation, setUserOccupation] = useState('')
  const [error, setError] = useState('')
  //const navigate = useNavigate()
  //const {setTimeActive} = useAuthValue()

  const validatePassword = () => {
    let isValid = true
    if (userPassword !== '' && confirmPassword !== '') {
      if (userPassword !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = async e => {
    e.preventDefault()

    const getDataRefContract = collection(db, "Users");

    try {
      const docRef = await addDoc(getDataRefContract, {
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: confirmPassword,
        contactno: userContactno,
        address: userAddress,
        occupation: userOccupation,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setError('')
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {

            }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setUserName('')
    setUserEmail('')
    setUserPassword('')
    setConfirmPassword('')
    setUserContactno('')
    setUserAddress('')
    setUserOccupation('')
  }

  return (
    <div className='formbg'>
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

      <div className='auth'>
        <h1 style={{ cursor: 'default' }}>SIGN UP</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input
            type='text'
            value={userName}
            placeholder="Enter your name"
            required
            onChange={e => setUserName(e.target.value)} />

          <input
            type='email'
            value={userEmail}
            placeholder="Enter your email"
            required
            onChange={e => setUserEmail(e.target.value)} />

          <input
            type='password'
            value={userPassword}
            required
            placeholder='Enter your password'
            onChange={e => setUserPassword(e.target.value)} />

          <input
            type='text'
            value={userContactno}
            placeholder="Enter your contact number"
            required
            onChange={e => setUserContactno(e.target.value)} />


          <button type='submit' className="signinupbutton"
            style={{
              borderRadius: '30px', border: 'none',
              color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
            }}>SIGN UP</button>
        </form>
        <span style={{ cursor: 'default' }}>
          Already have an account? <t></t>
          <a className="signuphere"
            style={{ textDecoration: 'none', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer' }} href='/login'>Sign In</a>
        </span>
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
  )
}

export default Register