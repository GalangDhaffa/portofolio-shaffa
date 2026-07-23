import { db } from './firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc, increment } from 'firebase/firestore'

export const initialData = {
  projects: [
    {
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
    { name: 'Diplomatic Negotiation', level: 90 },
    { name: 'Policy Analysis', level: 85 },
    { name: 'Research & Writing', level: 92 },
    { name: 'Public Speaking', level: 88 },
    { name: 'Data Analysis', level: 75 },
    { name: 'Project Management', level: 82 },
  ],
  experiences: [
    {
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
    { year: '2023 – Present', title: 'International Relations Student', org: 'FISIP – Faculty of Social & Political Sciences', desc: 'Pursuing a Bachelor\'s degree in International Relations with a focus on Southeast Asian politics and multilateral diplomacy.' },
    { year: '2022 – 2023', title: 'Student Exchange Program', org: 'Partner University', desc: 'Participated in a cultural and academic exchange program, studying comparative politics and global governance.' },
    { year: '2021 – 2022', title: 'High School Diploma', org: 'Senior High School', desc: 'Graduated with honors in Social Sciences, active in debate club and Model United Nations.' },
  ],
  values: [
    { title: 'Global Perspective', desc: 'Understanding diverse cultures and international systems to foster cooperation.', icon: '🌏', color: 'lavender' },
    { title: 'Collaboration', desc: 'Building bridges between communities, organizations, and nations.', icon: '🤝', color: 'teal' },
    { title: 'Empathy', desc: 'Leading with compassion and cultural sensitivity in every interaction.', icon: '💖', color: 'blush' },
    { title: 'Impact-Driven', desc: 'Focusing on meaningful outcomes that create lasting positive change.', icon: '🎯', color: 'gold' },
  ],
  profile: {
    homePhotoUrl: '',
    aboutPhotoUrl: '',
    academicJourney: 'As an International Relations student, I combine academic rigor with hands-on organizational experience to understand and contribute to global discourse.',
    homeGreeting: "Hi, I'm",
    homeNameHighlight: "Shaffanadia",
    homeNameSub: "Alfia Zahwah",
    homeDescription: "International Relations student at FISIP, passionate about diplomacy, global affairs, and creating meaningful impact through research and community engagement.",
    cvLink: "",
    contactEmail: "shaffanadia.alfia@university.ac.id",
    contactPhone: "+62 812 XXXX XXXX",
    contactLocation: "Indonesia",
    telegramBotToken: "",
    telegramChatId: "",
    socialLinks: []
  }
}

export const initializeDB = async () => {
  // Check if profile exists, if not, we assume DB is empty and populate it
  const profileRef = doc(db, 'metadata', 'profile')
  const profileSnap = await getDoc(profileRef)
  
  if (!profileSnap.exists()) {
    console.log("Initializing database with dummy data...")
    await setDoc(profileRef, initialData.profile)
    
    const collectionsToInit = ['projects', 'skills', 'experiences', 'educations', 'values']
    for (const collName of collectionsToInit) {
      const collRef = collection(db, collName)
      for (const item of initialData[collName]) {
        await addDoc(collRef, item)
      }
    }
    
    const statsRef = doc(db, 'metadata', 'stats')
    await setDoc(statsRef, { views_count: 0 })
    console.log("Database initialized successfully!")
  }
}

export const getProfile = async () => {
  const profileRef = doc(db, 'metadata', 'profile')
  const profileSnap = await getDoc(profileRef)
  if (profileSnap.exists()) {
    return profileSnap.data()
  }
  return initialData.profile
}

export const updateProfile = async (updatedProfile) => {
  const profileRef = doc(db, 'metadata', 'profile')
  await setDoc(profileRef, updatedProfile, { merge: true })
}

export const getViews = async () => {
  const statsRef = doc(db, 'metadata', 'stats')
  const statsSnap = await getDoc(statsRef)
  if (statsSnap.exists()) {
    return statsSnap.data().views_count || 0
  }
  return 0
}

export const incrementViews = async () => {
  const statsRef = doc(db, 'metadata', 'stats')
  await setDoc(statsRef, { views_count: increment(1) }, { merge: true })
}

export const getItems = async (collectionName) => {
  const collRef = collection(db, collectionName)
  const snapshot = await getDocs(collRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const addItem = async (collectionName, itemData) => {
  const collRef = collection(db, collectionName)
  const docRef = await addDoc(collRef, itemData)
  return { id: docRef.id, ...itemData }
}

export const updateItem = async (collectionName, id, updatedData) => {
  const docRef = doc(db, collectionName, id)
  await updateDoc(docRef, updatedData)
}

export const deleteItem = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id)
  await deleteDoc(docRef)
}
