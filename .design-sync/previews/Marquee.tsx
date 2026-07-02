import { Marquee } from 'imaginary-cakes'

const CAKE_ITEMS = [
  'Custom Wedding Cakes',
  'Birthday Celebrations',
  '3D Sculpted Designs',
  'Gourmet Desserts',
  'Tasting by Appointment',
  'Wilmington, NC',
]

export const Gold = () => (
  <Marquee items={CAKE_ITEMS} color="gold" />
)

export const Blush = () => (
  <Marquee items={CAKE_ITEMS} color="blush" />
)
