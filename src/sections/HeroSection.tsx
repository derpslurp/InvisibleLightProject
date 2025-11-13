import { motion } from 'framer-motion'
import ScrollCue from '@/components/ScrollCue'
import DecryptedText from '@/components/reactbits/DecryptedText'

const heroStats = [
  { label: 'Spectrum coverage', value: 'Radio → Gamma' },
  { label: 'Invisible wavelengths', value: '> 99%' },
  { label: 'Key question', value: 'How do we harness what we cannot see?' },
]

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container hero__container">
        <motion.div
          className="hero__content glass-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <motion.span
            className="hero__badge spectrum-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Science of the Unseen
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}>
            Invisible Light:
            <DecryptedText
              text="Illuminating the Unseen Spectrum"
              animateOn="view"
              sequential
              className="hero__decrypted-text"
              encryptedClassName="hero__decrypted-text--scramble"
              parentClassName="hero__decrypted-wrapper"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Human eyes sense only a sliver of the electromagnetic spectrum. This project uncovers why most light is
            invisible to us, how scientists detect it, and the breakthroughs it unlocks—from lifesaving medical scans
            to telescopes peering back in time.
          </motion.p>
          <div className="hero__stats">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="hero__stat"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <span>{stat.value}</span>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <ScrollCue />
        </motion.div>

        <motion.div
          className="hero__halo spectrum-gradient"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 0.32, scale: 1.2 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <motion.div
          className="hero__blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        />
      </div>
    </section>
  )
}

export default HeroSection

