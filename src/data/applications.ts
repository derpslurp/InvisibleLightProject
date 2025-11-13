export type Application = {
  title: string
  spectrumBand: string
  description: string
  highlight: string
}

export const applications: Application[] = [
  {
    title: 'Infrared Imaging in Medicine',
    spectrumBand: 'Infrared (700 nm – 1 mm)',
    description:
      'Thermal cameras detect emitted infrared radiation from human tissue, revealing circulatory issues, inflammation, and cancerous growth that alter heat patterns.',
    highlight: 'Cause → effect: Abnormal metabolism creates temperature contrasts that infrared detectors transform into diagnostic images.',
  },
  {
    title: 'Radio Astronomy',
    spectrumBand: 'Radio (1 mm – 100 km)',
    description:
      'Radio telescopes collect long-wavelength signals that penetrate dust clouds, allowing astronomers to map the Milky Way, trace hydrogen gas, and detect pulsars.',
    highlight:
      'Use: Radio waves unlock hidden structure in galaxies and enabled the discovery of the cosmic microwave background.',
  },
  {
    title: 'Ultraviolet Sterilization',
    spectrumBand: 'Ultraviolet (10 – 400 nm)',
    description:
      'UV-C photons carry enough energy to disrupt DNA and RNA in microbes. Hospitals and water treatment plants use controlled UV exposure to neutralize pathogens without chemicals.',
    highlight:
      'Effect: UV light’s high photon energy breaks molecular bonds, preventing microorganisms from replicating.',
  },
]


