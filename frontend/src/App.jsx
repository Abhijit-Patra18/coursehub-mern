import Courses from './pages/Courses'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/courses" element={<Courses />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
