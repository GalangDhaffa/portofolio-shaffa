import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2 w-80">
            <HiOutlineSearch size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-full font-sans"
            />
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
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
