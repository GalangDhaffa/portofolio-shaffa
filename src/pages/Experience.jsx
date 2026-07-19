import { useState, useEffect } from 'react'
import SectionHeading from '../components/SectionHeading'
import { FiCalendar, FiMapPin, FiUsers, FiStar } from 'react-icons/fi'
import { getItems } from '../utils/dataStore'

const typeColors = {
  Leadership: { bg: 'bg-lavender-50 dark:bg-lavender-900/30', text: 'text-lavender-600 dark:text-lavender-300', border: 'border-lavender-200 dark:border-lavender-800' },
  'Event Management': { bg: 'bg-teal-50 dark:bg-teal-900/30', text: 'text-teal-600 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
  Research: { bg: 'bg-gold-50 dark:bg-gold-900/30', text: 'text-gold-600 dark:text-gold-300', border: 'border-gold-200 dark:border-gold-800' },
  'Community Service': { bg: 'bg-blush-50 dark:bg-blush-900/30', text: 'text-blush-600 dark:text-blush-300', border: 'border-blush-200 dark:border-blush-800' },
  Competition: { bg: 'bg-cream-100 dark:bg-cream-900/30', text: 'text-gold-700 dark:text-gold-400', border: 'border-cream-300 dark:border-cream-800' },
}

export default function Experience() {
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exp = await getItems('experiences')
        setExperiences([...exp].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)))
      } catch (error) {
        console.error("Error fetching experiences:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-cream-50 to-lavender-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-10 right-10 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4 border border-teal-100 dark:border-slate-700">
            Organizational Experience
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-gray-800 dark:text-white mb-4 animate-fade-in-up">
            Leadership & Engagement
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A collection of meaningful roles and contributions in student organizations, 
            research institutions, and community initiatives.
          </p>
        </div>
      </section>

      {/* ── Experience Timeline ── */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-lavender-300 via-teal-300 to-gold-300" />

            <div className="space-y-10">
              {experiences.map((exp, i) => {
                const colors = typeColors[exp.type] || typeColors.Leadership
                return (
                  <div key={i} className="relative pl-14 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Timeline Dot */}
                    <div className="absolute left-[16px] top-2 w-3 h-3 bg-gradient-to-br from-lavender-400 to-teal-400 rounded-full border-4 border-white dark:border-slate-900 shadow z-10" />

                    {/* Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-all duration-500 group">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <span className={`inline-block px-2.5 py-1 rounded-lg ${colors.bg} ${colors.text} text-[11px] font-semibold uppercase tracking-wider mb-2`}>
                            {exp.type}
                          </span>
                          <h3 className="text-xl font-semibold font-heading text-gray-800 dark:text-white m-0 group-hover:text-lavender-700 dark:group-hover:text-lavender-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-medium text-teal-600 dark:text-teal-400 mt-1 m-0">{exp.org}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-xs text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={12} />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiMapPin size={12} />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{exp.desc}</p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                          <FiStar size={12} className="text-gold-500" />
                          Key Achievements
                        </p>
                        <ul className="m-0 pl-0 list-none space-y-1.5">
                          {exp.achievements.map((ach, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Summary Stats ── */}
      <section className="py-16 bg-gradient-to-r from-lavender-500 to-teal-500 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 dark:bg-lavender-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 dark:bg-teal-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: experiences.length, label: 'Total Experience', icon: FiUsers },
              { value: new Set(experiences.map(e => e.org)).size, label: 'Organizations', icon: FiUsers },
              { value: new Set(experiences.map(e => e.type).filter(Boolean)).size, label: 'Fields', icon: FiStar },
              { value: experiences.reduce((sum, e) => sum + (Array.isArray(e.achievements) ? e.achievements.length : 0), 0), label: 'Achievements', icon: FiStar },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center text-white rounded-2xl p-6 bg-white/10 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700 shadow-lg hover:bg-white/20 dark:hover:bg-slate-700/60 hover:scale-105 transition-all duration-300">
                <Icon size={22} className="mx-auto mb-3 opacity-80" />
                <p className="text-3xl font-bold font-heading m-0">{value}{value > 0 ? '+' : ''}</p>
                <p className="text-sm opacity-80 m-0 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
