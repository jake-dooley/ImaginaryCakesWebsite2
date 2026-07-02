import { GoldButton } from 'imaginary-cakes'

export const Default = () => (
  <div style={{ padding: '32px 40px', background: '#FAF6F1', borderRadius: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <GoldButton>Start Your Order</GoldButton>
    <GoldButton>Get In Touch</GoldButton>
    <GoldButton>View Gallery</GoldButton>
  </div>
)

export const Disabled = () => (
  <div style={{ padding: '32px 40px', background: '#FAF6F1', borderRadius: 16 }}>
    <GoldButton disabled>Unavailable</GoldButton>
  </div>
)

export const OnDark = () => (
  <div style={{ padding: '32px 40px', background: '#2C1810', borderRadius: 16 }}>
    <GoldButton>Start Your Order</GoldButton>
  </div>
)
