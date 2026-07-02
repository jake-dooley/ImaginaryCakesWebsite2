import { OutlineButton } from 'imaginary-cakes'

export const Default = () => (
  <div style={{ padding: '32px 40px', background: '#FAF6F1', borderRadius: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <OutlineButton>View Gallery</OutlineButton>
    <OutlineButton>Learn More</OutlineButton>
    <OutlineButton>See All Flavors</OutlineButton>
  </div>
)

export const OnCream = () => (
  <div style={{ padding: '32px 40px', background: '#F0E8D8', borderRadius: 16 }}>
    <OutlineButton>Browse Cakes</OutlineButton>
  </div>
)
