import React, { useState, useEffect } from "react";
import { auth, db, storage } from '../firebase';
import { collection, orderBy, query } from "firebase/firestore";
import { getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../Pages/styles/plantdiseases.css'

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/cblogo.png";
import OffRoundIcon from '@rsuite/icons/OffRound';

import tomato from '../images/tomato.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PlantDiseases = () => {

    const [showData, setShowData] = useState([]);

    const [imageFile, setImageFile] = useState();

    const getDataRefContract = collection(db, "Plants");

    useEffect(() => {

        const q = query(getDataRefContract, orderBy("PlantName"));

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
        };

        getData();
    }, [imageFile])

    let imageURL = ''
    console.log(imageFile)

    return (
        <div className='usersbg'>

            <AppBar style={{ backgroundColor: '#1a7553', padding: '10px', position: 'fixed', height: '100px' }}>
                <Toolbar>
                    <Typography variant="h3" noWrap>
                        <Avatar style={{ height: '60px', width: '60px', top: '28px', marginLeft: '60px' }} src={logo}></Avatar>

                        <a style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px', marginLeft: '70px' }} href=''></a>

                        <div style={{ position: 'absolute', bottom: '17px', left: '150px' }}>
                            <a href='/' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '35px' }}>CropsAI</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '17px', right: '600px', }}>
                            <a href='#section1' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '30px' }}>Plants</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '17px', right: '400px', }}>
                            <a href='#section2' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '30px' }}>Diseases</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '17px', right: '200px', }}>
                            <a href='#section3' style={{ color: "white", textDecoration: 'none', fontFamily: 'papyrus', fontWeight: 'bold', fontSize: '30px' }}>Remedies</a>
                        </div>

                        <div style={{ position: 'absolute', bottom: '17px', right: '60px', }}>
                            <a href='/' onClick={() => signOut(auth)} style={{ color: 'white', textDecoration: 'none', fontFamily: 'papyrus' }} >{<OffRoundIcon />}</a>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>

            <br></br><br></br><br></br>

            <div class="main" id="section1">
                <br></br><br></br> <br></br><br></br>

                <h1 style={{
                    fontFamily: 'papyrus', textAlign: 'center', fontSize: '60px', color: '#093227',
                    marginLeft: '600px', marginRight: '600px', cursor: 'default'
                }}>Plants</h1>

                <table className='plantstable'>

                    <Row xs={1} md={2} className="g-4">

                        {
                            showData.map(({ id, post }) => {
                                return (
                                    <>
                                        {Array.from({ length: 1 }).map((_, idx) => (
                                            <Col className='plantscolumn'>
                                                <Card><Card.Img variant="top" src={post.PlantImageURL}
                                                    style={{ width: "150px", height: "150px" }}
                                                    className='plantsimages' />

                                                    <Button variant="primary" className='plantsbuttons'
                                                        style={{ cursor: 'pointer' }}>
                                                        <a style={{ color: "white", textDecoration: 'none' }}
                                                            href='#section2'>{post.PlantName}</a>
                                                    </Button>
                                                </Card>
                                            </Col>
                                        ))}
                                    </>
                                )
                            })
                        }
                    </Row >

                </table>

            </div>

            <div class="main" id="section2">
                <br></br><br></br><br></br><br></br><br></br>


                <h1 style={{
                    fontFamily: 'papyrus', textAlign: 'center', fontSize: '60px', color: '#093227',
                    marginLeft: '500px', marginRight: '500px', cursor: 'default'
                }}>Plant Diseases</h1>

                <table className='plantstable'>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Col className='plantscolumn'>
                                <div class="plantdiseasescard">
                                    <h1 style={{ backgroundColor: '#79c7ad', cursor: 'default' }}>Tomato</h1>

                                    <div style={{ margin: '24px' }}>
                                        <h3 style={{ cursor: 'default' }}>Diseases</h3>
                                    </div>
                                    <p>
                                        <div class="main" id="section2">
                                            <ul>
                                                <li>
                                                    <button className='plantdiseasesbutton'>
                                                        <a style={{ color: "black", textDecoration: 'none' }} href='#section3'>Tomato Early Blight</a>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </table>
            </div>

            <div class="main" id="section3">
                <br></br><br></br><br></br><br></br><br></br>

                <h1 style={{
                    fontFamily: 'papyrus', textAlign: 'center', fontSize: '0px', color: '#093227',
                    marginLeft: '300px', marginRight: '300px', cursor: 'default'
                }}>Remedies for Plant Diseases</h1>

                <br></br><br></br><br></br><br></br>

                <table className='plantstable'>
                    <Row xs={1} md={2} className="g-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Col className='solutionscolumn'>
                                <Card>
                                    <Card.Body>

                                        <Card.Title>
                                            <h1>Corn</h1>
                                        </Card.Title>

                                        <table className="solutionstable">
                                            <thead>
                                                <th>Plant Disease</th>
                                                <th>Remedies</th>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        early blight
                                                    </td>
                                                    <td>
                                                        remedy
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        late blight
                                                    </td>
                                                    <td>
                                                        remedy
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <Button variant="primary" className='remedybuttons'
                                            style={{ cursor: 'pointer', width: '200px', height: '40px', marginTop: '50px' }}>
                                            <a style={{ color: "white", textDecoration: 'none' }} href='/addremedies'>Add Remedies</a>
                                        </Button>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </table>
            </div>
        </div>
    );
}

export default PlantDiseases