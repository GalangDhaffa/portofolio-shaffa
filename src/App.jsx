import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/public/Login'
import { initializeDB } from './utils/dataStore'

import { ThemeProvider } from './context/ThemeContext'

function App() {
  useEffect(() => {
    initializeDB()
  }, [])

  return (
    <ThemeProvider>
      <Routes>
        {/* Public Portfolio Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Route (Protected) */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
