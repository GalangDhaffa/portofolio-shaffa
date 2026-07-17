import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 no-underline group"
        >
          <span className="w-9 h-9 rounded-full bg-gradient-to-br from-lavender-300 to-teal-300 flex items-center justify-center text-white font-heading font-bold text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
            S
          </span>
          <span className="font-heading text-xl font-semibold text-lavender-800 tracking-tight hidden sm:inline">
            Shaffa<span className="text-teal-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium no-underline transition-all duration-300 ${
                    isActive
                      ? 'bg-lavender-100 text-lavender-700 shadow-sm'
                      : 'text-gray-500 hover:text-lavender-600 hover:bg-lavender-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-lavender-600 hover:bg-lavender-50 transition-colors border-none bg-transparent cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="list-none m-0 px-6 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
                    isActive
                      ? 'bg-lavender-100 text-lavender-700'
                      : 'text-gray-500 hover:text-lavender-600 hover:bg-lavender-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
