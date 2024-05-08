import { Routes, Route } from "react-router-dom"

import './App.css'
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage"
import ProjectListPage from "./pages/ProjectListPage"

function App() {
  return (
    <>
      <h1>React Project Management</h1>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>

    </>
  )
}

export default App
