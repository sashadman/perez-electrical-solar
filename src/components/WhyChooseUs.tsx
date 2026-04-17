import aboutProject from '../assets/placeholders/about-project.jpg'
import serviceElectrical from '../assets/placeholders/service-electrical.jpg'
import serviceSolar from '../assets/placeholders/service-solar.jpg'

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
    image: serviceSolar,
    text: 'Clean, efficient installations designed to support long-term energy savings and dependable performance.',
    testimonial: 'They made the process simple and professional from start to finish.',
    author: 'Homeowner Testimonial',
  },
  {
    title: 'Fast Electrical Repair Support',
    category: 'Electrical Service',
    image: serviceElectrical,
    text: 'From troubleshooting to upgrades, the goal is safe, responsive service that keeps homes and businesses running.',
    testimonial: 'Quick response, clear communication, and the work was done right.',
    author: 'Customer Feedback',
  },
  {
    title: 'Service Built on Trust',
    category: 'Why Clients Choose Us',
    image: aboutProject,
    text: 'Clients want reliable work, honest guidance, and a company that treats every project with care and attention.',
    testimonial: 'Professional, respectful, and easy to work with. I would recommend them again.',
    author: 'Client Review',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="grid-section">
      <div className="section-kicker">Why Choose Us</div>
      <h3>Service you can trust, shown through real project stories</h3>
      <p>
        This section can later be updated with real customer photos, testimonials,
        and short stories from completed work.
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