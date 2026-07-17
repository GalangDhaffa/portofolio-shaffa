export const initialData = {
  projects: [
    {
      id: 1,
      title: 'ASEAN Youth Forum Policy Report',
      category: 'Research',
      description: 'Comprehensive policy report analyzing youth engagement frameworks across ASEAN member states, with recommendations for inclusive policymaking.',
      tags: ['Policy Analysis', 'ASEAN', 'Youth'],
      image: null,
      emoji: '🌍',
      liveUrl: '#',
      repoUrl: null,
    },
    {
      id: 2,
      title: 'Climate Diplomacy in Southeast Asia',
      category: 'Research',
      description: 'Research paper exploring Indonesia\'s role in multilateral climate negotiations and the prospects for green diplomacy in the region.',
      tags: ['Climate', 'Diplomacy', 'Indonesia'],
      image: null,
      emoji: '🌱',
      liveUrl: '#',
      repoUrl: null,
    },
    {
      id: 3,
      title: 'Digital Diplomacy Seminar Platform',
      category: 'Project',
      description: 'Full event management and digital platform for the international seminar on "Digital Diplomacy in the Post-Pandemic Era" with 500+ attendees.',
      tags: ['Event', 'Digital', 'Platform'],
      image: null,
      emoji: '💻',
      liveUrl: '#',
      repoUrl: '#',
    },
    {
      id: 4,
      title: 'Community Empowerment Initiative',
      category: 'Community',
      description: 'Student-led program connecting rural communities with international development resources, focusing on education and skill development.',
      tags: ['Community', 'Development', 'Education'],
      image: null,
      emoji: '🤝',
      liveUrl: null,
      repoUrl: null,
    },
  ],
  skills: [
    { id: 1, name: 'Diplomatic Negotiation', level: 90 },
    { id: 2, name: 'Policy Analysis', level: 85 },
    { id: 3, name: 'Research & Writing', level: 92 },
    { id: 4, name: 'Public Speaking', level: 88 },
    { id: 5, name: 'Data Analysis', level: 75 },
    { id: 6, name: 'Project Management', level: 82 },
  ],
  experiences: [
    {
      id: 1,
      title: 'Head of External Affairs',
      org: 'FISIP Student Executive Board (BEM)',
      period: '2024 – Present',
      location: 'University Campus',
      type: 'Leadership',
      desc: 'Leading the external affairs division, managing inter-university partnerships, and coordinating with government agencies on student advocacy initiatives.',
      achievements: [
        'Established partnerships with 5 international student organizations',
        'Organized 3 national-level policy discussion forums',
        'Represented student body in university senate meetings',
      ],
    },
    {
      id: 2,
      title: 'Director of International Seminar',
      org: 'IR Student Association (HIMAHI)',
      period: '2023 – 2024',
      location: 'University Campus',
      type: 'Event Management',
      desc: 'Directed the planning and execution of an international seminar on "Digital Diplomacy in the Post-Pandemic Era" with 500+ participants.',
      achievements: [
        'Secured 4 international speakers from ASEAN embassies',
        'Managed a team of 25 organizing committee members',
        'Achieved 95% positive feedback from participants',
      ],
    },
    {
      id: 3,
      title: 'Research Assistant',
      org: 'Center for International Studies',
      period: '2023 – 2024',
      location: 'Research Center',
      type: 'Research',
      desc: 'Assisted senior researchers in data collection, literature review, and analysis for projects on regional security cooperation.',
      achievements: [
        'Co-authored 2 working papers on ASEAN security dynamics',
        'Conducted field interviews with 15+ policy practitioners',
      ],
    }
  ],
  educations: [
    { id: 1, year: '2023 – Present', title: 'International Relations Student', org: 'FISIP – Faculty of Social & Political Sciences', desc: 'Pursuing a Bachelor\'s degree in International Relations with a focus on Southeast Asian politics and multilateral diplomacy.' },
    { id: 2, year: '2022 – 2023', title: 'Student Exchange Program', org: 'Partner University', desc: 'Participated in a cultural and academic exchange program, studying comparative politics and global governance.' },
    { id: 3, year: '2021 – 2022', title: 'High School Diploma', org: 'Senior High School', desc: 'Graduated with honors in Social Sciences, active in debate club and Model United Nations.' },
  ],
  values: [
    { id: 1, title: 'Global Perspective', desc: 'Understanding diverse cultures and international systems to foster cooperation.', icon: '🌏', color: 'lavender' },
    { id: 2, title: 'Collaboration', desc: 'Building bridges between communities, organizations, and nations.', icon: '🤝', color: 'teal' },
    { id: 3, title: 'Empathy', desc: 'Leading with compassion and cultural sensitivity in every interaction.', icon: '💖', color: 'blush' },
    { id: 4, title: 'Impact-Driven', desc: 'Focusing on meaningful outcomes that create lasting positive change.', icon: '🎯', color: 'gold' },
  ],
  profile: {
    homePhotoUrl: '',
    aboutPhotoUrl: '',
    academicJourney: 'As an International Relations student, I combine academic rigor with hands-on organizational experience to understand and contribute to global discourse.',
  }
}

export const initializeDB = () => {
  if (!localStorage.getItem('shaffa_projects')) {
    localStorage.setItem('shaffa_projects', JSON.stringify(initialData.projects))
  }
  if (!localStorage.getItem('shaffa_skills')) {
    localStorage.setItem('shaffa_skills', JSON.stringify(initialData.skills))
  }
  if (!localStorage.getItem('shaffa_experiences')) {
    localStorage.setItem('shaffa_experiences', JSON.stringify(initialData.experiences))
  }
  if (!localStorage.getItem('shaffa_educations')) {
    localStorage.setItem('shaffa_educations', JSON.stringify(initialData.educations))
  }
  if (!localStorage.getItem('shaffa_values')) {
    localStorage.setItem('shaffa_values', JSON.stringify(initialData.values))
  }
  if (!localStorage.getItem('shaffa_profile')) {
    localStorage.setItem('shaffa_profile', JSON.stringify(initialData.profile))
  }
  
  incrementViews()
}

export const getProfile = () => {
  const profile = localStorage.getItem('shaffa_profile')
  return profile ? JSON.parse(profile) : initialData.profile
}

export const updateProfile = (updatedProfile) => {
  localStorage.setItem('shaffa_profile', JSON.stringify(updatedProfile))
}

export const getViews = () => {
  const views = localStorage.getItem('shaffa_views_count')
  return views ? parseInt(views, 10) : 0
}

export const incrementViews = () => {
  const views = getViews()
  localStorage.setItem('shaffa_views_count', views + 1)
}

export const getItems = (key) => {
  const data = localStorage.getItem(`shaffa_${key}`)
  return data ? JSON.parse(data) : []
}

export const saveItems = (key, items) => {
  localStorage.setItem(`shaffa_${key}`, JSON.stringify(items))
}

export const addItem = (key, item) => {
  const items = getItems(key)
  const newItem = { ...item, id: Date.now() }
  saveItems(key, [...items, newItem])
  return newItem
}

export const updateItem = (key, id, updatedData) => {
  const items = getItems(key)
  const newItems = items.map(item => item.id === id ? { ...item, ...updatedData } : item)
  saveItems(key, newItems)
}

export const deleteItem = (key, id) => {
  const items = getItems(key)
  const newItems = items.filter(item => item.id !== id)
  saveItems(key, newItems)
}
