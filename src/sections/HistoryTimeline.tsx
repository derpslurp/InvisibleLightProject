import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import { timeline } from '@/data/timeline'

const categoryColors: Record<string, string> = {
  Scientific: 'var(--color-infrared)',
  Technological: 'var(--color-radio)',
  Cultural: 'var(--color-ultraviolet)',
}

const HistoryTimeline = () => (
  <section id="history">
    <div className="container">
      <SectionHeader
        eyebrow="History"
        title="Two centuries of uncovering invisible light"
        description="From nineteenth-century prism experiments to twenty-first-century space telescopes, researchers steadily expanded the known spectrum. Cultural imagination grew alongside technology, shifting how societies narrate the unseen."
      />

      <div className="timeline glass-panel">
        <div className="timeline__track">
          {timeline.map((entry, index) => (
            <motion.article
              key={entry.year}
              className="timeline__event"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            >
              <span className="timeline__year">{entry.year}</span>
              <span
                className="timeline__category"
                style={{ backgroundColor: categoryColors[entry.category] ?? 'var(--color-visible)' }}
              >
                {entry.category}
              </span>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default HistoryTimeline


