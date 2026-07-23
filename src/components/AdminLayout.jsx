import { useState, useEffect } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { HiOutlineBell, HiOutlineSearch, HiOutlineMenuAlt2, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'
import { getItems } from '../utils/dataStore'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    getItems('messages').then(msgs => {
      setUnreadCount(msgs.filter(m => !m.read).length)
    })
  }, [])

  const handleSearch = (e) => {
    const q = e.target.value
    const newParams = new URLSearchParams(searchParams)
    if (q) newParams.set('q', q)
    else newParams.delete('q')
    setSearchParams(newParams)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
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
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 border-none bg-transparent cursor-pointer transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <HiOutlineMenuAlt2 size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-xl px-4 py-2 w-64 md:w-80 transition-colors">
              <HiOutlineSearch size={16} className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="bg-transparent border-none outline-none text-sm text-gray-600 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-full font-sans"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="relative p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-lavender-500 dark:hover:text-lavender-300 hover:bg-lavender-50 dark:hover:bg-slate-800 border-none bg-transparent cursor-pointer transition-colors"
            >
              {isDarkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
            </button>
            <button className="relative p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-lavender-500 dark:hover:text-lavender-300 hover:bg-lavender-50 dark:hover:bg-slate-800 border-none bg-transparent cursor-pointer transition-colors" onClick={() => {
              setSearchParams({ tab: 'Contact' });
              window.dispatchEvent(new CustomEvent('trigger-notification'));
            }}>
              <HiOutlineBell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blush-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
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
