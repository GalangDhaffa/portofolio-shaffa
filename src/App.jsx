import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import AdminLayout from './components/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      {/* Public Portfolio Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin Route */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
