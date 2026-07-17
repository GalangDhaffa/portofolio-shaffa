import { FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ title, category, description, tags, image, emoji, liveUrl, repoUrl }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-lavender-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-lavender-100 to-teal-50">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {emoji ? (
              <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{emoji}</span>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lavender-200 to-teal-200 opacity-50" />
            )}
          </div>
        )}
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] font-semibold text-lavender-600 uppercase tracking-wider shadow-sm">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 m-0 font-heading group-hover:text-lavender-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-cream-100 text-[11px] font-medium text-gold-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-50">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lavender-50 text-lavender-600 text-xs font-medium no-underline hover:bg-lavender-100 transition-colors duration-200"
            >
              <FiExternalLink size={12} />
              View Document
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500 text-xs font-medium no-underline hover:bg-gray-100 transition-colors duration-200"
            >
              <FiExternalLink size={12} />
              Reference Link
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
