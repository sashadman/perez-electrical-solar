import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-kicker">Contact Us</div>
      <h3>Start your project with a free quote</h3>
      <p>
        Reach out for solar installation, electrical repairs, upgrades, or
        general service questions. We help homeowners and small businesses with
        reliable electrical and solar solutions.
      </p>

      <div className="contact-layout">
        <div className="contact-card">
          <h4>Get in touch</h4>

          <div className="contact-list">
            <div className="contact-item">
              <strong>Phone</strong>
              <a href="tel:16198150518">(619) 815-0518</a>
            </div>

            <div className="contact-item">
              <strong>Email</strong>
              <a href="mailto:perezelectricalandsolar@gmail.com">
                perezelectricalandsolar@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-shell">
          <h4>Request a quote</h4>

          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="row">
                <input type="text" name="name" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email Address" required />
              </div>

              <div className="row">
                <input type="tel" name="phone" placeholder="Phone Number" required />
                <select name="service" required>
                  <option value="">Select a service</option>
                  <option value="solar-installation">Solar Installation</option>
                  <option value="electrical-repairs">Electrical Repairs</option>
                  <option value="panel-upgrades">Panel Upgrades</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us a little about your project"
                required
              />

              <button type="submit" className="primary-btn">
                Request Quote
              </button>
            </form>
          ) : (
            <div className="contact-success">
              <h4>Thank you</h4>
              <p>
                Your request has been received. The next step is wiring this form
                to the Vercel email backend so submissions can be sent directly
                to the owner.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}