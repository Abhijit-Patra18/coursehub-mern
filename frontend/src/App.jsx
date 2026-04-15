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
import AddLessons from './pages/AddLessons';
import ManageLesson from './pages/ManageLesson';
import EditLesson from './pages/EditLesson';
import PurchasedHistory from './pages/PurchasedHistory';
import Watch from './pages/Watch';
import AdminRoute from './components/AdminRoute';
import AuthRoute from './components/AuthRoute';
import NotFound from './components/NotFound';


function App() {

  const { flash } = useContext(FlashContext);

  return (
    <>
      <Navbar />

      <Flash flash={flash} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mycourses" element={<AuthRoute><MyBatch /></AuthRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
        <Route path="/admin/courses/new" element={<AdminRoute><NewCourses /></AdminRoute>} />
        <Route path="/admin/courses/edit/:id" element={<AdminRoute><EditCourse /></AdminRoute>} />
        <Route path="/admin/lessons/add/:id" element={<AdminRoute><AddLessons /></AdminRoute>} />
        <Route path="/admin/lessons/action/:id" element={<AdminRoute><ManageLesson /></AdminRoute>} />
        <Route path="/admin/lessons/edit/:id" element={<AdminRoute><EditLesson /></AdminRoute>} />
        <Route path="/admin/purchase/all" element={<AdminRoute><PurchasedHistory /></AdminRoute>} />
        <Route path="/courses/watch/:id" element={<AuthRoute><Watch /></AuthRoute>} />
        <Route path="/courses/:id" element={<AuthRoute><CourseDetails /></AuthRoute>} />
        <Route path="*" element={<NotFound />} />


      </Routes>

      <Footer />

    </>
  )

}

export default App
