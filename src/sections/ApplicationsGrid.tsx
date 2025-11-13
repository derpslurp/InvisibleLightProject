import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import { applications } from '@/data/applications'

const ApplicationsGrid = () => (
  <section id="applications">
    <div className="container">
      <SectionHeader
        eyebrow="Modern Impact"
        title="Invisible light drives innovation across science and society"
        description="Scientists convert photons we cannot see into data by using detectors tuned to specific wavelengths. Each segment of the spectrum reveals unique interactions between energy and matter."
      />
      <div className="applications__grid">
        {applications.map((item, index) => (
          <motion.article
            key={item.title}
            className="application-card glass-panel"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
          >
            <span className="application-card__band">{item.spectrumBand}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="application-card__highlight">{item.highlight}</div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
)

export default ApplicationsGrid


