import './App.css'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import About from './components/About'
import Contact from './components/Contact'
import { FaInstagram, FaFacebookF, FaGoogle } from 'react-icons/fa'
import ChatWidget from './components/ChatWidget'

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/',
    label: 'Instagram',
    icon: <FaInstagram />,
  },
  {
    href: 'https://www.facebook.com/',
    label: 'Facebook',
    icon: <FaFacebookF />,
  },
  {
    href: 'https://www.google.com/',
    label: 'Google',
    icon: <FaGoogle />,
  },
]

function App() {
  return (
    <div className="app-shell">
      <Hero />

      <main>
        <Services />
        <WhyChooseUs />
        <About />
        <Contact />
      </main>

      <footer className="site-footer">
        <div className="social-links">
          {SOCIAL_LINKS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="social-icon"
            >
              {icon}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Perez Electrical &amp; Solar. All rights reserved.</p>
      </footer>
      <ChatWidget />
    </div>
  )
}

export default App