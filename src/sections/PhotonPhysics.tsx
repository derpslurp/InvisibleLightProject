import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import { spectrumColors } from '@/layout/Theme'

const energyBands = [
  {
    label: 'Radio & Microwave',
    detail: 'Low energy photons cause rotational motion in molecules and power wireless communication.',
    color: spectrumColors.radio,
  },
  {
    label: 'Infrared',
    detail: 'Mid-energy photons excite molecular vibrations—experienced as heat and measured in thermal cameras.',
    color: spectrumColors.infrared,
  },
  {
    label: 'Visible',
    detail: 'Photons here trigger electron transitions in retinal cells, enabling human sight.',
    color: spectrumColors.visible,
  },
  {
    label: 'Ultraviolet',
    detail: 'High-energy photons ionize atoms, facilitating sterilization but also causing DNA damage.',
    color: spectrumColors.ultraviolet,
  },
  {
    label: 'X-ray & Gamma',
    detail: 'Extremely high energy photons penetrate dense matter and reveal atomic structure.',
    color: spectrumColors.gamma,
  },
]

const PhotonPhysics = () => (
  <section id="physics">
    <div className="container">
      <SectionHeader
        eyebrow="Photon Physics"
        title="Invisible light proves photons carry quantized energy"
        description="Each photon has energy proportional to its frequency (E = hν). Invisible light occupies frequencies outside the narrow range our eyes absorb, yet detectors tuned to those energies convert the photons into visible signals."
      />

      <div className="physics__grid">
        <motion.article
          className="glass-panel physics__equation"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Energy relationship</h3>
          <div className="equation">
            <span>E = hν =</span>
            <span>
              <em>hc</em>
              <span className="equation__divider">────</span>
              <em>λ</em>
            </span>
          </div>
          <p>
            Planck’s constant (<em>h</em>) ties photon frequency (ν) to energy. Invisible light has either very long
            wavelengths (lower energy) or very short wavelengths (higher energy) compared with visible light. Specialized
            sensors capture these photons by matching the relevant energy transitions.
          </p>
          <ul>
            <li>Infrared detectors use semiconductors with small band gaps so low-energy photons excite electrons.</li>
            <li>X-ray film relies on phosphor crystals that fluoresce when struck by high-energy photons.</li>
            <li>Microwave antennas resonate at long wavelengths, translating oscillations into electrical currents.</li>
          </ul>
        </motion.article>

        <motion.aside
          className="glass-panel physics__bands"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <h3>Energy ladder</h3>
          <ol>
            {energyBands.map((band) => (
              <li key={band.label} style={{ borderLeftColor: band.color }}>
                <span>{band.label}</span>
                <p>{band.detail}</p>
              </li>
            ))}
          </ol>
        </motion.aside>
      </div>
    </div>
  </section>
)

export default PhotonPhysics


