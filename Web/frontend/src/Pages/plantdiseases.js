import React, { useState, useEffect } from "react";
import { auth, db, storage } from '../firebase';
import { collection, orderBy, query, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc, where } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import '../Pages/styles/plantdiseases.css'

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/cblogo.png";
import OffRoundIcon from '@rsuite/icons/OffRound';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PlantDiseases = () => {

    const [showData, setShowData] = useState([]);

    const [showRemediesTomato, setShowRemediesTomato] = useState([]);
    const [showRemediesPotato, setShowRemediesPotato] = useState([]);
    const [showRemediesGrape, setShowRemediesGrape] = useState([]);
    const [showRemediesCorn, setShowRemediesCorn] = useState([]);

    const [imageFile, setImageFile] = useState();

    const getDataRefContract = collection(db, "Plants");
    const getDataRefRemedies = collection(db, "Remedies");

    useEffect(() => {

        const q = query(getDataRefContract, orderBy("PlantName"));

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
        };

        getData();

        const getRemedyData = async () => {
            const qryTomato = query(getDataRefRemedies, where("PlantName", "==", "Tomato"));
            const dataTomato = await getDocs(qryTomato);
            setShowRemediesTomato(dataTomato.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));

            const qryPotato = query(getDataRefRemedies, where("PlantName", "==", "Potato"));
            const dataPotato = await getDocs(qryPotato);
            setShowRemediesPotato(dataPotato.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));

            const qryGrape = query(getDataRefRemedies, where("PlantName", "==", "Grape"));
            const dataGrape = await getDocs(qryGrape);
            setShowRemediesGrape(dataGrape.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));

            const qryCorn = query(getDataRefRemedies, where("PlantName", "==", "Corn"));
            const dataCorn = await getDocs(qryCorn);
            setShowRemediesCorn(dataCorn.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
        };

        getRemedyData();

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

            <br /><br /><br />

            <div class="main" id="section1">
                <br></br><br></br><br></br><br></br><br></br>

                <h1 style={{
                    fontFamily: 'papyrus', textAlign: 'center', fontSize: '60px', color: '#093227',
                    marginLeft: '600px', marginRight: '600px', cursor: 'default'
                }}>Plants</h1>
                <br></br><br></br><br></br>

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

                        {
                            showData.map(({ id, post }) => {

                                const diseases = [];

                                for (var i = 0; i < post.records.length; i++) {
                                    diseases.push(post.records[i].DiseaseName)
                                }
                                return (
                                    <>
                                        {Array.from({ length: 1 }).map((_, idx) => (
                                            <Col className='plantscolumn'>
                                                <div class="plantdiseasescard">

                                                    <h1 style={{ backgroundColor: '#79c7ad', cursor: 'default' }}>{post.PlantName}</h1>

                                                    <div style={{ margin: '24px' }}>
                                                        <h3 style={{ cursor: 'default' }}>Diseases</h3>
                                                    </div>

                                                    {
                                                        Object.values(post.records).map((rows, index) => {

                                                            return (
                                                                <>
                                                                    <p>
                                                                        <div class="main">
                                                                            <ul>
                                                                                <li>

                                                                                    <button className='plantdiseasesbutton'>
                                                                                        <a style={{ color: "black", textDecoration: 'none' }}
                                                                                            href='#section3'>{rows.DiseaseName}</a>
                                                                                    </button>

                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </p>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Col>
                                        ))}
                                    </>
                                )
                            })
                        }
                    </Row >

                </table>

            </div>

            <div class="main" id="section3">
                <br></br><br></br><br></br><br></br><br></br>

                <h1 style={{
                    fontFamily: 'papyrus', textAlign: 'center', fontSize: '60px', color: '#093227',
                    marginLeft: '100px', marginRight: '100px', cursor: 'default'
                }}>Remedies for Plant Diseases</h1>

                <br /><br /><br /><br />

                {/* Corn */}
                <table className='plantstable'>

                    <Row xs={1} md={2} className="g-4">

                        <Col className='solutionscolumn'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 style={{ cursor: 'default' }}>Corn</h1>
                                    </Card.Title>

                                    <table className="solutionstable">
                                        <thead>
                                            <th>Plant Disease</th>
                                            <th>Remedies</th>
                                        </thead>
                                        <tbody>
                                            {
                                                showRemediesCorn.map(({ id, post }) => {

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {post.DiseaseName}
                                                                </td>
                                                                <td>
                                                                    {post.Remedy}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <Button variant="primary" className='remedybuttons'
                                        style={{ cursor: 'pointer', width: '200px', height: '40px', marginTop: '50px' }}>
                                        <a style={{ color: "white", textDecoration: 'none' }} href='/addremedies'>Add Remedies</a>
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col >
                    </Row >

                </table>

                {/* Grape */}
                <table className='plantstable'>

                    <Row xs={1} md={2} className="g-4">

                        <Col className='solutionscolumn'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 style={{ cursor: 'default' }}>Grape</h1>
                                    </Card.Title>

                                    <table className="solutionstable">
                                        <thead>
                                            <th>Plant Disease</th>
                                            <th>Remedies</th>
                                        </thead>
                                        <tbody>
                                            {
                                                showRemediesGrape.map(({ id, post }) => {

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {post.DiseaseName}
                                                                </td>
                                                                <td>
                                                                    {post.Remedy}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <Button variant="primary" className='remedybuttons'
                                        style={{ cursor: 'pointer', width: '200px', height: '40px', marginTop: '50px' }}>
                                        <a style={{ color: "white", textDecoration: 'none' }} href='/addremedies'>Add Remedies</a>
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col >
                    </Row >

                </table>



                {/* Potato */}
                <table className='plantstable'>

                    <Row xs={1} md={2} className="g-4">

                        <Col className='solutionscolumn'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 style={{ cursor: 'default' }}>Potato</h1>
                                    </Card.Title>

                                    <table className="solutionstable">
                                        <thead>
                                            <th>Plant Disease</th>
                                            <th>Remedies</th>
                                        </thead>
                                        <tbody>
                                            {
                                                showRemediesPotato.map(({ id, post }) => {

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {post.DiseaseName}
                                                                </td>
                                                                <td>
                                                                    {post.Remedy}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <Button variant="primary" className='remedybuttons'
                                        style={{ cursor: 'pointer', width: '200px', height: '40px', marginTop: '50px' }}>
                                        <a style={{ color: "white", textDecoration: 'none' }} href='/addremedies'>Add Remedies</a>
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col >
                    </Row >

                </table>

                {/* Tomato */}
                <table className='plantstable'>

                    <Row xs={1} md={2} className="g-4">

                        <Col className='solutionscolumn'>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h1 style={{ cursor: 'default' }}>Tomato</h1>
                                    </Card.Title>

                                    <table className="solutionstable">
                                        <thead>
                                            <th>Plant Disease</th>
                                            <th>Remedies</th>
                                        </thead>
                                        <tbody>
                                            {
                                                showRemediesTomato.map(({ id, post }) => {

                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>
                                                                    {post.DiseaseName}
                                                                </td>
                                                                <td>
                                                                    {post.Remedy}
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <Button variant="primary" className='remedybuttons'
                                        style={{ cursor: 'pointer', width: '200px', height: '40px', marginTop: '50px' }}>
                                        <a style={{ color: "white", textDecoration: 'none' }} href='/addremedies'>Add Remedies</a>
                                    </Button>

                                </Card.Body>
                            </Card>
                        </Col >
                    </Row >

                </table>




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
        </div >
    );
}

export default PlantDiseases