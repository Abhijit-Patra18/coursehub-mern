import Courses from './pages/Courses'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NewCourses from './pages/NewCourses';
import CourseDetails from './pages/CourseDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import { useContext } from 'react';
import { FlashContext } from './context/FlashContext';
import Flash from './components/Flash';
import Footer from './components/Footer';
import MyBatch from './pages/MyBatch';
import Admin from './pages/Admin';
import AdminCourses from './pages/AdminCourses';
import EditCourse from './pages/EditCourses';


function App() {

  const { flash } = useContext(FlashContext);

  return (
    <>
      <Navbar />

      <Flash flash={flash} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admin/courses/new" element={<NewCourses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mycourses" element={<MyBatch />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/edit/:id" element={<EditCourse />} />

      </Routes>

      <Footer/>

    </>
  )

}

export default App
