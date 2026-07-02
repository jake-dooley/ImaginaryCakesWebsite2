import { SectionIntro } from 'imaginary-cakes'

export const Default = () => (
  <div style={{ padding: '48px', background: '#FAF6F1', borderRadius: 16, maxWidth: 640 }}>
    <SectionIntro
      eyebrow="Our Work"
      title="Cakes That Tell"
      titleItalicPart="Your Story"
      sub="From elegant wedding tiers to whimsical 3D sculptures — every cake is a one-of-a-kind creation."
    />
  </div>
)

export const LeftAligned = () => (
  <div style={{ padding: '48px', background: '#FAF6F1', borderRadius: 16, maxWidth: 640 }}>
    <SectionIntro
      eyebrow="About Us"
      title="A Family Bakery"
      titleItalicPart="Since 2009"
      align="left"
    />
  </div>
)

export const TitleOnly = () => (
  <div style={{ padding: '48px', background: '#FAF6F1', borderRadius: 16, maxWidth: 640 }}>
    <SectionIntro
      title="Flavors &"
      titleItalicPart="Fillings"
    />
  </div>
)
