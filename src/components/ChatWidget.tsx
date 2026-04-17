import { useMemo, useState} from 'react'
import { FaComments, FaPaperPlane } from 'react-icons/fa'

type Sender = 'assistant' | 'user'
type Stage = 'idle' | 'name' | 'email' | 'phone' | 'service' | 'details' | 'done'

type Message = {
  id: number
  sender: Sender
  text: string
}

type Lead = {
  name: string
  email: string
  phone: string
  service: string
  details: string
}

const businessEmail = 'perezelectricalandsolar@gmail.com'

const serviceOptions = [
  'Solar Installation',
  'Electrical Repairs',
  'Panel Upgrades',
  'Maintenance',
  'Other',
]

const quickAnswers: Record<string, string> = {
  Services:
    'We help with solar installation, electrical repairs, panel upgrades, and maintenance for homes and small businesses.',
  'Free Quote':
    'Yes — we can help collect your project details and prepare a quote request for the business.',
  'Solar Timeline':
    'Typical solar projects depend on site conditions and approvals, but the team can provide a project-specific estimate after reviewing your needs.',
  Repairs:
    'Yes — electrical troubleshooting, repairs, and upgrades can be discussed through the contact form or chat summary.',
}

const welcomeMessages: Message[] = [
  {
    id: 1,
    sender: 'assistant',
    text: 'Hi — I’m the website assistant for Perez Electrical & Solar. I can answer a few common questions or help you start a quote request.',
  },
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(welcomeMessages)
  const [input, setInput] = useState('')
  const [stage, setStage] = useState<Stage>('idle')
  const [lead, setLead] = useState<Lead>({
    name: '',
    email: '',
    phone: '',
    service: '',
    details: '',
  })
  const [askedTopics, setAskedTopics] = useState<string[]>([])

  const addMessage = (sender: Sender, text: string) => {
    setMessages((current) => [
      ...current,
      {
        id: Date.now() + Math.floor(Math.random() * 1000),
        sender,
        text,
      },
    ])
  }

  const addTopic = (topic: string) => {
    setAskedTopics((current) =>
      current.includes(topic) ? current : [...current, topic]
    )
  }

  const startQuoteFlow = () => {
    if (stage !== 'idle') return
    addMessage('assistant', 'Great — let’s get started. What is your name?')
    setStage('name')
  }

  const handleQuickAnswer = (topic: string) => {
    addMessage('user', topic)
    addMessage('assistant', quickAnswers[topic])
    addTopic(topic)
  }

  const detectTopic = (value: string) => {
    const lower = value.toLowerCase()

    if (lower.includes('service')) return 'Services'
    if (lower.includes('quote') || lower.includes('estimate')) return 'Free Quote'
    if (lower.includes('solar') || lower.includes('timeline')) return 'Solar Timeline'
    if (lower.includes('repair')) return 'Repairs'

    return null
  }

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value)
  const isValidPhone = (value: string) => value.replace(/\D/g, '').length >= 10

  const finishLead = (details: string) => {
    const updatedLead = { ...lead, details }
    setLead(updatedLead)
    setStage('done')

    addMessage(
      'assistant',
      `Thanks — I’ve prepared the summary.\n\nName: ${updatedLead.name}\nEmail: ${updatedLead.email}\nPhone: ${updatedLead.phone}\nService: ${updatedLead.service}\nProject details: ${updatedLead.details}\n\nUse the button below to email this summary to the business.`
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = input.trim()
    if (!value) return

    addMessage('user', value)
    setInput('')

    if (stage === 'idle') {
      const detected = detectTopic(value)

      if (detected) {
        addMessage('assistant', quickAnswers[detected])
        addTopic(detected)
        return
      }

      if (
        value.toLowerCase().includes('quote') ||
        value.toLowerCase().includes('project') ||
        value.toLowerCase().includes('help')
      ) {
        addMessage('assistant', 'Happy to help. What is your name?')
        setStage('name')
        return
      }

      addMessage(
        'assistant',
        'I can answer common questions or help start a quote. Try a quick question, or type "quote" to begin.'
      )
      return
    }

    if (stage === 'name') {
      setLead((current) => ({ ...current, name: value }))
      setStage('email')
      addMessage('assistant', 'Thanks. What is your email address?')
      return
    }

    if (stage === 'email') {
      if (!isValidEmail(value)) {
        addMessage('assistant', 'Please enter a valid email address.')
        return
      }

      setLead((current) => ({ ...current, email: value }))
      setStage('phone')
      addMessage('assistant', 'Got it. What is your phone number?')
      return
    }

    if (stage === 'phone') {
      if (!isValidPhone(value)) {
        addMessage('assistant', 'Please enter a valid phone number with at least 10 digits.')
        return
      }

      setLead((current) => ({ ...current, phone: value }))
      setStage('service')
      addMessage(
        'assistant',
        'Which service do you need? You can click one below or type it in.'
      )
      return
    }

    if (stage === 'service') {
      setLead((current) => ({ ...current, service: value }))
      setStage('details')
      addMessage(
        'assistant',
        'Please share a short description of the project or the questions you want the business to review.'
      )
      return
    }

    if (stage === 'details') {
      finishLead(value)
    }
  }

  const selectService = (service: string) => {
    addMessage('user', service)
    setLead((current) => ({ ...current, service }))
    setStage('details')
    addMessage(
      'assistant',
      'Please share a short description of the project or the questions you want the business to review.'
    )
  }

  const emailBody = useMemo(() => {
    const transcript = messages
      .map((message) => `${message.sender === 'assistant' ? 'Assistant' : 'Visitor'}: ${message.text}`)
      .join('\n')

    const topics = askedTopics.length ? askedTopics.join(', ') : 'None recorded'

    return [
      'New website chat summary',
      '',
      `Name: ${lead.name || 'Not provided'}`,
      `Email: ${lead.email || 'Not provided'}`,
      `Phone: ${lead.phone || 'Not provided'}`,
      `Service: ${lead.service || 'Not provided'}`,
      `Quick questions asked: ${topics}`,
      `Project details: ${lead.details || 'Not provided'}`,
      '',
      'Conversation transcript:',
      transcript,
    ].join('\n')
  }, [lead, messages, askedTopics])

  const sendSummaryEmail = () => {
    const subject = encodeURIComponent('New Website Chat Lead')
    const body = encodeURIComponent(emailBody)
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`
  }

  const resetChat = () => {
    setMessages(welcomeMessages)
    setInput('')
    setStage('idle')
    setLead({
      name: '',
      email: '',
      phone: '',
      service: '',
      details: '',
    })
    setAskedTopics([])
  }

  return (
    <div className="chat-widget">
      <button
        type="button"
        className="chat-btn"
        aria-label="Open chat"
        onClick={() => setIsOpen((current) => !current)}
      >
        <FaComments />
      </button>

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <strong>Perez Electrical & Solar</strong>
            <div className="chat-subtitle">Website assistant</div>
          </div>

          <div className="chat-panel-body">
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender === 'user' ? 'user' : ''}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            {stage === 'idle' && (
              <div className="chat-chips">
                <button type="button" className="chat-chip" onClick={startQuoteFlow}>
                  Start Quote
                </button>
                {Object.keys(quickAnswers).map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className="chat-chip"
                    onClick={() => handleQuickAnswer(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}

            {stage === 'service' && (
              <div className="chat-chips">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    className="chat-chip"
                    onClick={() => selectService(service)}
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}

            <form className="chat-form" onSubmit={handleSubmit}>
              <div className="chat-input-row">
                <input
                  type={
                    stage === 'email'
                      ? 'email'
                      : stage === 'phone'
                      ? 'tel'
                      : 'text'
                  }
                  className="chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                    stage === 'name'
                      ? 'Enter your name'
                      : stage === 'email'
                      ? 'Enter your email'
                      : stage === 'phone'
                      ? 'Enter your phone number'
                      : stage === 'service'
                      ? 'Type the service you need'
                      : stage === 'details'
                      ? 'Describe your project'
                      : 'Ask a question or type "quote"'
                  }
                />

                <button type="submit" className="chat-send" aria-label="Send message">
                  <FaPaperPlane />
                </button>
              </div>
            </form>

            <p className="chat-note">
              By submitting, you agree the business may contact you about your request.
            </p>

            {stage === 'done' && (
              <div className="chat-summary-actions">
                <button type="button" className="primary-btn" onClick={sendSummaryEmail}>
                  Email Summary
                </button>

                <button type="button" className="secondary-btn" onClick={resetChat}>
                  Start New Chat
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}