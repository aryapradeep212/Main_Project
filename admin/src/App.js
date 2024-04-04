import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminLog from './components/AdminLog';
import Alumini from './components/Alumini';
import Company from './components/Company';
import FacultyTable from './components/Faculty';
import AddCompanyForm from './components/AddCompany';
import AddAlumniForm from './components/AddAlumini';
import AddFacultyForm from './components/AddFaculty';
import EditCompanyForm from './components/EditCompany';
import HomePage from './components/Home';
import NavBar from './components/NavBar';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminLog/>} />
        <Route path='/navbar' element={<NavBar/>}/>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/user" element={<UserPage/>} />
        <Route path="/alumini" element={<Alumini/>} />
        <Route path="/company" element={<Company/>} />
        <Route path="/faculty" element={<FacultyTable/>} />
        <Route path="/addcompany" element={<AddCompanyForm/>}/>
        <Route path="/addalumini" element={<AddAlumniForm/>}/> 
        <Route path="/addfaculty" element={<AddFacultyForm/>}/>
        <Route path="/editcompany" element={<EditCompanyForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
