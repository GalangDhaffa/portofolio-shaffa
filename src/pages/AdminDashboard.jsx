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
  HiOutlineMail,
  HiPlus,
  HiPencil,
  HiTrash,
  HiX
} from 'react-icons/hi'
import { getItems, addItem, updateItem, deleteItem, getViews, getProfile, updateProfile } from '../utils/dataStore'
import Swal from '../utils/swalTheme'

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

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
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
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

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const [proj, skl, exp, edu, val, viewCount, prof, msgs] = await Promise.all([
        getItems('projects'),
        getItems('skills'),
        getItems('experiences'),
        getItems('educations'),
        getItems('values'),
        getViews(),
        getProfile(),
        getItems('messages')
      ])
      setProjects(proj)
      setSkills(skl)
      setExperiences(exp)
      setEducations(edu)
      setValues(val)
      setViews(viewCount)
      setProfile(prof)
      setProfileForm(prof)
      setMessages(msgs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')))
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await updateProfile(profileForm)
      await refreshData()
      Swal.fire({
        title: 'Success!',
        text: 'Profile saved successfully.',
        icon: 'success',
        confirmButtonColor: '#8b5cf6', // lavender-500
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      console.error("Error saving profile:", error)
      Swal.fire({
        title: 'Error!',
        text: "Failed to save profile. Ensure the image is not too large. Error: " + error.message,
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      })
    } finally {
      setIsLoading(false)
    }
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

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
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

    try {
      if (editingItem) {
        await updateItem(key, editingItem.id, finalData)
      } else {
        await addItem(key, { ...finalData, createdAt: Date.now() })
      }
      await refreshData()
      setIsModalOpen(false)
      Swal.fire({
        title: 'Success!',
        text: `${modalType} saved successfully.`,
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error("Error saving:", error)
      Swal.fire({
        title: 'Error!',
        text: "Failed to save. Error: " + error.message,
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      })
      setIsLoading(false)
    }
  }

  const handleDelete = async (type, id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this ${type}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // red-500 for delete
      cancelButtonColor: '#8b5cf6', // lavender-500
      confirmButtonText: 'Yes, delete it!'
    })
    
    if (!result.isConfirmed) return
    
    setIsLoading(true)
    let key = type.toLowerCase() + 's'
    if (type === 'Experience') key = 'experiences'
    if (type === 'Education') key = 'educations'
    if (type === 'Value') key = 'values'
    if (type === 'Message') key = 'messages'
    
    try {
      await deleteItem(key, id)
      await refreshData()
      Swal.fire({
        title: 'Deleted!',
        text: `${type} has been deleted.`,
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error("Error deleting:", error)
      Swal.fire({
        title: 'Error!',
        text: "Failed to delete item.",
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-gray-800 dark:text-white m-0">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 m-0">Welcome back, Shaffa. Manage your portfolio here.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-slate-800 overflow-x-auto whitespace-nowrap pb-1">
        {['Overview', 'Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map(tab => (
          <button
            key={tab}
            onClick={() => setSearchParams({ tab })}
            className={`pb-3 px-2 text-sm font-semibold transition-all border-b-2 bg-transparent cursor-pointer ${
              activeTab === tab 
                ? 'border-lavender-500 text-lavender-600 dark:text-lavender-400' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-lavender-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* TAB: OVERVIEW */}
      {activeTab === 'Overview' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {dynamicStats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-${color}-50 dark:bg-${color}-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} className={`text-${color}-500 dark:text-${color}-400`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white m-0 font-heading">{value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 m-0 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB: HOME */}
      {activeTab === 'Home' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Home Page Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">Manage your front page content and CV link.</p>
          </div>
          
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Home Photo</label>
              <input 
                type="file"
                accept="image/*"
                className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                onChange={async e => {
                  const file = e.target.files[0]
                  if (file) {
                    try {
                      const compressedBase64 = await compressImage(file)
                      setProfileForm({...profileForm, homePhotoUrl: compressedBase64})
                    } catch (err) {
                      Swal.fire({ title: 'Error', text: 'Failed to process image', icon: 'error' })
                    }
                  }
                }} 
              />
              {profileForm.homePhotoUrl && <img src={profileForm.homePhotoUrl} alt="Preview" className="mt-3 h-20 rounded shadow-sm object-cover" />}
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Greeting</label>
                <input 
                  type="text"
                  maxLength={20}
                  placeholder="Contoh: Halo, saya"
                  className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                  value={profileForm.homeGreeting || ''} 
                  onChange={e => setProfileForm({...profileForm, homeGreeting: e.target.value})} 
                />
                <p className="text-[10px] text-gray-400 mt-1">Max 20 chars</p>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Name Highlight</label>
                <input 
                  type="text"
                  maxLength={20}
                  placeholder="Contoh: Shaffanadia"
                  className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                  value={profileForm.homeNameHighlight || ''} 
                  onChange={e => setProfileForm({...profileForm, homeNameHighlight: e.target.value})} 
                />
                <p className="text-[10px] text-gray-400 mt-1">Max 20 chars</p>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Name Subtitle</label>
                <input 
                  type="text"
                  maxLength={30}
                  placeholder="Contoh: Alfia Zahwah"
                  className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                  value={profileForm.homeNameSub || ''} 
                  onChange={e => setProfileForm({...profileForm, homeNameSub: e.target.value})} 
                />
                <p className="text-[10px] text-gray-400 mt-1">Max 30 chars</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Description</label>
              <textarea 
                className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                rows="3" 
                maxLength={180}
                placeholder="Contoh: Mahasiswa Hubungan Internasional di FISIP, sangat tertarik dengan diplomasi global..."
                value={profileForm.homeDescription || ''} 
                onChange={e => setProfileForm({...profileForm, homeDescription: e.target.value})} 
              />
              <p className="text-[10px] text-gray-400 mt-1 text-right">Max 180 chars</p>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">CV / Resume Link (Google Drive, etc.)</label>
              <input 
                type="url"
                placeholder="Contoh: https://drive.google.com/file/d/.../view"
                className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                value={profileForm.cvLink || ''} 
                onChange={e => setProfileForm({...profileForm, cvLink: e.target.value})} 
              />
              <p className="text-[10px] text-gray-400 mt-1">Leave empty to hide the Download CV button</p>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="px-6 py-2.5 bg-lavender-500 hover:bg-lavender-600 rounded-xl text-white font-semibold cursor-pointer border-none transition-colors shadow-md shadow-lavender-200 hover:shadow-lg hover:-translate-y-0.5">
                Save Home Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB: ABOUT */}
      {activeTab === 'About' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold font-heading m-0 dark:text-white">About Page Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">Update your about photo and academic journey.</p>
          </div>
          
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">About Photo</label>
              <input 
                type="file"
                accept="image/*"
                className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                onChange={async e => {
                  const file = e.target.files[0]
                  if (file) {
                    try {
                      const compressedBase64 = await compressImage(file)
                      setProfileForm({...profileForm, aboutPhotoUrl: compressedBase64})
                    } catch (err) {
                      Swal.fire({ title: 'Error', text: 'Failed to process image', icon: 'error' })
                    }
                  }
                }} 
              />
              {profileForm.aboutPhotoUrl && <img src={profileForm.aboutPhotoUrl} alt="Preview" className="mt-3 h-20 rounded shadow-sm object-cover" />}
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Academic Journey (About Page)</label>
              <textarea 
                className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                rows="4" 
                placeholder="Contoh: Saya adalah mahasiswa Hubungan Internasional yang sangat tertarik dengan kebijakan publik dan diplomasi..."
                value={profileForm.academicJourney || ''} 
                onChange={e => setProfileForm({...profileForm, academicJourney: e.target.value})} 
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="px-6 py-2.5 bg-lavender-500 hover:bg-lavender-600 rounded-xl text-white font-semibold cursor-pointer border-none transition-colors shadow-md shadow-lavender-200 hover:shadow-lg hover:-translate-y-0.5">
                Save About Settings
              </button>
            </div>
          </form>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Manage Education</h2>
              <button onClick={() => openModal('Education')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
                <HiPlus /> Add Education
              </button>
            </div>
            <div className="space-y-4 mb-10">
              {educations.map(e => (
                <div key={e.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white m-0">{e.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 m-0 mt-1">{e.org} • {e.year}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openModal('Education', e)} className="p-2 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 border-none cursor-pointer"><HiPencil /></button>
                    <button onClick={() => handleDelete('Education', e.id)} className="p-2 text-blush-600 dark:text-blush-400 bg-blush-50 dark:bg-blush-900/30 rounded-lg hover:bg-blush-100 dark:hover:bg-blush-900/50 border-none cursor-pointer"><HiTrash /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Manage My Values</h2>
              <button onClick={() => openModal('Value')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
                <HiPlus /> Add Value
              </button>
            </div>
            <div className="space-y-4">
              {values.map(v => (
                <div key={v.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{v.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white m-0">{v.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 m-0 mt-1">{v.desc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openModal('Value', v)} className="p-2 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 border-none cursor-pointer"><HiPencil /></button>
                    <button onClick={() => handleDelete('Value', v.id)} className="p-2 text-blush-600 dark:text-blush-400 bg-blush-50 dark:bg-blush-900/30 rounded-lg hover:bg-blush-100 dark:hover:bg-blush-900/50 border-none cursor-pointer"><HiTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: PROJECTS */}
      {activeTab === 'Projects' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Manage Projects</h2>
            <button onClick={() => openModal('Project')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Project
            </button>
          </div>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white m-0">{p.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 m-0 mt-1">{p.category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Project', p)} className="p-2 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Project', p.id)} className="p-2 text-blush-600 dark:text-blush-400 bg-blush-50 dark:bg-blush-900/30 rounded-lg hover:bg-blush-100 dark:hover:bg-blush-900/50 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SKILLS */}
      {activeTab === 'Skills' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Manage Skills</h2>
            <button onClick={() => openModal('Skill')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Skill
            </button>
          </div>
          <div className="space-y-4">
            {skills.map(s => (
              <div key={s.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white m-0">{s.name}</h3>
                  <div className="w-64 sm:w-80 h-2 bg-gray-200 rounded-full mt-2"><div className="h-full bg-lavender-400 rounded-full" style={{ width: `${s.level}%` }}></div></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Skill', s)} className="p-2 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Skill', s.id)} className="p-2 text-blush-600 dark:text-blush-400 bg-blush-50 dark:bg-blush-900/30 rounded-lg hover:bg-blush-100 dark:hover:bg-blush-900/50 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: EXPERIENCE */}
      {activeTab === 'Experience' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Manage Experience</h2>
            <button onClick={() => openModal('Experience')} className="flex items-center gap-2 px-4 py-2 bg-lavender-500 text-white rounded-lg text-sm font-semibold hover:bg-lavender-600 cursor-pointer border-none transition-colors">
              <HiPlus /> Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {experiences.map(e => (
              <div key={e.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white m-0">{e.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 m-0 mt-1">{e.org} • {e.period}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('Experience', e)} className="p-2 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 border-none cursor-pointer"><HiPencil /></button>
                  <button onClick={() => handleDelete('Experience', e.id)} className="p-2 text-blush-600 dark:text-blush-400 bg-blush-50 dark:bg-blush-900/30 rounded-lg hover:bg-blush-100 dark:hover:bg-blush-900/50 border-none cursor-pointer"><HiTrash /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: CONTACT */}
      {activeTab === 'Contact' && (
        <div className="space-y-8">
          {/* Contact Settings */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Contact Settings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">Update your contact info and social links.</p>
            </div>
            
            <form onSubmit={handleProfileSave} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Email</label>
                  <input 
                    type="email"
                    placeholder="Contoh: email@contoh.com"
                    className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                    value={profileForm.contactEmail || ''} 
                    onChange={e => setProfileForm({...profileForm, contactEmail: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Phone</label>
                  <input 
                    type="text"
                    placeholder="Contoh: +62 812 3456 7890"
                    className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                    value={profileForm.contactPhone || ''} 
                    onChange={e => setProfileForm({...profileForm, contactPhone: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-2 text-gray-700 dark:text-gray-300">Location</label>
                  <input 
                    type="text"
                    placeholder="Contoh: Jakarta, Indonesia"
                    className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                    value={profileForm.contactLocation || ''} 
                    onChange={e => setProfileForm({...profileForm, contactLocation: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">Social Links</label>
                  <button 
                    type="button"
                    onClick={() => {
                      const links = Array.isArray(profileForm.socialLinks) ? [...profileForm.socialLinks] : []
                      links.push({ name: '', url: '' })
                      setProfileForm({...profileForm, socialLinks: links})
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-lavender-50 text-lavender-600 rounded-lg text-xs font-semibold hover:bg-lavender-100 cursor-pointer border border-lavender-200 transition-colors"
                  >
                    <HiPlus size={14} /> Add Link
                  </button>
                </div>
                {(Array.isArray(profileForm.socialLinks) ? profileForm.socialLinks : []).length === 0 && (
                  <p className="text-xs text-gray-400 italic">No social links added yet. Click "Add Link" to get started.</p>
                )}
                <div className="space-y-3">
                  {(Array.isArray(profileForm.socialLinks) ? profileForm.socialLinks : []).map((link, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input 
                          type="text"
                          placeholder="Contoh: Instagram, LinkedIn, WhatsApp"
                          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white transition-colors mb-2" 
                          value={link.name || ''} 
                          onChange={e => {
                            const links = [...profileForm.socialLinks]
                            links[idx] = { ...links[idx], name: e.target.value }
                            setProfileForm({...profileForm, socialLinks: links})
                          }} 
                        />
                        <input 
                          type="url"
                          placeholder="https://..."
                          className="w-full p-2.5 border border-gray-200 dark:border-slate-700 rounded-lg text-sm bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-gray-200" 
                          value={link.url || ''} 
                          onChange={e => {
                            const links = [...profileForm.socialLinks]
                            links[idx] = { ...links[idx], url: e.target.value }
                            setProfileForm({...profileForm, socialLinks: links})
                          }} 
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          const links = profileForm.socialLinks.filter((_, i) => i !== idx)
                          setProfileForm({...profileForm, socialLinks: links})
                        }}
                        className="p-2 text-blush-600 bg-blush-50 rounded-lg hover:bg-blush-100 border-none cursor-pointer mt-1"
                      >
                        <HiTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-lavender-500 hover:bg-lavender-600 rounded-xl text-white font-semibold cursor-pointer border-none transition-colors shadow-md shadow-lavender-200 hover:shadow-lg hover:-translate-y-0.5">
                  Save Contact Settings
                </button>
              </div>
            </form>
          </div>

          {/* Message Inbox */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-lg font-bold font-heading m-0 dark:text-white">Message Inbox</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">{messages.length} message{messages.length !== 1 ? 's' : ''} received</p>
              </div>
            </div>
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <HiOutlineMail size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-400 m-0">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`p-5 border rounded-xl transition-colors ${msg.read ? 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800' : 'border-lavender-200 dark:border-lavender-900/50 bg-lavender-50/30 dark:bg-lavender-900/20'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white m-0 text-sm">{msg.subject}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 m-0 mt-1">
                          From: <span className="font-medium text-gray-700 dark:text-gray-200">{msg.name}</span> ({msg.email})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-lavender-500" />}
                        <button onClick={() => handleDelete('Message', msg.id)} className="p-1.5 text-blush-600 dark:text-blush-400 bg-blush-50 dark:bg-blush-900/30 rounded-lg hover:bg-blush-100 dark:hover:bg-blush-900/50 border-none cursor-pointer">
                          <HiTrash size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 m-0 leading-relaxed whitespace-pre-line">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}


        </>
      )}

      {/* MODAL (Shared for all entities) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-xl font-bold font-heading text-gray-800 dark:text-white m-0">
                {editingItem ? 'Edit' : 'Add'} {modalType}
              </h2>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-transparent border-none cursor-pointer"><HiX size={20} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              
              {/* Project Fields */}
              {modalType === 'Project' && (
                <>
                  <div>
                    <label className="text-sm font-semibold block mb-1 dark:text-gray-300">Project Image</label>
                    <input 
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" 
                      onChange={async e => {
                        const file = e.target.files[0]
                        if (file) {
                          try {
                            const compressedBase64 = await compressImage(file)
                            setFormData({...formData, image: compressedBase64})
                          } catch (err) {
                            Swal.fire({ title: 'Error', text: 'Failed to process image', icon: 'error' })
                          }
                        }
                      }} 
                    />
                    {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-16 rounded object-cover" />}
                  </div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Emoji (Fallback if no image)</label><input className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" placeholder="e.g. 🌍" value={formData.emoji || ''} onChange={e => setFormData({...formData, emoji: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Title</label><input required placeholder="Contoh: Peran Indonesia di KTT G20" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Category</label><input required placeholder="Contoh: Penelitian & Diplomasi" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Description</label><textarea required placeholder="Contoh: Analisis komprehensif mengenai kebijakan luar negeri Indonesia pada KTT G20 di Bali." className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" rows="3" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Tags (comma separated)</label><input placeholder="Contoh: Kebijakan, G20, Indonesia" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')} onChange={e => setFormData({...formData, tags: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Primary Link / Document URL (Optional)</label><input type="url" placeholder="https://..." className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Secondary / Reference URL (Optional)</label><input type="url" placeholder="https://..." className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.repoUrl || ''} onChange={e => setFormData({...formData, repoUrl: e.target.value})} /></div>
                </>
              )}

              {/* Skill Fields */}
              {modalType === 'Skill' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Skill Name</label><input required placeholder="Contoh: Public Speaking" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Level (0-100)</label><input type="number" min="0" max="100" required placeholder="Contoh: 85" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.level || 50} onChange={e => setFormData({...formData, level: e.target.value})} /></div>
                </>
              )}

              {/* Experience Fields */}
              {modalType === 'Experience' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Title / Role</label><input required placeholder="Contoh: Delegasi Indonesia" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Organization</label><input required placeholder="Contoh: Model United Nations (MUN) UI" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.org || ''} onChange={e => setFormData({...formData, org: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Period</label><input required placeholder="Contoh: 2024 – Sekarang" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.period || ''} onChange={e => setFormData({...formData, period: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Location</label><input placeholder="Contoh: Jakarta, Indonesia" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Type</label><input placeholder="Contoh: Kepemimpinan" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Description</label><textarea required placeholder="Contoh: Mewakili Indonesia dalam simulasi Dewan Keamanan PBB..." className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" rows="2" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Achievements (1 per line)</label><textarea placeholder="Contoh: Penghargaan Delegasi Terbaik Indonesia&#10;Menginisiasi resolusi keamanan Asia Tenggara" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" rows="4" value={Array.isArray(formData.achievements) ? formData.achievements.join('\n') : (formData.achievements || '')} onChange={e => setFormData({...formData, achievements: e.target.value})} /></div>
                </>
              )}

              {/* Education Fields */}
              {modalType === 'Education' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Year / Period</label><input required placeholder="Contoh: 2023 – 2027" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Degree / Title</label><input required placeholder="Contoh: Sarjana Hubungan Internasional" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Institution</label><input required placeholder="Contoh: Universitas Indonesia" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.org || ''} onChange={e => setFormData({...formData, org: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Description</label><textarea required placeholder="Contoh: Fokus pada diplomasi Asia Tenggara dan keamanan internasional." className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" rows="3" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} /></div>
                </>
              )}

              {/* Value Fields */}
              {modalType === 'Value' && (
                <>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Icon (Emoji or text)</label><input required placeholder="Contoh: 🌏" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Title</label><input required placeholder="Contoh: Diplomasi & Kebijakan" className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
                  <div><label className="text-sm font-semibold block mb-1 dark:text-gray-300">Description</label><textarea required placeholder="Contoh: Mengeksplorasi kerangka kebijakan internasional..." className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" rows="3" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} /></div>
                  <div>
                    <label className="text-sm font-semibold block mb-1 dark:text-gray-300">Theme Color</label>
                    <select className="w-full p-2 border dark:border-slate-700 rounded dark:bg-slate-800 dark:text-white" value={formData.color || 'lavender'} onChange={e => setFormData({...formData, color: e.target.value})}>
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
