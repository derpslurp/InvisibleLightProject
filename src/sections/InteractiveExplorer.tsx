import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import AnimatedList from "@/components/reactbits/AnimatedList";
import { spectrumColors } from "@/layout/Theme";

const insights = [
  {
    label: "Radio Waves",
    detail:
      "Huge wavelengths that slip through dust clouds. Radio interferometers stitch together data from dishes spread across continents to map cold hydrogen gas and fast-spinning pulsars.",
    signal: "30 cm – 100 km",
    applications: [
      "VLBI galaxy mapping",
      "SETI signal hunts",
      "Solar flare monitoring",
    ],
    color: spectrumColors.radio,
  },
  {
    label: "Microwaves",
    detail:
      "Microwave light traces leftover heat from the Big Bang and carries daily data through satellite relays and radar. It passes easily through Earth’s atmosphere.",
    signal: "1 mm – 30 cm",
    applications: [
      "Cosmic microwave background studies",
      "Weather radar",
      "Deep space communications",
    ],
    color: spectrumColors.microwave,
  },
  {
    label: "Infrared",
    detail:
      "Infrared photons reveal thermal fingerprints from planets, people, and protostars. Cryogenic sensors convert this heat into electric signals for telescopes and medical imagers.",
    signal: "700 nm – 1 mm",
    applications: [
      "JWST early galaxy imaging",
      "Night-vision goggles",
      "Irregular heartbeat screening",
    ],
    color: spectrumColors.infrared,
  },
  {
    label: "Ultraviolet",
    detail:
      "Ultraviolet radiation delivers enough energy to break molecular bonds. Controlled UV sterilizes equipment and highlights energetic stars that shape galactic evolution.",
    signal: "10 – 400 nm",
    applications: [
      "Planetary aurorae imaging",
      "DNA sterilization",
      "Forensic fluorescence",
    ],
    color: spectrumColors.ultraviolet,
  },
  {
    label: "X-rays",
    detail:
      "X-ray wavelengths penetrate skin and clouds of gas, enabling doctors to see skeletal detail and astronomers to trace superheated plasma spiraling into black holes.",
    signal: "0.01 – 10 nm",
    applications: [
      "Diagnostic radiography",
      "Chandra X-ray Observatory",
      "Materials crystallography",
    ],
    color: spectrumColors.xray,
  },
  {
    label: "Gamma Rays",
    detail:
      "The shortest wavelengths pack the most energy, erupting from nuclear transitions and cosmic collisions. Gamma detectors translate flashes into alerts for energetic events across the cosmos.",
    signal: "< 0.01 nm",
    applications: [
      "GRB early warning systems",
      "PET scans",
      "Radiation therapy guidance",
    ],
    color: spectrumColors.gamma,
  },
];

const InteractiveExplorer = () => {
  const labels = useMemo(() => insights.map((item) => item.label), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeInsight = insights[activeIndex] ?? insights[0];

  return (
    <section id="explorer">
      <div className="container explorer__container">
        <SectionHeader
          eyebrow="Interactive Explorer"
          title="Navigate the invisible spectrum"
          description="Hover or focus on each band to reveal how scientists collect and use data from that wavelength, then explore the detailed highlights on the right."
        />

        <div className="explorer__split glass-panel">
          <AnimatedList
            items={labels}
            onItemSelect={(_, index) => setActiveIndex(index)}
            initialSelectedIndex={0}
            itemClassName="explorer__item"
          />

          <motion.div
            className="explorer__detail"
            key={activeInsight.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="explorer__band"
              style={{ color: activeInsight.color }}
            >
              {activeInsight.signal}
            </span>
            <h3>{activeInsight.label}</h3>
            <p>{activeInsight.detail}</p>
            <ul>
              {activeInsight.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExplorer;
