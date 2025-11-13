import SectionHeader from '@/components/SectionHeader'
import { mlaSources } from '@/data/sources'

const CitationsSection = () => (
  <section id="citations">
    <div className="container">
      <SectionHeader
        eyebrow="Sources"
        title="MLA Works Cited"
        description="Credible resources that informed the scientific, historical, and cultural context of this project."
        align="center"
      />
      <div className="citations glass-panel">
        <ol>
          {mlaSources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ol>
        <p className="citations-notes">
          <a href="https://docs.google.com/document/d/14lWQt3k30aeoAZcZh_aYZ3lKFW_tpt-LvJIz__NK1SA/edit?tab=t.0" target="_blank" rel="noopener noreferrer">
            Notes
          </a>
        </p>
      </div>
    </div>
  </section>
)

export default CitationsSection


