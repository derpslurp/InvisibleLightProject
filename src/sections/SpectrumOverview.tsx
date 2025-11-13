import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'

const glossaryTerms = [
  {
    term: 'Electromagnetic spectrum',
    definition: 'The continuous range of all possible photon wavelengths and frequencies, from radio waves to gamma rays.',
  },
  {
    term: 'Wavelength (λ)',
    definition: 'The distance between consecutive peaks of a light wave, measured in meters; longer wavelengths carry less energy.',
  },
  {
    term: 'Frequency (ν)',
    definition: 'The number of wave cycles that pass a point each second; higher frequency means higher photon energy.',
  },
  {
    term: 'Photon',
    definition: 'A quantum packet of light energy that behaves both as a particle and a wave.',
  },
]

const SpectrumOverview = () => (
  <section id="overview">
    <div className="container">
      <SectionHeader
        eyebrow="Phenomenon Overview"
        title="Most light is invisible because our eyes evolved for a narrow band"
        description="Human vision detects only wavelengths between ~400–700 nanometers. Invisible light includes all radiation with longer wavelengths (radio, microwave, infrared) and shorter wavelengths (ultraviolet, X-ray, gamma rays), which our retinas cannot absorb. Yet this hidden light carries vital information about energy, matter, and the universe."
      />

      <div className="overview__grid">
        <motion.article
          className="glass-panel overview__panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <h3>Why we see so little</h3>
          <p>
            Human photoreceptors evolved to detect the wavelengths reaching Earth’s surface most reliably from the Sun.
            Infrared photons do not have enough energy to trigger our rod and cone cells, while ultraviolet and higher
            frequency photons possess too much energy, causing chemical damage rather than sight. The atmosphere also
            absorbs much of the invisible spectrum before it reaches ground level.
          </p>
          <p>
            Biological and atmospheric filters therefore limit human perception to visible light, even though nearly all
            electromagnetic radiation around us is invisible. Technologies extend our senses by converting these hidden
            photons into signals we can interpret.
          </p>
        </motion.article>

        <motion.article
          className="glass-panel overview__panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h3>Lens: Uses in modern science</h3>
          <p>
            Invisible light powers breakthroughs across disciplines. Infrared cameras map heat signatures in medicine
            and climate science. Radio and microwave observatories peer through cosmic dust to track star birth. High
            energy X-rays reveal atomic arrangements in materials, while ultraviolet light sterilizes medical equipment
            and energizes crucial biochemical reactions. The invisible spectrum is indispensable for communication,
            imaging, and discovery.
          </p>
        </motion.article>
      </div>

      <motion.div
        className="glossary glass-panel"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <h3>Key vocabulary</h3>
        <ul>
          {glossaryTerms.map((item) => (
            <li key={item.term}>
              <span>{item.term}</span>
              <p>{item.definition}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
)

export default SpectrumOverview


