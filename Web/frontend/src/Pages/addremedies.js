import React, { useState, useEffect } from "react";
import '../Pages/styles/forms.css'
import { auth, db } from '../firebase';
import { collection, orderBy, query, getDocs, addDoc } from "firebase/firestore";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import logo from "../images/cblogo.png";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import OffRoundIcon from '@rsuite/icons/OffRound';
import { signOut } from 'firebase/auth';

function AddRemedies() {

    const [diseaseName, setDiseaseName] = useState("");
    const [solutionName, setSolutionName] = useState("");

    const getDataRefContract = collection(db, "Plants");
    const getDataRef = collection(db, "Remedies");

    const [showData, setShowData] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");

    function diseasenamefunction(event) {
        setDiseaseName(event.target.value)
    }

    async function addSolutions() {
        var str_array = diseaseName.split(',');

        let plantName = str_array[0]
        let disease = str_array[1]

        try {
            const docRef = await addDoc(getDataRef, {
                PlantName: plantName,
                DiseaseName: disease,
                Remedy: solutionName
            });
            setAlertMessage("Record Inserted Successfully.")

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    useEffect(() => {

        const q = query(getDataRefContract, orderBy("PlantName"));


        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
            //console.log(data)
        };

        getData();

    })


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

                    <p style={{ backgroundColor: '#04AA6D', color: 'white' }}>
                        {alertMessage}
                    </p>

                    {/*
                    <input
                        type='text'
                        placeholder="Plant Disease"
                        required
                        />
                    */}

                    <select id="diseases" name="diseases"
                        onChange={diseasenamefunction}
                        style={{ width: '100%', padding: '5px', fontSize: '17px' }} required>
                        <option value="">
                            Select Option
                        </option>

                        {
                            showData.map(({ id, post }) => {
                                return (
                                    <>
                                        {
                                            Object.values(post.records).map((rows, index) => {
                                                let keyValue = [post.PlantName, rows.DiseaseName]
                                                return (
                                                    <>
                                                        <option value={keyValue} key={index}>
                                                            {post.PlantName} | {rows.DiseaseName}
                                                        </option>

                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </select>

                    <textarea name="remedies" rows={7} cols={20}
                        type='text'
                        required
                        value={solutionName}
                        onChange={(e) => setSolutionName(e.target.value)}
                        placeholder='Add Remedies'
                        style={{ width: '100%', padding: '10px', fontSize: '17px' }}
                    />

                    <button type='button' className="signinupbutton" onClick={addSolutions}
                        style={{
                            borderRadius: '30px', border: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
                        }}>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default AddRemedies