import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { HiOutlineBell, HiOutlineSearch, HiOutlineMenuAlt2 } from 'react-icons/hi'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 border-none bg-transparent cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            >
              <HiOutlineMenuAlt2 size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 w-64 md:w-80">
              <HiOutlineSearch size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-full font-sans"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl text-gray-400 hover:text-lavender-500 hover:bg-lavender-50 border-none bg-transparent cursor-pointer transition-colors">
              <HiOutlineBell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blush-400 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lavender-300 to-teal-300 flex items-center justify-center text-white text-xs font-bold">
              SA
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
