import { WorkTile } from 'imaginary-cakes'

const weddingCake = {
  photo: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=533&fit=crop',
  title: 'Three-Tier Buttercream',
  baker: 'Almond sponge · Italian buttercream · sugar peony',
  category: 'Weddings',
}

const birthdayCake = {
  photo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=533&fit=crop',
  title: 'Chocolate Celebration',
  baker: 'Deep chocolate · ganache · sugar pearls',
  category: 'Celebration & Birthday',
}

export const Wedding = () => (
  <div style={{ width: 240 }}>
    <WorkTile cake={weddingCake} />
  </div>
)

export const Birthday = () => (
  <div style={{ width: 240 }}>
    <WorkTile cake={birthdayCake} />
  </div>
)

export const Grid = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: 16 }}>
    <WorkTile cake={weddingCake} />
    <WorkTile cake={birthdayCake} />
  </div>
)
