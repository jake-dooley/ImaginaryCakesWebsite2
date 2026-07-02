import { Eyebrow } from 'imaginary-cakes'

export const Centered = () => (
  <div style={{ padding: '40px 48px', background: '#FAF6F1', borderRadius: 16 }}>
    <Eyebrow>Our Story</Eyebrow>
  </div>
)

export const LeftAligned = () => (
  <div style={{ padding: '40px 48px', background: '#FAF6F1', borderRadius: 16 }}>
    <Eyebrow align="left">Gallery</Eyebrow>
  </div>
)

export const OnDark = () => (
  <div style={{ padding: '40px 48px', background: '#2C1810', borderRadius: 16 }}>
    <Eyebrow style={{ color: '#C9A84C' }}>Sweet Elegance</Eyebrow>
  </div>
)
