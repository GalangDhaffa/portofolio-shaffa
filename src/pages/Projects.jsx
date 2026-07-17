import { useState, useEffect } from 'react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { FiSearch } from 'react-icons/fi'
import { getItems } from '../utils/dataStore'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setProjects(getItems('projects'))
  }, [])

  const categories = ['All', ...new Set(projects.map((p) => p.category))]

  const filteredProjects = projects.filter((p) => {
    const matchCategory = activeCategory === 'All' || p.category === activeCategory
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())))
    return matchCategory && matchSearch
  })

  return (
    <>
      {/* ── Hero ── */}
      <section className="py-20 bg-gradient-to-br from-gold-50 via-cream-50 to-lavender-50 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-56 h-56 bg-gold-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-50 text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-gold-200">
            Projects & Research
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-gray-800 mb-4 animate-fade-in-up">
            My Work & Contributions
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Explore my research papers, project initiatives, and community programs 
            that reflect my commitment to global affairs and social impact.
          </p>
        </div>
      </section>

      {/* ── Filters & Grid ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-lavender-500 text-white shadow-md shadow-lavender-200'
                      : 'bg-gray-50 text-gray-500 hover:bg-lavender-50 hover:text-lavender-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 w-full sm:w-72 border border-gray-100">
              <FiSearch size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-full font-sans"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filteredProjects.map((project) => (
                <div key={project.title} className="animate-fade-in-up">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lavender-50 flex items-center justify-center">
                <FiSearch size={24} className="text-lavender-300" />
              </div>
              <p className="text-gray-400 text-sm">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
