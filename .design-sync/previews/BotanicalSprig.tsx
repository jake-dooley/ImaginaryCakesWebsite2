import { BotanicalSprig } from 'imaginary-cakes'

export const Default = () => (
  <div style={{ display: 'flex', gap: 40, padding: '32px 48px', background: '#FAF6F1', borderRadius: 16, alignItems: 'flex-end' }}>
    <BotanicalSprig side="left" size={110} opacity={0.5} />
    <BotanicalSprig side="right" size={110} opacity={0.5} />
  </div>
)

export const Large = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 48px', background: '#F0E8D8', borderRadius: 16 }}>
    <BotanicalSprig side="left" size={160} opacity={0.7} />
  </div>
)
