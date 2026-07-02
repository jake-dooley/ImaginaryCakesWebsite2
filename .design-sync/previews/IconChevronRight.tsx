import { IconChevronRight } from 'imaginary-cakes'

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 32, padding: '32px 40px', background: '#FAF6F1', borderRadius: 16, alignItems: 'flex-end' }}>
    {[18, 24, 36].map(size => (
      <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <IconChevronRight size={size} style={{ color: '#2C1810' }} />
        <span style={{ fontSize: 10, fontFamily: 'system-ui', color: '#8B6F5E' }}>{size}px</span>
      </div>
    ))}
  </div>
)

export const OnDark = () => (
  <div style={{ display: 'flex', gap: 24, padding: '24px 32px', background: '#2C1810', borderRadius: 16, alignItems: 'center' }}>
    <IconChevronRight size={24} style={{ color: '#FAF6F1' }} />
    <IconChevronRight size={18} style={{ color: '#C9A84C' }} />
  </div>
)
