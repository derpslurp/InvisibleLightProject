import { motion } from 'framer-motion'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  anchorId?: string
  align?: 'left' | 'center'
}

const SectionHeader = ({ eyebrow, title, description, anchorId, align = 'left' }: SectionHeaderProps) => {
  return (
    <motion.div
      className={`section-header section-header--${align}`}
      id={anchorId}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {eyebrow && <span className="section-eyebrow spectrum-gradient">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  )
}

export default SectionHeader


