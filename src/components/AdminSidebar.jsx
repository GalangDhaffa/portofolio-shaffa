import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineChatAlt2,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineHeart,
  HiOutlineAcademicCap,
} from 'react-icons/hi'

const menuItems = [
  { id: 'Overview', icon: HiOutlineViewGrid, label: 'Overview' },
  { id: 'Profile', icon: HiOutlineUser, label: 'Profile' },
  { id: 'Projects', icon: HiOutlineBriefcase, label: 'Projects' },
  { id: 'Skills', icon: HiOutlineDocumentText, label: 'Skills' },
  { id: 'Experience', icon: HiOutlineChatAlt2, label: 'Experience' },
  { id: 'Education', icon: HiOutlineAcademicCap, label: 'Education' },
  { id: 'Values', icon: HiOutlineHeart, label: 'My Values' },
]

export default function AdminSidebar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'Overview'

  const handleLogout = () => {
    localStorage.removeItem('shaffa_admin_auth')
    navigate('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#2d2a32] to-[#1e1b22] text-white flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lavender-400 to-teal-400 flex items-center justify-center font-heading font-bold text-lg shadow-lg">
            S
          </div>
          <div>
            <div className="text-sm font-semibold m-0 font-sans text-white">Admin Dashboard</div>
            <p className="text-xs text-gray-400 m-0">Shaffanadia</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 px-3 mb-2 font-semibold">
          Menu
        </p>
        <ul className="list-none m-0 p-0 flex flex-col gap-1">
          {menuItems.map(({ id, icon: Icon, label }) => {
            const isActive = currentTab === id
            return (
              <li key={id}>
                <Link
                  to={`/admin?tab=${id}`}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${isActive
                    ? 'bg-lavender-500/20 text-lavender-300 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blush-300 to-lavender-300 flex items-center justify-center">
            <HiOutlineUser size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium m-0 truncate">Shaffanadia</p>
            <p className="text-[11px] text-gray-500 m-0">Administrator</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-blush-300 hover:bg-white/10 border-none cursor-pointer text-xs font-medium transition-all duration-200"
        >
          <HiOutlineLogout size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
