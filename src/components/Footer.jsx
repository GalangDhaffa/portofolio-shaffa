import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-cream-50 to-lavender-50 border-t border-lavender-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="no-underline">
              <h3 className="font-heading text-2xl font-semibold text-lavender-800 m-0">
                Shaffanadia<span className="text-teal-500">.</span>
              </h3>
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              International Relations · FISIP
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-lavender-600 no-underline transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { icon: FiGithub, href: '#', label: 'GitHub' },
              { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:shaffanadia@example.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white border border-lavender-100 flex items-center justify-center text-lavender-400 hover:text-white hover:bg-lavender-500 hover:border-lavender-500 shadow-sm transition-all duration-300 hover:-translate-y-1 no-underline"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-lavender-200 to-transparent mb-6" />

        {/* Bottom */}
        <p className="text-center text-xs text-gray-400">
          © {currentYear} Shaffanadia Alfia Zahwah. Crafted with{' '}
          <FiHeart className="inline text-blush-400 align-middle" size={12} />{' '}
          and dedication.
        </p>
      </div>
    </footer>
  )
}
