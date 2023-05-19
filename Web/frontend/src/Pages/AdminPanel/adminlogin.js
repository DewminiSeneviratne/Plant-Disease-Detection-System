import { useState } from "react";
import "../AdminPanel/adminstyles/loginform.css";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "../AdminPanel/adminimages/cblogo.png";
import AdminIcon from "@rsuite/icons/Admin";
import ArowBackIcon from "@rsuite/icons/ArowBack";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (email == "admincropsai@gmail.com" || password == "admin123") {
      navigate("/adminhome");
    } else {
      window.alert("Wrong User Credentials");
    }
  };

  return (
    <div className="adminloginformbg">
      <AppBar
        style={{
          backgroundColor: "#1a7553",
          padding: "10px",
          position: "fixed",
          height: "100px",
        }}
      >
        <Toolbar>
          <Typography variant="h3" noWrap>
            <Avatar
              style={{
                height: "60px",
                width: "60px",
                top: "28px",
                marginLeft: "60px",
              }}
              src={logo}
            ></Avatar>

            <div style={{ position: "absolute", bottom: "17px", left: "20px" }}>
              <button
                type="submit"
                style={{
                  borderRadius: "30px",
                  border: "none",
                  backgroundColor: "#6bb83b",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <a href="/" style={{ color: "white", textDecoration: "none" }}>
                  {<ArowBackIcon />}
                </a>
              </button>
            </div>

            <a
              style={{
                color: "white",
                textDecoration: "none",
                fontFamily: "papyrus",
                fontWeight: "bold",
                fontSize: "35px",
                marginLeft: "70px",
              }}
              href=""
            ></a>

            <div
              style={{ position: "absolute", bottom: "17px", left: "150px" }}
            >
              <a
                href="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "papyrus",
                  fontWeight: "bold",
                  fontSize: "35px",
                }}
              >
                CropsAI
              </a>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="auth">
        <h1>{<AdminIcon />}</h1>
        <h1 style={{ cursor: "default" }}>ADMIN LOGIN</h1>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={login} name="login_form">
          <input
            type="email"
            value={email}
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            style={{
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#136b4b",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            SIGN IN
          </button>
        </form>
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
  );
}

export default AdminLogin;
