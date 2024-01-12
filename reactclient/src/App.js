import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import MyAccount from './components/MyAccount';
import Dashboard from './components/Dashboard';
import FacultySignin from './components/FacultySignin';
import AddFaculty from './components/addFaculty'
import AllStudents from './components/AllStudents';
import './App.css'
import AdminLogin from './components/AdminLogin';
import Allfaculty from './components/AllFaculty';



function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/facultySignin" element={<FacultySignin />} />
                <Route path='/addFaculty' element={<AddFaculty />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/studentlist" element={<AllStudents />} />
                <Route path="/adminsignin" element={<AdminLogin />} />
                <Route path="/allfaculty" element={<Allfaculty />} />
            </Routes>
        </>
    );
}

export default App;
