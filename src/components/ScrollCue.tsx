import { motion } from 'framer-motion'

type ScrollCueProps = {
  label?: string
}

const ScrollCue = ({ label = 'Scroll to explore' }: ScrollCueProps) => (
  <motion.div
    className="scroll-cue"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6 }}
  >
    <motion.span
      className="scroll-cue__dot spectrum-gradient"
      animate={{ y: [0, 12, 0] }}
      transition={{ repeat: Infinity, duration: 1.6 }}
    />
    <span>{label}</span>
  </motion.div>
)

export default ScrollCue


