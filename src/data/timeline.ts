export type TimelineEntry = {
  year: string
  title: string
  description: string
  category: 'Scientific' | 'Technological' | 'Cultural'
}

export const timeline: TimelineEntry[] = [
  {
    year: '1800',
    title: 'William Herschel detects infrared light',
    description:
      'By measuring temperature changes beyond the red end of a prism spectrum, Herschel discovers invisible “calorific rays,” proving light extends past visible red.',
    category: 'Scientific',
  },
  {
    year: '1801',
    title: 'Johann Ritter observes ultraviolet radiation',
    description:
      'Experiments with silver chloride darkening beyond violet verify that high-energy invisible light exists above the visible spectrum.',
    category: 'Scientific',
  },
  {
    year: '1864',
    title: 'James Clerk Maxwell unifies electromagnetism',
    description:
      'Maxwell’s equations show that light is an electromagnetic wave, predicting radio waves long before their detection.',
    category: 'Scientific',
  },
  {
    year: '1887',
    title: 'Heinrich Hertz generates radio waves',
    description:
      'Hertz builds spark-gap transmitters that create and detect radio waves, experimentally confirming Maxwell’s predictions.',
    category: 'Technological',
  },
  {
    year: '1932',
    title: 'Karl Jansky discovers cosmic radio noise',
    description:
      'While investigating static for Bell Labs, Jansky identifies radio emissions from the Milky Way, founding radio astronomy.',
    category: 'Scientific',
  },
  {
    year: '1960',
    title: 'Theodore Maiman fires first laser',
    description:
      'The ruby laser emits intense coherent light, demonstrating controlled stimulated emission across visible and infrared wavelengths.',
    category: 'Technological',
  },
  {
    year: '1978',
    title: 'Invention of night-vision goggles',
    description:
      'Image intensifiers amplify ambient infrared and near-infrared light, reshaping cultural depictions of night-time perception and modern safety operations.',
    category: 'Cultural',
  },
  {
    year: '1983',
    title: 'Infrared Astronomical Satellite (IRAS)',
    description:
      'The first space telescope dedicated to infrared surveys maps 96% of the sky, revealing cold dust, proto-stars, and cometary dust trails.',
    category: 'Scientific',
  },
  {
    year: '1999',
    title: 'NASA launches FUSE ultraviolet observatory',
    description:
      'The Far Ultraviolet Spectroscopic Explorer studies the interstellar medium, highlighting ultraviolet light’s role in tracing hot gas between stars.',
    category: 'Scientific',
  },
  {
    year: '2021',
    title: 'James Webb Space Telescope (JWST) launches',
    description:
      'JWST’s infrared instruments peer through dust to observe the earliest galaxies, extending humans’ invisible-light vision back 13.5 billion years.',
    category: 'Scientific',
  },
]


