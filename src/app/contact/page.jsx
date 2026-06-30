'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import PageHero from '@/components/PageHero'
import { GoldButton } from '@/components/Buttons'
import { Eyebrow } from '@/components/SectionIntro'
import Marquee from '@/components/Marquee'
import ClosingCTA from '@/components/ClosingCTA'
import { IconClock, IconPhone, IconMail, IconInstagram, IconFacebook } from '@/components/Icons'
import { CATEGORIES, BUSINESS } from '@/data'

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Tell Us About"
        titleItalicPart="Your Sweet Moment."
        sub="Every cake starts with a conversation. Drop us a note with your event date, guest count, and any inspiration — we'll be back within one business day."
      />
      <ContactSection />
      <Marquee items={['Cakes So Good', "They Can't Be Real", 'Booking Spring 2026']} color="blush" />
      <ClosingCTA />
    </>
  )
}

const SELECT_ARROW = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><polyline points='1,1 6,6 11,1' stroke='%232C1810' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>")`

function ContactSection() {
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const fileInputRef = useRef(null)

  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [form, setForm] = useState({
    name: '', email: '', phone: '', eventDate: '',
    guests: '', cakeType: 'Weddings', fulfillment: '', message: '',
  })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const applyFiles = useCallback((incoming) => {
    const imgs = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
    setFiles(imgs)
    setPreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url))
      return imgs.map((f) => URL.createObjectURL(f))
    })
  }, [])

  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      formData.append('access_key', '7fc6669b-4903-42b5-a343-ecebbda3c330')
      files.forEach((f) => formData.append('inspiration_photos', f, f.name))
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await response.json()
      if (response.ok) {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', eventDate: '', guests: '', cakeType: 'Weddings', fulfillment: '', message: '' })
        setPreviews((prev) => { prev.forEach((url) => URL.revokeObjectURL(url)); return [] })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        setError(data.message || 'Submission failed. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll('.form-field'),
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { x: 30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
            scrollTrigger: { trigger: infoRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        )
      }
    })()
  }, [])

  const inputStyle = {
    fontFamily: 'var(--font-display)',
    fontSize: 17,
    color: 'var(--color-ink)',
    background: 'var(--color-cream-soft)',
    border: '1px solid var(--color-hairline)',
    borderRadius: 10,
    padding: '14px 16px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 180ms ease, box-shadow 180ms ease',
  }

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    backgroundImage: SELECT_ARROW,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: 42,
  }

  const handleFocus = (e) => {
    e.target.style.borderColor = 'var(--color-gold)'
    e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,.15)'
  }
  const handleBlur = (e) => {
    e.target.style.borderColor = 'var(--color-hairline)'
    e.target.style.boxShadow = 'none'
  }

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true) }
  const handleDragLeave = () => setDragOver(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    applyFiles(e.dataTransfer.files)
  }

  return (
    <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 40px 96px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'flex-start' }}>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {submitted && (
            <div style={{
              background: 'var(--color-cream-soft)',
              border: '1px solid rgba(90,128,96,.4)',
              borderRadius: 12,
              padding: '14px 18px',
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              color: 'var(--color-success)',
            }}>
              Thank you! We'll be in touch within one business day.
            </div>
          )}
          {error && (
            <div style={{
              background: '#fff5f5',
              border: '1px solid rgba(200,60,60,.35)',
              borderRadius: 12,
              padding: '14px 18px',
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              color: '#c43c3c',
            }}>
              {error}
            </div>
          )}

          <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Your Name">
              <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Cindy Brown" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
            <Field label="Phone">
              <input style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="(910) 555-0100" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
          </div>

          <div className="form-field">
            <Field label="Email">
              <input style={inputStyle} value={form.email} onChange={set('email')} placeholder="yum@imaginarycakes.com" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
          </div>

          <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Event Date">
              <input style={inputStyle} value={form.eventDate} onChange={set('eventDate')} placeholder="June 14, 2026" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
            <Field label="Guest Count">
              <input style={inputStyle} value={form.guests} onChange={set('guests')} placeholder="80" onFocus={handleFocus} onBlur={handleBlur} />
            </Field>
          </div>

          <div className="form-field" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Cake Type">
              <select value={form.cakeType} onChange={set('cakeType')} onFocus={handleFocus} onBlur={handleBlur} style={selectStyle}>
                {CATEGORIES.map((c) => <option key={c.key} value={c.label}>{c.label}</option>)}
              </select>
            </Field>

            <Field label="Pickup or Delivery?">
              <select
                value={form.fulfillment}
                onChange={set('fulfillment')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                style={{
                  ...selectStyle,
                  color: form.fulfillment === '' ? 'var(--color-muted)' : 'var(--color-ink)',
                }}
              >
                <option value="" disabled>Select an option</option>
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
              </select>
            </Field>
          </div>

          <div className="form-field">
            <Field label="Tell Us About Your Event">
              <textarea value={form.message} onChange={set('message')} rows={6} onFocus={handleFocus} onBlur={handleBlur}
                placeholder="Theme, color palette, inspiration photos, dietary needs — anything that helps us picture the day."
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </Field>
          </div>

          {/* File upload */}
          <div className="form-field">
            <Field label="Upload Inspiration Photos (optional)">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? 'var(--color-gold)' : 'var(--color-hairline)'}`,
                  borderRadius: 10,
                  padding: '22px 20px',
                  background: dragOver ? 'rgba(201,168,76,.06)' : 'var(--color-cream-soft)',
                  cursor: 'pointer',
                  transition: 'border-color 180ms ease, background 180ms ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  textAlign: 'center',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--color-ink)' }}>
                  {files.length > 0 ? 'Click or drop to replace' : 'Drag & drop images here'}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: 'var(--color-muted)' }}>
                  or <span style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>browse files</span> · up to 2 images, 5 MB each
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => applyFiles(e.target.files)}
                />
              </div>

              {previews.length > 0 && (
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                  {previews.map((src, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img
                        src={src}
                        alt={files[i]?.name}
                        style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--color-hairline)' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          const next = files.filter((_, j) => j !== i)
                          URL.revokeObjectURL(previews[i])
                          setFiles(next)
                          setPreviews(previews.filter((_, j) => j !== i))
                        }}
                        style={{
                          position: 'absolute', top: -6, right: -6,
                          width: 20, height: 20, borderRadius: '50%',
                          background: 'var(--color-ink)', color: '#fff',
                          border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, lineHeight: 1,
                        }}
                        aria-label={`Remove ${files[i]?.name}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Field>
          </div>

          <div className="form-field" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <GoldButton type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Note'}</GoldButton>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-muted)' }}>
              We reply within one business day.
            </span>
          </div>
        </form>

        {/* Info card */}
        <aside ref={infoRef} style={{
          background: 'var(--color-cream-soft)',
          borderRadius: 16,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          boxShadow: 'var(--shadow-card)',
        }}>
          <div>
            <Eyebrow align="left" style={{ fontSize: 11 }}>Visit the Shop</Eyebrow>
            <p style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.65 }}>
              5202 Carolina Beach Rd, Unit 12<br />Wilmington, NC 28412
            </p>
            <p style={{ marginTop: 10, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--color-muted)' }}>
              By appointment only — please call or email first.
            </p>
          </div>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <InfoLine icon={<IconClock size={18} />} title="Hours">
            {BUSINESS.hours}<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>{BUSINESS.hoursNote}</span>
          </InfoLine>
          <InfoLine icon={<IconPhone size={18} />} title="Phone">{BUSINESS.phone}</InfoLine>
          <InfoLine icon={<IconMail size={18} />} title="Email">{BUSINESS.email}</InfoLine>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <InfoLine icon={<IconInstagram size={18} />} title="Instagram">
            @imaginarycakes<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>3,600+ followers</span>
          </InfoLine>
          <InfoLine icon={<IconFacebook size={18} />} title="Facebook">
            facebook.com/imaginarycakes<br />
            <span style={{ color: 'var(--color-muted)', fontSize: 14 }}>98% recommend</span>
          </InfoLine>

          <div style={{ height: 1, background: 'var(--color-hairline)' }} />

          <div style={{
            background: 'linear-gradient(135deg, #FFEFC9, #FFF8E7)',
            borderRadius: 12,
            padding: 16,
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 15,
            color: 'var(--color-body)',
            lineHeight: 1.55,
          }}>
            All orders require a <strong style={{ fontStyle: 'normal', color: 'var(--color-ink)' }}>minimum of two weeks</strong> lead time. Wedding cakes book up 6–8 weeks ahead during peak season (April – October).
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 860px) {
          section > div[style*="1.4fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
      }}>
        {label}
      </span>
      {children}
    </label>
  )
}

function InfoLine({ icon, title, children }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ color: 'var(--color-gold)', marginTop: 2, flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
          {title}
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--color-ink)', marginTop: 4, lineHeight: 1.55 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
