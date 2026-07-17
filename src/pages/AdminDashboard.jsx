import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  HiOutlineEye,
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineTrendingUp,
  HiOutlineClock,
  HiOutlineDotsVertical,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiPlus,
  HiPencil,
  HiTrash,
  HiX
} from 'react-icons/hi'
import { getItems, addItem, updateItem, deleteItem, getViews, getProfile, updateProfile } from '../utils/dataStore'

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'Overview'

  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [educations, setEducations] = useState([])
  const [values, setValues] = useState([])
  const [profile, setProfile] = useState({})
  const [views, setViews] = useState(0)
  const [profileForm, setProfileForm] = useState({})
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('') // 'Project', 'Skill', 'Experience'
  const [editingItem, setEditingItem] = useState(null)
  
  // Form States
  const [formData, setFormData] = useState({})

  const dynamicStats = [
    { label: 'Total Projects', value: projects.length, icon: HiOutlineBriefcase, color: 'lavender' },
    { label: 'Total Skills', value: skills.length, icon: HiOutlineDocumentText, color: 'teal' },
    { label: 'Experiences', value: experiences.length, icon: HiOutlineUser, color: 'gold' },
    { label: 'Total Views', value: views.toLocaleString(), icon: HiOutlineEye, color: 'blush' },
  ]

  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = () => {
    setProjects(getItems('projects'))
    setSkills(getItems('skills'))
    setExperiences(getItems('experiences'))
    setEducations(getItems('educations'))
    setValues(getItems('values'))
    setViews(getViews())
    
    const prof = getProfile()
    setProfile(prof)
    setProfileForm(prof)
  }

  const handleProfileSave = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    refreshData()
    alert('Profile saved successfully!')
  }

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)
    if (item) {
      setFormData(item)
    } else {
      if (type === 'Project') setFormData({ title: '', category: 'Project', description: '', tags: '' })
      if (type === 'Skill') setFormData({ name: '', level: 50 })
      if (type === 'Experience') setFormData({ title: '', org: '', period: '', location: '', type: 'Leadership', desc: '', achievements: '' })
      if (type === 'Education') setFormData({ year: '', title: '', org: '', desc: '' })
      if (type === 'Value') setFormData({ title: '', desc: '', icon: '', color: 'lavender' })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({})
  }

  const handleSave = (e) => {
    e.preventDefault()
    let key = modalType.toLowerCase() + 's'
    if (modalType === 'Experience') key = 'experiences'
    if (modalType === 'Education') key = 'educations'
    if (modalType === 'Value') key = 'values'

    let finalData = { ...formData }
    if (modalType === 'Project' && typeof finalData.tags === 'string') {
      finalData.tags = finalData.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    if (modalType === 'Experience' && typeof finalData.achievements === 'string') {
      finalData.achievements = finalData.achievements.split('\n').map(t => t.trim()).filter(Boolean)
    }

    if (editingItem) {
      updateItem(key, editingItem.id, finalData)
    } else {
      addItem(key, finalData)
    }
    refreshData()
    closeModal()
  }

  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      let key = type.toLowerCase() + 's'
      if (type === 'Experience') key = 'experiences'
      if (type === 'Education') key = 'educations'
      if (type === 'Value') key = 'values'
      deleteItem(key, id)
      refreshData()
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-gray-800 m-0">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1 m-0">Welcome back, Shaffa. Manage your portfolio here.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {['Overview', 'Profile', 'Projects', 'Skills', 'Experience', 'Education', 'Values'].map(tab => (
          <button
            key={tab}
            onClick={() => setSearchParams({ tab })}
            className={`pb-3 px-2 text-sm font-semibold transition-all border-b-2 bg-transparent cursor-pointer ${
              activeTab === tab 
                ? 'border-lavender-500 text-lavender-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB: OVERVIEW */}
      {activeTab === 'Overview' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {dynamicStats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-${color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={`text-${color}-500`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 m-0 font-heading">{value}</p>
              <p className="text-xs text-gray-400 m-0 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB: PROFILE */}
      {activeTab === 'Profile' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold font-heading m-0">Profile Settings</h2>
            <p className="text-sm text-gray-500 m-0 mt-1">Update your photos and About text.</p>
          </div>
          
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Home Photo</label>
                <input 
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors" 
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => setProfileForm({...profileForm, homePhotoUrl: reader.result})
                      reader.readAsDataURL(file)
                    }
                  }} 
                />
                {profileForm.homePhotoUrl && <img src={profileForm.homePhotoUrl} alt="Preview" className="mt-3 h-20 rounded shadow-sm object-cover" />}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">About Photo</label>
                <input 
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors" 
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => setProfileForm({...profileForm, aboutPhotoUrl: reader.result})
                      reader.readAsDataURL(file)
                    }
                  }} 
                />
                {profileForm.aboutPhotoUrl && <img src={profileForm.aboutPhotoUrl} alt="Preview" className="mt-3 h-20 rounded shadow-sm object-cover" />}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700">Academic Journey (About Page)</label>
              <textarea 
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors" 
                rows="4" 
                value={profileForm.academicJourney || ''} 
                onChange={e => setProfileForm({...profileForm, academicJourney: e.target.value})} 
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="px-6 py-2.5 bg-lavender-500 hover:bg-lavender-600 rounded-xl text-white font-semibold cursor-pointer border-none transition-colors shadow-md shadow-lavender-200 hover:shadow-lg hover:-translate-y-0.5">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB: PROJECTS */}
      {activeTab === 'Projects' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0">Manage Projects</h2>
            <button onClick={() => openModal('Project')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Project
            </button>
          </div>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 m-0">{p.title}</h3>
                  <p className="text-xs text-gray-500 m-0 mt-1">{p.category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Project', p)} className="p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Project', p.id)} className="p-2 text-blush-600 bg-blush-50 rounded-lg hover:bg-blush-100 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SKILLS */}
      {activeTab === 'Skills' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0">Manage Skills</h2>
            <button onClick={() => openModal('Skill')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Skill
            </button>
          </div>
          <div className="space-y-4">
            {skills.map(s => (
              <div key={s.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 m-0">{s.name}</h3>
                  <div className="w-32 h-2 bg-gray-100 rounded-full mt-2"><div className="h-full bg-lavender-400 rounded-full" style={{ width: `${s.level}%` }}></div></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Skill', s)} className="p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Skill', s.id)} className="p-2 text-blush-600 bg-blush-50 rounded-lg hover:bg-blush-100 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: EXPERIENCE */}
      {activeTab === 'Experience' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0">Manage Experience</h2>
            <button onClick={() => openModal('Experience')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {experiences.map(e => (
              <div key={e.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 m-0">{e.title}</h3>
                  <p className="text-xs text-gray-500 m-0 mt-1">{e.org} • {e.period}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Experience', e)} className="p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Experience', e.id)} className="p-2 text-blush-600 bg-blush-50 rounded-lg hover:bg-blush-100 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: EDUCATION */}
      {activeTab === 'Education' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0">Manage Education</h2>
            <button onClick={() => openModal('Education')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Education
            </button>
          </div>
          <div className="space-y-4">
            {educations.map(e => (
              <div key={e.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 m-0">{e.title}</h3>
                  <p className="text-xs text-gray-500 m-0 mt-1">{e.org} • {e.year}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Education', e)} className="p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Education', e.id)} className="p-2 text-blush-600 bg-blush-50 rounded-lg hover:bg-blush-100 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: VALUES */}
      {activeTab === 'Values' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0">Manage My Values</h2>
            <button onClick={() => openModal('Value')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Value
            </button>
          </div>
          <div className="space-y-4">
            {values.map(v => (
              <div key={v.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{v.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 m-0">{v.title}</h3>
                    <p className="text-xs text-gray-500 m-0 mt-1">{v.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Value', v)} className="p-2 text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Value', v.id)} className="p-2 text-blush-600 bg-blush-50 rounded-lg hover:bg-blush-100 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL (Shared for all entities) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold font-heading text-gray-800 m-0">
                {editingItem ? 'Edit' : 'Add'} {modalType}
              </h2>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"><HiX size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              {/* Project Fields */}
              {modalType === 'Project' && (
                <>
                  <div>
                    <label className="text-sm font-semibold block mb-1">Project Image</label>
                    <input 
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border rounded" 
                      onChange={e => {
                        const file = e.target.files[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => setFormData({...formData, image: reader.result})
                          reader.readAsDataURL(file)
                        }
                      }} 
                    />
                    {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-16 rounded object-cover" />}
                  </div>
                  <div><label className="text-sm font-semibold block mb-1">Emoji (Fallback if no image)</label><input className="w-full p-2 border rounded" placeholder="e.g. 🌍" value={formData.emoji || ''} onChange={e => setFormData({...formData, emoji: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Title</label><input required className="w-full p-2 border rounded" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Category</label><input required className="w-full p-2 border rounded" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Description</label><textarea required className="w-full p-2 border rounded" rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Tags (comma separated)</label><input className="w-full p-2 border rounded" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')} onChange={e => setFormData({...formData, tags: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Primary Link / Document URL (Optional)</label><input type="url" placeholder="https://..." className="w-full p-2 border rounded" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Secondary / Reference URL (Optional)</label><input type="url" placeholder="https://..." className="w-full p-2 border rounded" value={formData.repoUrl || ''} onChange={e => setFormData({...formData, repoUrl: e.target.value})} /></div>
                </>
              )}

              {/* Skill Fields */}
              {modalType === 'Skill' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1">Skill Name</label><input required className="w-full p-2 border rounded" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Level (0-100)</label><input type="number" min="0" max="100" required className="w-full p-2 border rounded" value={formData.level || 50} onChange={e => setFormData({...formData, level: e.target.value})} /></div>
                </>
              )}

              {/* Experience Fields */}
              {modalType === 'Experience' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1">Title / Role</label><input required className="w-full p-2 border rounded" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Organization</label><input required className="w-full p-2 border rounded" value={formData.org || ''} onChange={e => setFormData({...formData, org: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Period</label><input required className="w-full p-2 border rounded" value={formData.period || ''} onChange={e => setFormData({...formData, period: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Location</label><input className="w-full p-2 border rounded" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Type</label><input className="w-full p-2 border rounded" value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Description</label><textarea required className="w-full p-2 border rounded" rows="2" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Achievements (1 per line)</label><textarea className="w-full p-2 border rounded" rows="4" value={Array.isArray(formData.achievements) ? formData.achievements.join('\n') : (formData.achievements || '')} onChange={e => setFormData({...formData, achievements: e.target.value})} /></div>
                </>
              )}

              {/* Education Fields */}
              {modalType === 'Education' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1">Year / Period</label><input required className="w-full p-2 border rounded" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Degree / Title</label><input required className="w-full p-2 border rounded" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Institution</label><input required className="w-full p-2 border rounded" value={formData.org || ''} onChange={e => setFormData({...formData, org: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Description</label><textarea required className="w-full p-2 border rounded" rows="3" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} /></div>
                </>
              )}

              {/* Value Fields */}
              {modalType === 'Value' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1">Icon (Emoji or text)</label><input required className="w-full p-2 border rounded" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Title</label><input required className="w-full p-2 border rounded" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1">Description</label><textarea required className="w-full p-2 border rounded" rows="3" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} /></div>
                  <div>
                    <label className="text-sm font-semibold block mb-1">Theme Color</label>
                    <select className="w-full p-2 border rounded" value={formData.color || 'lavender'} onChange={e => setFormData({...formData, color: e.target.value})}>
                      <option value="lavender">Lavender</option>
                      <option value="teal">Teal</option>
                      <option value="blush">Blush</option>
                      <option value="gold">Gold</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-semibold cursor-pointer border-none transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-lavender-500 hover:bg-lavender-600 rounded-lg text-white font-semibold cursor-pointer border-none transition-colors">Save {modalType}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
