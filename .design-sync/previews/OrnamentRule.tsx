import { OrnamentRule } from 'imaginary-cakes'

export const Centered = () => (
  <div style={{ padding: '40px 48px', background: '#FAF6F1', borderRadius: 16, minWidth: 320 }}>
    <OrnamentRule align="center" />
  </div>
)

export const LeftAligned = () => (
  <div style={{ padding: '40px 48px', background: '#FAF6F1', borderRadius: 16, minWidth: 320 }}>
    <OrnamentRule align="left" />
  </div>
)
