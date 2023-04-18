import Launch from './Pages/launch'
import HowItWorks from './Pages/howitworks'
import Register from './Pages/Register'
import Login from './Pages/Login'
import PlantDiseases from './Pages/plantdiseases'
import AddRemedies from './Pages/addremedies'
import AdminLogin from './Pages/AdminPanel/adminlogin'
import AdminHome from './Pages/AdminPanel/adminhome'
import AdminPlants from './Pages/AdminPanel/adminplants'
import AdminDiseases from './Pages/AdminPanel/admindiseases'
import AdminSolutions from './Pages/AdminPanel/adminsolutions'
import AdminUserProfiles from './Pages/AdminPanel/adminuserprofiles'
import AdminPlantsEdit from './Pages/AdminPanel/adminedit/adminplantsedit'
import AdminDiseasesEdit from './Pages/AdminPanel/adminedit/admindiseasesedit'
import AdminSolutionsEdit from './Pages/AdminPanel/adminedit/adminsolutionsedit'

import { ImageUpload } from "./home";
//import { Router } from '@material-ui/icons';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (<>
    <Router>
      <Routes>
        <Route index element={<Launch/>}></Route>
        <Route exact path='/upload' element={<ImageUpload/>}></Route>
        <Route exact path='/howitworks' element={<HowItWorks/>}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/plantdiseases' element={<PlantDiseases/>}></Route>
        <Route exact path='/adminlogin' element={<AdminLogin/>}></Route>
        <Route exact path='/adminhome' element={<AdminHome/>}></Route>
        <Route exact path='/adminplants' element={<AdminPlants/>}></Route>
        <Route exact path='/admindiseases' element={<AdminDiseases/>}></Route>
        <Route exact path='/adminsolutions' element={<AdminSolutions/>}></Route>
        <Route exact path='/adminuserprofiles' element={<AdminUserProfiles/>}></Route>
        <Route exact path='/adminplantsedit' element={<AdminPlantsEdit/>}></Route>
        <Route exact path='/admindiseasesedit' element={<AdminDiseasesEdit/>}></Route>
        <Route exact path='/adminsolutionsedit' element={<AdminSolutionsEdit/>}></Route>
        <Route exact path='/addremedies' element={<AddRemedies/>}></Route>
      </Routes>
    </Router>
  </>)
}

export default App;
