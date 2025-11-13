export type CaseStudy = {
  title: string
  spectrumBand: string
  summary: string
  takeaway: string
}

export const caseStudies: CaseStudy[] = [
  {
    title: 'Night-Vision Goggles in Safety Operations',
    spectrumBand: 'Near-infrared (750 – 1000 nm)',
    summary:
      'Night-vision goggles multiply low-level infrared light emitted by warm objects and scattered starlight, then convert it into visible green images for pilots and rescue teams.',
    takeaway:
      'This technology transforms invisible warmth into actionable visuals, enabling safer navigation, wildlife monitoring, and emergency response in darkness.',
  },
  {
    title: 'James Webb Space Telescope',
    spectrumBand: 'Mid- and far-infrared (0.6 – 28 μm)',
    summary:
      'JWST’s mirrors and detectors are cooled to cryogenic temperatures to sense faint infrared photons from early galaxies and exoplanet atmospheres, revealing cosmic history hidden to optical telescopes.',
    takeaway:
      'Invisible infrared light lets scientists observe the universe as it was billions of years ago, expanding cultural narratives about our cosmic origins.',
  },
]


