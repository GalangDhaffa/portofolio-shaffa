export default function SectionHeading({ label, title, description, align = 'center' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-50 dark:bg-slate-800 text-lavender-600 dark:text-lavender-300 text-xs font-semibold uppercase tracking-widest mb-4 border border-lavender-100 dark:border-slate-700">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 dark:text-white mb-3">
        {title}
      </h2>
      {description && (
        <p className={`text-gray-500 dark:text-gray-400 text-base max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
