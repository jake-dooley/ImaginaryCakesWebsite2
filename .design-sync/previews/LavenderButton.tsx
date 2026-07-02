import { LavenderButton } from 'imaginary-cakes'

export const Default = () => (
  <div style={{ padding: '32px 40px', background: '#FAF6F1', borderRadius: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <LavenderButton>Get In Touch</LavenderButton>
    <LavenderButton>Send Message</LavenderButton>
  </div>
)

export const OnDark = () => (
  <div style={{ padding: '32px 40px', background: '#2C1810', borderRadius: 16 }}>
    <LavenderButton>Contact Us</LavenderButton>
  </div>
)
