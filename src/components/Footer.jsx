import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiLink, FiFacebook, FiHeart } from 'react-icons/fi'
import { FaWhatsapp, FaTiktok, FaTelegram, FaDiscord } from 'react-icons/fa'
import { getProfile } from '../utils/dataStore'

const socialIconMap = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  x: FiTwitter,
  instagram: FiInstagram,
  youtube: FiYoutube,
  facebook: FiFacebook,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
  telegram: FaTelegram,
  discord: FaDiscord,
}

const getSocialIcon = (name) => {
  const key = (name || '').toLowerCase().trim()
  for (const [keyword, icon] of Object.entries(socialIconMap)) {
    if (key.includes(keyword)) return icon
  }
  return FiLink
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const prof = await getProfile()
        setProfile(prof)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [])

  const socials = Array.isArray(profile.socialLinks) ? profile.socialLinks.filter(s => s.url) : []

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
          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((social, idx) => {
                const Icon = getSocialIcon(social.name)
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="w-10 h-10 rounded-full bg-white border border-lavender-100 flex items-center justify-center text-lavender-400 hover:text-white hover:bg-lavender-500 hover:border-lavender-500 shadow-sm transition-all duration-300 hover:-translate-y-1 no-underline"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-lavender-200 to-transparent mb-6" />

        {/* Bottom */}
        <p className="text-center text-xs text-gray-400">
          © {currentYear} Shaffanadia Alfia Zahwah. Crafted by <a href="https://www.instagram.com/langz7z_/" className="text-lavender-500 no-underline hover:text-lavender-700 font-semibold transition-colors">Langz7z</a>.
        </p>
      </div>
    </footer>
  )
}
