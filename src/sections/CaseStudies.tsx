import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import { caseStudies } from '@/data/caseStudies'
import InvisibleLightVisualizer from '@/visuals/InvisibleLightVisualizer'

const CaseStudies = () => (
  <section id="examples">
    <div className="container">
      <SectionHeader
        eyebrow="Case Studies"
        title="Examples of invisible light revealing the world"
        description="These scenarios translate invisible wavelengths into insight, demonstrating the impact of infrared, ultraviolet, and other bands beyond human vision."
      />

      <div className="case-studies__grid">
        {caseStudies.map((study, index) => (
          <motion.article
            key={study.title}
            className="case-card glass-panel"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <span className="case-card__band">{study.spectrumBand}</span>
            <h3>{study.title}</h3>
            <p>{study.summary}</p>
            <div className="case-card__takeaway">{study.takeaway}</div>
          </motion.article>
        ))}
      </div>

      <InvisibleLightVisualizer />
    </div>
  </section>
)

export default CaseStudies


