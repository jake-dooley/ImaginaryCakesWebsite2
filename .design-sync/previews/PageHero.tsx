import { PageHero } from 'imaginary-cakes'

export const WithEyebrow = () => (
  <div style={{ background: '#FAF6F1' }}>
    <PageHero
      eyebrow="Our Story"
      title="Custom Cakes, Made"
      titleItalicPart="with Love"
      sub="Husband-and-wife custom cake bakery in Wilmington, NC. Established 2009."
    />
  </div>
)

export const TitleOnly = () => (
  <div style={{ background: '#FAF6F1' }}>
    <PageHero
      title="The Gallery"
      titleItalicPart="of Sweet Creations"
    />
  </div>
)

export const WithChildren = () => (
  <div style={{ background: '#FAF6F1' }}>
    <PageHero
      eyebrow="Contact Us"
      title="Let's Create Something"
      titleItalicPart="Unforgettable"
      sub="Every cake begins with a conversation."
    >
      <div style={{ marginTop: 24, fontFamily: 'system-ui', fontSize: 14, color: '#8B6F5E' }}>
        Minimum 2 weeks notice · Tasting by appointment
      </div>
    </PageHero>
  </div>
)
