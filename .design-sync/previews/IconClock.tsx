import { IconClock } from 'imaginary-cakes'

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 32, padding: '32px 40px', background: '#FAF6F1', borderRadius: 16, alignItems: 'flex-end' }}>
    {[18, 24, 36].map(size => (
      <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <IconClock size={size} style={{ color: '#2C1810' }} />
        <span style={{ fontSize: 10, fontFamily: 'system-ui', color: '#8B6F5E' }}>{size}px</span>
      </div>
    ))}
  </div>
)

export const WithLabel = () => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#FAF6F1', borderRadius: 8 }}>
    <IconClock size={18} style={{ color: '#2C1810', flexShrink: 0 }} />
    <span style={{ fontFamily: 'system-ui', fontSize: 14, color: '#2C1810' }}>Mon – Sat, 10am – 3pm</span>
  </div>
)
