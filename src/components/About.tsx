import aboutUsPage from '../assets/real/aboutus-page.jpg'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-kicker">About Us</div>
      <h3>Local service with a focus on quality, safety, and trust</h3>

      <div className="about-layout">
        <div className="about-panel">
          <p>
            Perez Electrical & Solar serves homeowners and small businesses with
            dependable electrical and solar solutions.
          </p>

          <p>
            The focus is on clean installations, honest service, and practical
            energy solutions that help clients protect their property and reduce
            long-term energy costs.
          </p>

          <ul>
            <li>Licensed electrical service</li>
            <li>Residential and small business support</li>
            <li>Solar installation and upgrades</li>
            <li>Reliable maintenance and repair work</li>
          </ul>
        </div>

        <div className="about-image">
          <img
            src={aboutUsPage}
            alt="About Perez Electrical and Solar"
          />
        </div>
      </div>
    </section>
  )
}