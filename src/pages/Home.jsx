import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiDownload, FiMapPin, FiBookOpen } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { getItems, getProfile } from '../utils/dataStore'
import SectionHeading from '../components/SectionHeading'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])
  const [values, setValues] = useState([])
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proj, exp, skl, val, prof] = await Promise.all([
          getItems('projects'),
          getItems('experiences'),
          getItems('skills'),
          getItems('values'),
          getProfile()
        ])
        
        // Sort by createdAt descending (newest first). 
        // Fallback to 0 for old data that doesn't have createdAt yet.
        const sortByNewest = (arr) => [...arr].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))

        setProjects(sortByNewest(proj))
        setExperiences(sortByNewest(exp))
        setSkills(sortByNewest(skl))
        setValues(sortByNewest(val))
        setProfile(prof)
      } catch (error) {
        console.error("Error fetching home data:", error)
      }
    }
    fetchData()
  }, [])

  const projectsCount = projects.length
  const skillsCount = skills.length
  const orgCount = experiences.length

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" style={{ animationDelay: '1s', animation: 'float 4s ease-in-out infinite' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blush-100/15 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-3 h-3 bg-gold-300 rounded-full opacity-60 animate-float" />
          <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-lavender-400 rounded-full opacity-50" style={{ animation: 'float 3.5s ease-in-out infinite' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lavender-50 dark:bg-slate-800 border border-lavender-100 dark:border-slate-700 text-lavender-600 dark:text-lavender-300 text-xs font-semibold">
                <HiOutlineSparkles size={14} />
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 text-gray-800 dark:text-white">
              {profile.homeGreeting || "Hi, I'm"}{' '}
              <span className="bg-gradient-to-r from-lavender-500 via-blush-400 to-teal-500 bg-clip-text text-transparent">
                {profile.homeNameHighlight || "Shaffanadia"}
              </span>
              <br />
              {profile.homeNameSub || "Alfia Zahwah"}
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
              {profile.homeDescription || (
                <>
                  International Relations student at <strong className="text-teal-700">FISIP</strong>,
                  passionate about diplomacy, global affairs, and creating meaningful impact through
                  research and community engagement.
                </>
              )}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lavender-500 to-lavender-600 text-white font-semibold text-sm no-underline shadow-md shadow-lavender-500/20 dark:shadow-none hover:shadow-lg hover:shadow-lavender-500/30 dark:hover:shadow-lg dark:hover:shadow-lavender-900/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                View My Work
                <FiArrowRight size={16} />
              </Link>
              {profile.cvLink && (
                <a
                  href={profile.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-lavender-600 dark:text-lavender-300 font-semibold text-sm no-underline border border-lavender-200 dark:border-lavender-800 hover:bg-lavender-50 dark:hover:bg-slate-700 hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-lavender-500/10 dark:shadow-lavender-900/10 hover:shadow-lg hover:shadow-lavender-500/20 dark:hover:shadow-lavender-900/20"
                >
                  <FiDownload size={16} />
                  Download CV
                </a>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8">
              {[
                { value: projectsCount > 0 ? `${projectsCount}+` : projectsCount, label: 'Projects' },
                { value: orgCount > 0 ? `${orgCount}+` : orgCount, label: 'Experience' },
                { value: skillsCount > 0 ? `${skillsCount}+` : skillsCount, label: 'Skills' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold font-heading text-lavender-600 m-0">{stat.value}</p>
                  <p className="text-xs text-gray-400 m-0 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Avatar/Visual */}
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Decorative Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-lavender-200 via-blush-100 to-teal-200 opacity-60 blur-sm" />

              {/* Avatar Container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-lavender-100 via-cream-50 to-teal-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border-4 border-white dark:border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
                {profile.homePhotoUrl ? (
                  <img src={profile.homePhotoUrl} alt="Shaffanadia" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-lavender-300 to-teal-300 flex items-center justify-center">
                      <span className="text-4xl font-heading font-bold text-white">SA</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-600 font-heading">Shaffanadia</p>
                    <p className="text-xs text-gray-400">Alfia Zahwah</p>
                  </div>
                )}
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-2 -right-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-lavender-100 dark:border-lavender-900 flex items-center gap-1.5 animate-float">
                <FiMapPin size={12} className="text-blush-400" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Indonesia</span>
              </div>
              <div className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-teal-100 dark:border-teal-900 flex items-center gap-1.5" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }}>
                <FiBookOpen size={12} className="text-teal-500" />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">IR Student</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Preview ── */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-50 dark:bg-slate-800 text-lavender-600 dark:text-lavender-300 text-xs font-semibold uppercase tracking-widest mb-4 border border-lavender-100 dark:border-slate-700">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 dark:text-white mb-3">
              Passionate About Global Impact
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
              {profile.academicJourney || 'Welcome to my portfolio!'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {values.slice(0, 3).map((item) => (
              <div
                key={item.id || item.title}
                className={`p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:shadow-lavender-500/10 dark:hover:shadow-lavender-900/20 hover:-translate-y-1 transition-all duration-500 animate-fade-in-up cursor-default`}
              >
                <span className="text-3xl block mb-4">{item.icon || '✨'}</span>
                <h3 className="text-lg font-semibold font-heading text-gray-800 dark:text-white mb-2 m-0">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed m-0">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-lavender-600 font-semibold text-sm no-underline hover:text-lavender-700 hover:gap-3 transition-all duration-300"
            >
              Learn more about me
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects Preview ── */}
      <section className="py-20 bg-gradient-to-b from-white to-cream-50 dark:from-slate-900 dark:to-slate-800/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-50 dark:bg-slate-800 text-lavender-600 dark:text-lavender-300 text-xs font-semibold uppercase tracking-widest mb-4 border border-lavender-100 dark:border-slate-700">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 dark:text-white mb-3">
              Projects & Research
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
              A selection of my most impactful projects and research contributions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id || project.title}
                className="group bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden border border-lavender-100/60 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 animate-fade-in-up flex flex-col"
              >
                {project.image ? (
                  <div className="h-40 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-lavender-100 to-teal-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center text-2xl">
                      {project.emoji || '✨'}
                    </div>
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2 m-0 font-heading group-hover:text-lavender-700 dark:group-hover:text-lavender-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 m-0 flex-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {(project.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-cream-100 dark:bg-slate-700 text-[11px] font-medium text-gold-700 dark:text-gold-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-lavender-600 font-semibold text-sm no-underline hover:text-lavender-700 hover:gap-3 transition-all duration-300"
            >
              View All Projects
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-gradient-to-br from-lavender-500 via-lavender-600 to-teal-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 dark:bg-lavender-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading !text-white mb-4">
              Let's Connect & Collaborate
            </h2>
            <p className="text-white text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Whether it's research collaboration, organizational partnerships, or just a conversation
              about global affairs — I'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-lavender-600 dark:bg-lavender-500 dark:text-white font-semibold text-sm no-underline shadow-lg shadow-lavender-500/20 dark:shadow-none hover:shadow-xl hover:shadow-lavender-500/30 dark:hover:bg-lavender-600 dark:hover:shadow-lg dark:hover:shadow-lavender-900/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get In Touch
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
