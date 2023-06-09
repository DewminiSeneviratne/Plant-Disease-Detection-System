import React, { useState, useEffect } from "react";
import { auth, db } from '../../firebase';
import { collection, orderBy, query, updateDoc, where, doc, getDocs, addDoc, arrayRemove, getDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';

import Sidenavbar from './sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../AdminPanel/adminstyles/adminhome.css'
import TrashIcon from '@rsuite/icons/Trash';
import './adminedit/admineditform.css'

const AdminDiseases = () => {

    const [showForm, setShowForm] = useState(false);

    //const [diseaseName, setDiseaseName] = useState("");
    const [solutionName, setSolutionName] = useState("");

    const [remedyPlantName, setRemedyPlantName] = useState("");
    const [remedyDiseaseName, setRemedyDiseaseName] = useState("");

    const ShowForm = () => {
        setShowForm(!showForm);
    }

    const [alertMessage, setAlertMessage] = useState("");

    const [plantName, setPlantName] = useState("");
    const [diseaseName, setDiseaseName] = useState("");

    const getDataRefContract = collection(db, "Plants");
    const [showData, setShowData] = useState([]);

    function plantnamefunction(event) {
        setPlantName(event.target.value)
    }

    const getDataRef = collection(db, "Remedies");

    async function addSolutions() {

        try {
            const docRef = await addDoc(getDataRef, {
                PlantName: remedyPlantName,
                DiseaseName: remedyDiseaseName,
                Remedy: solutionName
            });
            setAlertMessage("Record Inserted Successfully.")

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function deleteDisease(event, id, index) {
        //event.preventDefault()
        //alert(id + ' ' + index)

        const listingRef = doc(db, 'Plants', id);

        const docData = await getDoc(listingRef);
        //console.log(docData)

        //console.log(docData.data().records[index])

        const objectToBeRemoved = docData.data().records[index]

        try {
            await updateDoc(listingRef, {
                records: arrayRemove(objectToBeRemoved)
            });
        } catch (e) {
            console.log(e.message);
        }

    }

    useEffect(() => {

        const q = query(getDataRefContract);

        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
            //console.log(data)
        };

        getData();
    })

    const submit = async e => {
        e.preventDefault()

        const record = [{ DiseaseName: diseaseName, Remedy: '' }];
        const p = query(collection(db, 'Plants'), where('PlantName', '==', plantName));
        const querySnapshot = await getDocs(p);

        if (!querySnapshot.empty) {
            console.log('abc')
            const recordAdd = { DiseaseName: diseaseName, Remedy: '' }
            querySnapshot.forEach(async (docFile) => {
                const plantRef = doc(db, 'Plants', docFile.id);
                let recordsArray = docFile.data().records
                let newRecord = recordsArray.push(recordAdd)
                await updateDoc(plantRef, {
                    records: recordsArray
                });
            });
        }/*else {

        try {
            const docRef = await addDoc(getDataRefContract, {
                PlantName: plantName,
                records: record,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }*/

    }



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

                    <p style={{ fontFamily: 'Poppins', fontSize: '40px', fontWeight: 'bold', cursor: 'default' }}>Plant Diseases</p> <br></br>


                    <table style={{ width: '95%' }}>
                        <tr>
                            <th colSpan={2} style={{ backgroundColor: '#4ec284', padding: '2px' }}>Add Plant Disease</th>
                        </tr>
                        <tr>
                            <th>Plant Name</th>
                            <th>Plant Disease</th>
                        </tr>
                        <tr style={{ backgroundColor: 'white' }}>
                            <td>
                                <select id="plants" name="plants"
                                    onChange={plantnamefunction}
                                    style={{ width: '70%', padding: '5px', fontSize: '17px' }} required>
                                    {
                                        showData.map(({ id, post }) => {
                                            return (
                                                <option value={post.PlantName} key={id}>
                                                    {post.PlantName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Plant Disease"
                                    value={diseaseName}
                                    onChange={(e) => setDiseaseName(e.target.value)}
                                    style={{ width: '50%', padding: '5px', fontSize: '17px' }}
                                    required />
                            </td>
                        </tr>
                        <tr style={{ backgroundColor: 'white' }}>
                            <td colSpan={2} style={{ border: 'none', textAlign: 'right' }}>
                                <button type='submit' onClick={submit} className="adminaddbuttons"
                                    style={{
                                        width: '250px', borderRadius: '30px',
                                        border: 'none', color: 'white', fontSize: '20px',
                                        fontWeight: 'bold', cursor: 'pointer'
                                    }}>Add Disease</button>
                            </td>
                        </tr>
                    </table>

                    <br></br>

                    {showForm && (
                        <div className='adminedit'>
                            <h1 style={{ cursor: 'default' }}>Add Remedies</h1>
                            <form name='adminaddremedies_form'>
                                <p style={{ backgroundColor: '#04AA6D', color: 'white' }}>
                                    {alertMessage}
                                </p>
                                <input
                                    type='text'
                                    required
                                    placeholder="Plant Name"
                                    value={remedyPlantName}
                                />
                                <input
                                    type='text'
                                    required
                                    placeholder="Disease Name"
                                    value={remedyDiseaseName}
                                />
                                <textarea name="remedies" rows={7} cols={20}
                                    placeholder="Remedy"
                                    value={solutionName}
                                    onChange={(e) => setSolutionName(e.target.value)}
                                    style={{ width: '100%', padding: '10px', fontSize: '17px' }}
                                    required>
                                </textarea>

                                <button type='button' onClick={addSolutions}
                                    style={{
                                        borderRadius: '30px', border: 'none', backgroundColor: '#6bb83b',
                                        color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
                                    }}>Add Remedy</button>
                            </form>
                        </div>
                    )}

                    <br></br>

                    <table style={{ width: '95%' }}>
                        <thead>
                            <tr>
                                <th>Plant Name</th>
                                <th>Plant Diseases</th>
                                <th>Add Remedy</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                showData.map(({ id, post }) => {

                                    const diseases = [];

                                    for (var i = 0; i < post.records.length; i++) {
                                        diseases.push(post.records[i].DiseaseName)
                                    }
                                    return (<>
                                        {
                                            Object.values(post.records).map((rows, index) => {

                                                return (
                                                    <>
                                                        <tr key={index}>

                                                            <td>{post.PlantName}</td>

                                                            <td>{rows.DiseaseName}</td>

                                                            <td>
                                                                <button onClick={function (event) { ShowForm(); setRemedyDiseaseName(rows.DiseaseName); setRemedyPlantName(post.PlantName) }} type="button"
                                                                    style={{
                                                                        borderRadius: '30px', border: 'none',
                                                                        backgroundColor: '#6bb83b', color: 'white', fontSize: '16px',
                                                                        cursor: 'pointer'
                                                                    }}>Add Remedy</button>
                                                            </td>

                                                            <td>
                                                                <button onClick={(event) => deleteDisease(event, id, index)}
                                                                    style={{
                                                                        borderRadius: '30px', border: 'none',
                                                                        backgroundColor: '#e93f3f', color: 'white', fontSize: '20px',
                                                                        fontWeight: 'bold', cursor: 'pointer'
                                                                    }}>{<TrashIcon />}</button>
                                                            </td>
                                                        </tr>

                                                    </>
                                                )
                                            })
                                        }
                                    </>)



                                })
                            }
                        </tbody>
                    </table>
                </div>
                <br></br><br></br>

            </div>

        </div>

    );
}

export default AdminDiseases