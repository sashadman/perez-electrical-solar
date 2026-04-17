import heroSolar from '../assets/placeholders/hero-solar.jpg'
import serviceElectrical from '../assets/placeholders/service-electrical.jpg'
import serviceSolar from '../assets/placeholders/service-solar.jpg'

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
            src={heroSolar}
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
            src={serviceSolar}
            alt="Electrical repair service"
            className="card-image"
          />
          <h4>Electrical Repairs</h4>
          <p>
            Fast troubleshooting, panel work, rewiring, breaker upgrades, and
            safe electrical repairs.
          </p>
        </article>

        <article className="card">
          <img
            src={serviceElectrical}
            alt="Electrical maintenance project"
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