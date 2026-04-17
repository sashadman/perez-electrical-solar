import perezLogo from '../assets/perez-logo.png'
import heroVideo from '../assets/hero-video.mp4'

export default function Hero() {
  return (
    <section className="hero-banner-simple">
      <video
        className="hero-banner-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <img
        src={perezLogo}
        alt="Perez Electrical & Solar logo"
        className="hero-corner-logo"
      />

      <div className="hero-banner-content">
      
        <h1>Perez Electrical & Solar</h1>
        <p className="hero-banner-text">
          Trusted solar installation, electrical repairs, panel upgrades, and dependable service.
        </p>

        <div className="hero-actions">
          <a className="primary-btn" href="#contact">Request a Free Quote</a>
          <a className="secondary-btn" href="#services">View Services</a>
        </div>
      </div>
    </section>
  )
}