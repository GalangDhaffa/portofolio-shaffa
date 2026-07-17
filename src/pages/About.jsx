import { useState, useEffect } from 'react'
import SectionHeading from '../components/SectionHeading'
import { FiAward, FiBookOpen, FiGlobe } from 'react-icons/fi'
import { getItems, getProfile } from '../utils/dataStore'

export default function About() {
  const [skills, setSkills] = useState([])
  const [profile, setProfile] = useState({})
  const [educations, setEducations] = useState([])
  const [values, setValues] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skl, edu, val, prof] = await Promise.all([
          getItems('skills'),
          getItems('educations'),
          getItems('values'),
          getProfile()
        ])
        setSkills(skl)
        const sortByNewest = (arr) => [...arr].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        setEducations(sortByNewest(edu))
        setValues(sortByNewest(val))
        setProfile(prof)
      } catch (error) {
        console.error("Error fetching about data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="relative py-24 bg-gradient-to-br from-lavender-50 via-cream-50 to-teal-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lavender-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="flex justify-center animate-fade-in-up">
              <div className="relative">
                <div className="w-64 h-72 rounded-3xl bg-gradient-to-br from-lavender-200 via-blush-100 to-teal-100 shadow-xl overflow-hidden border-4 border-white flex items-center justify-center">
                  {profile.aboutPhotoUrl ? (
                    <img src={profile.aboutPhotoUrl} alt="Shaffanadia" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-lavender-400 to-teal-400 flex items-center justify-center">
                        <span className="text-3xl font-heading font-bold text-white">SA</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-600 font-heading">Shaffanadia</p>
                      <p className="text-xs text-gray-400">Alfia Zahwah</p>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-xl bg-white shadow-lg border border-gold-100">
                  <div className="flex items-center gap-2">
                    <FiAward className="text-gold-500" size={16} />
                    <span className="text-xs font-semibold text-gray-700">Dean's List</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-50 text-lavender-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-lavender-100">
                About Me
              </span>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 mb-4">
                Shaffanadia Alfia Zahwah
              </h1>
              <p className="text-gray-500 leading-relaxed mb-4">
                I'm an International Relations student at <strong className="text-teal-700">FISIP</strong> with 
                a deep passion for understanding the complexities of global politics, diplomacy, and 
                cross-cultural communication.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6 whitespace-pre-line">
                {profile.academicJourney}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiBookOpen className="text-lavender-500" size={16} />
                  <span>IR Student</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiGlobe className="text-teal-500" size={16} />
                  <span>Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="My Values"
            title="What Drives Me"
            description="Core principles that guide my academic pursuits and professional aspirations."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {values.map(({ icon, title, desc, color }, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center animate-fade-in-up group"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-${color || 'lavender'}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{icon}</span>
                </div>
                <h3 className="text-base font-semibold font-heading text-gray-800 mb-2 m-0">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed m-0">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-20 bg-gradient-to-b from-white to-lavender-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            label="Skills"
            title="Competencies & Expertise"
            description="Key skills developed through academic training and practical experience."
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-xs font-semibold text-lavender-600">{skill.level}%</span>
                </div>
                <div className="w-full h-2.5 bg-lavender-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-lavender-400 to-teal-400 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education Timeline ── */}
      <section className="py-20 bg-cream-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            label="Education"
            title="Academic Journey"
            description="My educational path in international relations and social sciences."
          />
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[18px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-lavender-300 via-teal-300 to-gold-300" />
            
            <div className="space-y-8">
              {educations.map((item, i) => (
                <div key={item.id} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 bg-lavender-400 rounded-full border-4 border-cream-50 shadow-sm z-10 mt-2" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} animate-fade-in-up`}>
                    <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{item.year}</span>
                    <h3 className="text-lg font-semibold font-heading text-gray-800 mt-1 mb-1">{item.title}</h3>
                    <p className="text-sm font-medium text-lavender-600 mb-2">{item.org}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
