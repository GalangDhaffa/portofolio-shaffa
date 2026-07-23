import { useState, useEffect } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiYoutube, FiLink, FiFacebook } from 'react-icons/fi'
import { FaWhatsapp, FaTiktok, FaTelegram, FaDiscord } from 'react-icons/fa'
import { getProfile, addItem } from '../utils/dataStore'
import Swal from '../utils/swalTheme'

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await addItem('messages', {
        ...formData,
        createdAt: new Date().toISOString(),
        read: false
      })

      if (profile.telegramBotToken && profile.telegramChatId) {
        const text = `New Contact Message:\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
        try {
          await fetch(`https://api.telegram.org/bot${profile.telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: profile.telegramChatId,
              text: text
            })
          })
        } catch (tgError) {
          console.error("Failed to send to Telegram:", tgError)
        }
      }

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error("Error sending message:", error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send message. Please try again.',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      })
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: profile.contactEmail || 'shaffanadia.alfia@university.ac.id', href: profile.contactEmail ? `mailto:${profile.contactEmail}` : null },
    { icon: FiPhone, label: 'Phone', value: profile.contactPhone || '+62 812 XXXX XXXX', href: profile.contactPhone ? `tel:${profile.contactPhone.replace(/\s/g, '')}` : null },
    { icon: FiMapPin, label: 'Location', value: profile.contactLocation || 'Indonesia', href: null },
  ]

  const socials = Array.isArray(profile.socialLinks) ? profile.socialLinks.filter(s => s.url) : []

  return (
    <>
      {/* ── Hero ── */}
      <section className="py-20 bg-gradient-to-br from-blush-50 via-cream-50 to-lavender-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-10 right-10 w-48 h-48 bg-blush-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-lavender-50 dark:bg-slate-800 text-lavender-600 dark:text-lavender-300 text-xs font-semibold uppercase tracking-widest mb-4 border border-lavender-100 dark:border-slate-700">
            Contact Me
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-gray-800 dark:text-white mb-4 animate-fade-in-up">
            Let's Get In Touch
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Have a question, collaboration idea, or just want to say hello? 
            I'd love to hear from you. Fill out the form or reach out via social media.
          </p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <h2 className="text-2xl font-bold font-heading text-gray-800 dark:text-white mb-6">
                Contact Information
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>

              <div className="space-y-5 mb-10">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-lavender-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-lavender-100 dark:group-hover:bg-slate-700 transition-colors">
                      <Icon size={18} className="text-lavender-500 dark:text-lavender-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5 m-0">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-gray-700 dark:text-gray-200 no-underline hover:text-lavender-600 dark:hover:text-lavender-400 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 m-0">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              {socials.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Follow Me
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socials.map((social, idx) => {
                      const Icon = getSocialIcon(social.name)
                      return (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-white hover:bg-lavender-500 hover:border-lavender-500 transition-all duration-300 hover:-translate-y-0.5 no-underline"
                          title={social.name}
                        >
                          <Icon size={16} />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Decorative Card */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-lavender-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 border border-lavender-100/50 dark:border-slate-600">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 italic leading-relaxed m-0">
                  "The best way to understand the world is to engage with the people in it."
                </p>
                <p className="text-xs text-lavender-500 mt-2 m-0 font-semibold">— Shaffanadia Alfia Zahwah</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-cream-50/50 dark:bg-slate-800 rounded-2xl p-8 border border-cream-200/50 dark:border-slate-700">
                <h2 className="text-2xl font-bold font-heading text-gray-800 dark:text-white mb-6">
                  Send a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 flex items-center gap-3 animate-fade-in">
                    <FiCheckCircle className="text-teal-500 shrink-0" size={20} />
                    <p className="text-sm text-teal-700 dark:text-teal-300 m-0">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nama Anda"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-lavender-400 dark:focus:border-lavender-500 focus:ring-2 focus:ring-lavender-100 dark:focus:ring-lavender-900/50 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@anda.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-lavender-400 dark:focus:border-lavender-500 focus:ring-2 focus:ring-lavender-100 dark:focus:ring-lavender-900/50 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Tentang apa pesan ini?"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-lavender-400 dark:focus:border-lavender-500 focus:ring-2 focus:ring-lavender-100 dark:focus:ring-lavender-900/50 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-lavender-400 dark:focus:border-lavender-500 focus:ring-2 focus:ring-lavender-100 dark:focus:ring-lavender-900/50 transition-all resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-lavender-500 to-lavender-600 text-white font-semibold text-sm border-none cursor-pointer shadow-md shadow-lavender-500/20 dark:shadow-none hover:shadow-lg hover:shadow-lavender-500/30 dark:hover:shadow-lg dark:hover:shadow-lavender-900/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiSend size={16} />
                    )}
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
