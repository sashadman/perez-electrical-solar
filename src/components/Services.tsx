import roofSolar from '../assets/real/roof-solar.jpg'
import electricWork from '../assets/real/electric-work.jpg'
import powerInstallation from '../assets/real/power-installation.jpg'

export default function Services() {
  return (
    <section id="services" className="grid-section">
      <div className="section-kicker">Our Services</div>
      <h3>Electrical and solar solutions built for reliability</h3>
      <p>
        We help homeowners and small businesses with quality installations,
        repairs, upgrades, and ongoing system support.
      </p>

      <div className="cards">
        <article className="card">
          <img
            src={roofSolar}
            alt="Solar panel installation service"
            className="card-image"
          />
          <h4>Solar Installation</h4>
          <p>
            Design and installation of efficient solar systems for homes and
            small commercial properties.
          </p>
        </article>

        <article className="card">
          <img
            src={electricWork}
            alt="Electrical repair service"
            className="card-image"
            style={{ objectPosition: 'center top' }}
          />
          <h4>Electrical Repairs</h4>
          <p>
            Fast troubleshooting, panel work, rewiring, breaker upgrades, and
            safe electrical repairs.
          </p>
        </article>

        <article className="card">
          <img
            src={powerInstallation}
            alt="Electrical installation and maintenance"
            className="card-image"
          />
          <h4>Preventive Maintenance</h4>
          <p>
            Ongoing maintenance to keep electrical systems and solar equipment
            running smoothly.
          </p>
        </article>
      </div>
    </section>
  )
}