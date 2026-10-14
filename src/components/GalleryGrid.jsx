'use client'
import { useState, useEffect, useRef } from 'react'
import { CATEGORIES, CAKE_PHOTOS } from '@/data'

const CHIPS = [{ key: 'all', label: 'All' }, ...CATEGORIES]
const ALL_PHOTOS = CAKE_PHOTOS.map((p) => ({ ...p, uid: p.id }))

export default function GalleryGrid() {
  const [filter, setFilter] = useState('all')
  const gridRef = useRef(null)

  const filtered = filter === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter((p) => p.category === filter)

  useEffect(() => {
    // Initial stagger reveal on mount
    let ctx
    let cancelled = false
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const el = gridRef.current
      if (!el) return
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll('.gallery-tile'),
          { opacity: 0, scale: 0.93, y: 20 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.6,
            stagger: { amount: 0.8, from: 'start' },
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      })
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  const handleFilter = async (key) => {
    const gsap = (await import('gsap')).default
    const tiles = gridRef.current?.querySelectorAll('.gallery-tile')
    if (tiles?.length) {
      gsap.to(tiles, { opacity: 0, scale: 0.94, duration: 0.18, ease: 'power1.in', stagger: 0.02 })
      await new Promise((res) => setTimeout(res, 280))
    }
    setFilter(key)
  }

  // Re-animate when filter changes
  useEffect(() => {
    if (!gridRef.current) return
    ;(async () => {
      const gsap = (await import('gsap')).default
      gsap.fromTo(
        gridRef.current.querySelectorAll('.gallery-tile'),
        { opacity: 0, scale: 0.93, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: { amount: 0.6 }, ease: 'power2.out' }
      )
    })()
  }, [filter])

  return (
    <>
      {/* Filter chips */}
      <div style={{
        display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center',
        paddingBottom: 28, borderBottom: '1px solid var(--color-hairline)', marginBottom: 32,
      }}>
        {CHIPS.map((c) => (
          <button
            key={c.key}
            onClick={() => handleFilter(c.key)}
            className={`gallery-chip${filter === c.key ? ' gallery-chip--active' : ''}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '10px 18px',
              borderRadius: 9999,
              cursor: 'pointer',
              background: filter === c.key
                ? 'var(--gradient-gold)'
                : 'transparent',
              color: 'var(--color-ink)',
              border: filter === c.key
                ? '1px solid transparent'
                : '1px solid var(--color-border)',
              transition: 'all 160ms ease',
              boxShadow: filter === c.key ? '0 2px 8px rgba(201,168,76,.3)' : 'none',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="gallery-grid-wrap" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
      }}>
        {filtered.map((cake, i) => (
          <GalleryTile key={cake.uid} cake={cake} tall={i % 5 === 0 || i % 7 === 0} />
        ))}
      </div>

      <style>{`
        .gallery-chip:not(.gallery-chip--active):hover {
          border-color: rgba(255,255,255,0.8) !important;
          color: #fff !important;
        }
        @media (max-width: 1024px) {
          .gallery-grid-wrap { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .gallery-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  )
}

function GalleryTile({ cake, tall }) {
  return (
    <div
      className="gallery-tile"
      style={{
        position: 'relative',
        aspectRatio: tall ? '3 / 4' : '1 / 1',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.2)',
      }}
    >
      <img src={cake.photo} alt={cake.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}
