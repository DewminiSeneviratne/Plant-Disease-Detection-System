import React, { useState, useEffect } from "react";
import { auth, db } from '../../firebase';
import { collection, orderBy, query, getDoc, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';

import Sidenavbar from './sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../AdminPanel/adminstyles/adminhome.css'
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';

const AdminSolutions = () => {

    const [diseaseName, setDiseaseName] = useState("");
    const [solutionName, setSolutionName] = useState("");

    const getDataRefContract = collection(db, "Plants");
    const getDataRef = collection(db, "Remedies");

    const [showData, setShowData] = useState([]);
    const [showDiseaseData, setShowDiseaseData] = useState([]);

    function diseasenamefunction(event) {
        setDiseaseName(event.target.value)
    }

    //console.log(diseaseName)

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
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function deleteSolution(event, id) {
        await deleteDoc(doc(db, "Remedies", id))
    }

    useEffect(() => {

        const q = query(getDataRefContract, orderBy("PlantName"));


        const getData = async () => {
            const data = await getDocs(q);
            setShowData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
            //console.log(data)
        };

        getData();

        const getRemedyData = async () => {
            const data = await getDocs(getDataRef);
            setShowDiseaseData(data.docs.map((docFiles) => ({ id: docFiles.id, post: docFiles.data() })));
            //console.log(data)
        };

        getRemedyData();

    })

    /*const submit = async e => {
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
        }
    }*/

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
                                <a href='/' onClick={() => signOut(auth)} style={{
                                    color: '#1a7553',
                                    textDecoration: 'none', fontFamily: 'papyrus'
                                }} >{<OffRoundIcon />}</a>
                                <span class="admintooltiptext">Logout</span>
                            </h1>
                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#1a7553' }}></hr>
                </div>
                <br></br><br></br><br></br><br></br><br></br>

                <div style={{ marginLeft: '350px' }}>

                    <p style={{ fontFamily: 'Poppins', fontSize: '40px', fontWeight: 'bold', cursor: 'default' }}>Remedies</p> <br></br>

                    <table style={{ width: '95%' }}>
                        <tr>
                            <th>Plant Disease</th>
                            <th>Remedies</th>
                        </tr>
                        <tr style={{ backgroundColor: 'white' }}>
                            <td>
                                <select id="diseases" name="diseases"
                                    onChange={diseasenamefunction}
                                    style={{ width: '70%', padding: '5px', fontSize: '17px' }} required>
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
                            </td>
                            <td>
                                <textarea name="remedies" rows={3} cols={20}
                                    placeholder="Remedy"
                                    value={solutionName}
                                    onChange={(e) => setSolutionName(e.target.value)}
                                    style={{ width: '70%', padding: '10px', fontSize: '17px' }}
                                    required>
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ border: 'none', textAlign: 'right' }}>
                                <button type='submit' onClick={addSolutions} className="adminaddbuttons"
                                    style={{
                                        width: '250px', borderRadius: '30px',
                                        border: 'none', color: 'white',
                                        fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
                                    }}>Add Remedy
                                </button>
                            </td>
                        </tr>
                    </table>
                    <br></br><br></br><br></br>
                    <table style={{ width: '95%' }}>
                        <thead>
                            <tr>
                                <th>Plant Name</th>
                                <th>Plant Disease</th>
                                <th>Remedies</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showDiseaseData.map(({ id, post }) => {
                                return (
                                    <tr key={id}>
                                        <td>{post.PlantName}</td>
                                        <td>{post.DiseaseName}</td>
                                        <td>{post.Remedy}</td>
                                        <td>
                                            <button href='/adminsolutionsedit' type='submit'
                                                style={{
                                                    borderRadius: '30px', border: 'none', backgroundColor: '#4c9cae',
                                                    color: 'white', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer'
                                                }}>{<EditIcon />}</button>
                                        </td>
                                        <td>
                                            <button type='submit' onClick={(event) => deleteSolution(event, id)} style={{
                                                borderRadius: '30px',
                                                border: 'none', backgroundColor: '#e93f3f', color: 'white', fontSize: '20px',
                                                fontWeight: 'bold', cursor: 'pointer'
                                            }}>{<TrashIcon />}</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
                <br></br><br></br>

            </div>

        </div>

    );
}

export default AdminSolutions