import { useState } from 'react'
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiTwitter, FiCheckCircle } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="py-20 bg-gradient-to-br from-blush-50 via-cream-50 to-lavender-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-blush-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-lavender-200/15 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blush-50 text-blush-600 text-xs font-semibold uppercase tracking-widest mb-4 border border-blush-200">
            Contact Me
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-gray-800 mb-4 animate-fade-in-up">
            Let's Get In Touch
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Have a question, collaboration idea, or just want to say hello? 
            I'd love to hear from you. Fill out the form or reach out via social media.
          </p>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 animate-fade-in-up">
              <h2 className="text-2xl font-bold font-heading text-gray-800 mb-6">
                Contact Information
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                Feel free to reach out through any of these channels. I typically respond within 24 hours.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: FiMail, label: 'Email', value: 'shaffanadia.alfia@university.ac.id', href: 'mailto:shaffanadia.alfia@university.ac.id' },
                  { icon: FiPhone, label: 'Phone', value: '+62 812 XXXX XXXX', href: 'tel:+62812XXXXXXXX' },
                  { icon: FiMapPin, label: 'Location', value: 'Indonesia', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-lavender-50 flex items-center justify-center shrink-0 group-hover:bg-lavender-100 transition-colors">
                      <Icon size={18} className="text-lavender-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5 m-0">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-gray-700 no-underline hover:text-lavender-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-gray-700 m-0">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Follow Me
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: FiGithub, href: '#', label: 'GitHub' },
                    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                    { icon: FiTwitter, href: '#', label: 'Twitter' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-lavender-500 hover:border-lavender-500 transition-all duration-300 hover:-translate-y-0.5 no-underline"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative Card */}
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-lavender-50 to-teal-50 border border-lavender-100/50">
                <p className="text-sm font-medium text-gray-600 italic leading-relaxed m-0">
                  "The best way to understand the world is to engage with the people in it."
                </p>
                <p className="text-xs text-lavender-500 mt-2 m-0 font-semibold">— Shaffanadia Alfia Zahwah</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-cream-50/50 rounded-2xl p-8 border border-cream-200/50">
                <h2 className="text-2xl font-bold font-heading text-gray-800 mb-6">
                  Send a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center gap-3 animate-fade-in">
                    <FiCheckCircle className="text-teal-500 shrink-0" size={20} />
                    <p className="text-sm text-teal-700 m-0">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 transition-all resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-lavender-500 to-lavender-600 text-white font-semibold text-sm border-none cursor-pointer shadow-lg shadow-lavender-200 hover:shadow-xl hover:shadow-lavender-300 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FiSend size={16} />
                    Send Message
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
