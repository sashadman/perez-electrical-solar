import solarProject from '../assets/real/solar-project.jpg'
import reviewElectrical from '../assets/real/review-electrical.jpg'
import teslaCharger from '../assets/real/tesla-charger.jpg'

type StoryCard = {
  title: string
  category: string
  image: string
  text: string
  testimonial?: string
  author?: string
}

const stories: StoryCard[] = [
  {
    title: 'Reliable Solar Installation',
    category: 'Solar Project',
    image: solarProject,
    text: 'Clean, efficient installations designed to support long-term energy savings and dependable performance.',
    testimonial: 'Professional work and a smooth process from start to finish.',
    author: 'Homeowner Feedback',
  },
  {
    title: 'Trusted Electrical Service',
    category: 'Electrical Work',
    image: reviewElectrical,
    text: 'Responsive support, careful workmanship, and practical solutions for residential electrical needs.',
    testimonial: 'Clear communication, quality work, and a great overall experience.',
    author: 'Customer Review',
  },
  {
    title: 'Modern Energy Upgrades',
    category: 'EV & Power Solutions',
    image: teslaCharger,
    text: 'From upgrades to modern energy equipment, the goal is safe, dependable service that fits real homes and projects.',
    testimonial: 'Helpful, respectful, and easy to work with.',
    author: 'Client Testimonial',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="grid-section">
      <div className="section-kicker">Why Choose Us</div>
      <h3>Service you can trust, shown through real project stories</h3>
      <p>
        This section highlights project visuals, customer confidence, and the
        kind of service experience the business aims to provide.
      </p>

      <div className="story-grid">
        {stories.map((story) => (
          <article className="story-card" key={story.title}>
            <img src={story.image} alt={story.title} className="story-card-image" />

            <div className="story-card-content">
              <span className="story-card-category">{story.category}</span>
              <h4>{story.title}</h4>
              <p>{story.text}</p>

              {story.testimonial && (
                <blockquote className="story-quote">
                  “{story.testimonial}”
                </blockquote>
              )}

              {story.author && <div className="story-author">{story.author}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}