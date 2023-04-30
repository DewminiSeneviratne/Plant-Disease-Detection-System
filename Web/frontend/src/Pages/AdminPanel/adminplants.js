import React, { useState, useEffect } from "react";
import { auth, db, storage } from '../../firebase';
import { collection, orderBy, query, getDoc, doc, deleteDoc, where } from "firebase/firestore";
import { getDocs } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Sidenavbar from './sidenavbar';
import OffRoundIcon from '@rsuite/icons/OffRound';
import '../AdminPanel/adminstyles/adminhome.css'
import TrashIcon from '@rsuite/icons/Trash';
import EditIcon from '@rsuite/icons/Edit';

const AdminPlants = () => {

    const [plantName, setPlantName] = useState("");
    const [showData, setShowData] = useState([]);

    const [imageFile, setImageFile] = useState();

    const getDataRefContract = collection(db, "Plants");

    async function deleteplants(event, id, plantName) {

        //const docRef = doc(db, "Plants", id);
        //const docSnap = await getDoc(docRef);
        //let plantName = docSnap.data().PlantName;

        const getDataRefRemedies = collection(db, "Remedies")
        const getDataRefRemediesQuery = query(getDataRefRemedies, where("PlantName", "==", plantName));

        const data = await getDocs(getDataRefRemediesQuery);

        /*console.log(data)
        console.log(data.id)
        console.log(data.data())*/

        const querySnapshot = await getDocs(getDataRefRemediesQuery);
        querySnapshot.forEach(async (docFile) => {
        // doc.data() is never undefined for query doc snapshots
            console.log(docFile.id, " => ", docFile.data());
            await deleteDoc(doc(db, "Remedies", docFile.id))
        });

        //let query = db.collection('facilityOwners').where('facilityId', '==', facilityId).where('ownerId', '==', ownerId);
        /*getDataRefRemediesQuery.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });*/
        
        //await deleteDoc(doc(db, "Remedies", data.id))
        await deleteDoc(doc(db, "Plants", id))

    }

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

    const submit = async e => {
        e.preventDefault()
        console.log(imageFile)

        try {
            const storageImageFile = ref(storage, `/Plant Images/${imageFile.name}`)
            const uploadTaskImageFile = uploadBytesResumable(storageImageFile, imageFile);

            uploadTaskImageFile.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTaskImageFile.snapshot.ref).then((url) => {
                        imageURL = url;
                        console.log(url);
                    });
                }
            );

            setTimeout(async () => {
                const record = [{}];

                const docRef = await addDoc(getDataRefContract, {
                    PlantName: plantName,
                    PlantImageURL: imageURL,
                    records: record
                });
                console.log("Document written with ID: ", docRef.id);
            }, 6000)

        } catch (e) {
            console.error("Error adding document: ", e);
        }

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
                                <a href='/' onClick={() => signOut(auth)} style={{
                                    color: '#1a7553', textDecoration: 'none',
                                    fontFamily: 'papyrus'
                                }} >{<OffRoundIcon />}</a>
                                <span class="admintooltiptext">Logout</span>
                            </h1>

                        </div>
                    </div>
                    <hr style={{ height: '5px', backgroundColor: '#1a7553' }}></hr>
                </div>
                <br></br><br></br><br></br><br></br><br></br>

                <div style={{ marginLeft: '350px' }}>

                    <p style={{ fontFamily: 'Poppins', fontSize: '40px', fontWeight: 'bold', cursor: 'default' }}>Plants</p> <br></br>

                    <form>
                        <table style={{ width: '95%' }}>
                            <tr>
                                <th>Plant Name</th>
                                <th>Image</th>
                            </tr>
                            <tr style={{ backgroundColor: 'white' }}>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Plant Name"
                                        value={plantName}
                                        required
                                        onChange={(e) => setPlantName(e.target.value)}
                                        style={{ width: '70%', padding: '5px', fontSize: '17px' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        required
                                        style={{ width: '50%', padding: '10px', fontSize: '17px' }}
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ border: 'none', textAlign: 'right' }}>
                                    <button className="adminaddbuttons"
                                    type='submit' onClick={submit}
                                        style={{
                                            width: '250px', borderRadius: '30px',
                                            border: 'none', color: 'white', fontSize: '20px', fontWeight: 'bold',
                                            cursor: 'pointer'
                                        }}>Add Plant</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                    <br></br><br></br><br></br>

                    <table style={{ width: '95%' }}>
                        <thead>
                            <tr>
                                <th>Plant Name</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showData.map(({ id, post }) => {
                                const plantName = post.PlantName
                                return (
                                    <tr key={id}>
                                        <td>{post.PlantName}</td>
                                        <td>
                                            <img src={post.PlantImageURL} style={{ width: '100px', height: '100px' }}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={(event) => deleteplants(event, id, plantName)}
                                                style={{
                                                    borderRadius: '30px', border: 'none',
                                                    backgroundColor: '#e93f3f', color: 'white', fontSize: '20px', fontWeight: 'bold',
                                                    cursor: 'pointer'
                                                }}>
                                                {<TrashIcon />}
                                            </button>
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

export default AdminPlants