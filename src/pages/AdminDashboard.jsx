import {
  HiOutlineEye,
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineTrendingUp,
  HiOutlineClock,
  HiOutlineDotsVertical,
} from 'react-icons/hi'

const stats = [
  { label: 'Total Views', value: '12,847', change: '+14.2%', icon: HiOutlineEye, color: 'lavender' },
  { label: 'Pages', value: '6', change: '0%', icon: HiOutlineDocumentText, color: 'teal' },
  { label: 'Messages', value: '24', change: '+8.5%', icon: HiOutlineChatAlt2, color: 'blush' },
  { label: 'Bounce Rate', value: '32%', change: '-3.1%', icon: HiOutlineTrendingUp, color: 'gold' },
]

const recentMessages = [
  { name: 'Dr. Sarah Mitchell', email: 'sarah.m@university.edu', subject: 'Research Collaboration Inquiry', time: '2 hours ago', read: false },
  { name: 'Ahmad Fauzi', email: 'ahmad.f@gmail.com', subject: 'MUN Conference Invitation', time: '5 hours ago', read: false },
  { name: 'Lisa Chen', email: 'lisa.chen@asean.org', subject: 'Youth Forum Follow-up', time: '1 day ago', read: true },
  { name: 'Prof. Widodo', email: 'widodo@fisip.ac.id', subject: 'Thesis Proposal Review', time: '2 days ago', read: true },
]

const recentActivity = [
  { action: 'Updated', target: 'About Me page', time: '30 min ago', color: 'bg-lavender-400' },
  { action: 'Published', target: 'ASEAN Research Paper', time: '2 hours ago', color: 'bg-teal-400' },
  { action: 'Received', target: 'New contact message', time: '5 hours ago', color: 'bg-blush-400' },
  { action: 'Added', target: 'Climate Diplomacy project', time: '1 day ago', color: 'bg-gold-400' },
  { action: 'Updated', target: 'Experience section', time: '2 days ago', color: 'bg-lavender-400' },
]

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-gray-800 m-0">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1 m-0">Welcome back, Shaffa. Here's your portfolio overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-${color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={20} className={`text-${color}-500`} />
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  change.startsWith('+')
                    ? 'bg-teal-50 text-teal-600'
                    : change.startsWith('-')
                    ? 'bg-blush-50 text-blush-600'
                    : 'bg-gray-50 text-gray-500'
                }`}
              >
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800 m-0 font-heading">{value}</p>
            <p className="text-xs text-gray-400 m-0 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-800 m-0 font-heading">Recent Messages</h2>
            <button className="text-xs text-lavender-500 font-semibold bg-transparent border-none cursor-pointer hover:text-lavender-700 transition-colors">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentMessages.map((msg, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${
                  !msg.read ? 'bg-gradient-to-br from-lavender-400 to-teal-400' : 'bg-gray-200 text-gray-500'
                }`}>
                  {msg.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-700 m-0 truncate">{msg.name}</p>
                    {!msg.read && <span className="w-2 h-2 bg-lavender-500 rounded-full shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 m-0 truncate">{msg.subject}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-gray-400 flex items-center gap-1">
                    <HiOutlineClock size={12} />
                    {msg.time}
                  </span>
                  <button className="p-1 rounded-lg text-gray-300 hover:text-gray-500 hover:bg-gray-100 bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                    <HiOutlineDotsVertical size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-800 m-0 font-heading">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-100" />
              <div className="space-y-5">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="relative flex items-start gap-4 pl-6">
                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ${activity.color} border-3 border-white shadow-sm`} />
                    <div>
                      <p className="text-sm text-gray-700 m-0">
                        <span className="font-medium">{activity.action}</span>{' '}
                        <span className="text-gray-500">{activity.target}</span>
                      </p>
                      <p className="text-[11px] text-gray-400 m-0 mt-0.5 flex items-center gap-1">
                        <HiOutlineClock size={10} />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Edit Portfolio', desc: 'Update your pages and content', color: 'from-lavender-500 to-lavender-600' },
          { label: 'Add Project', desc: 'Showcase a new project or research', color: 'from-teal-500 to-teal-600' },
          { label: 'View Analytics', desc: 'See detailed traffic reports', color: 'from-gold-500 to-gold-600' },
        ].map((action) => (
          <button
            key={action.label}
            className={`p-5 rounded-2xl bg-gradient-to-r ${action.color} text-white text-left border-none cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}
          >
            <p className="text-sm font-semibold m-0">{action.label}</p>
            <p className="text-xs opacity-80 m-0 mt-1">{action.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
