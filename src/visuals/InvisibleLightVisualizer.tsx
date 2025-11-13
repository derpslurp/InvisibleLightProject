import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Float, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const WaveRibbon = () => {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 240; i += 1) {
      const t = i / 40
      const x = (t - 3) * 0.8
      const y = Math.sin(t * 0.9) * 0.6
      const z = Math.cos(t * 0.45) * 0.3
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  return (
    <mesh>
      <tubeGeometry args={[curve, 240, 0.06, 16, false]} />
      <meshStandardMaterial color="#7cffda" emissive="#4b79ff" roughness={0.25} metalness={0.15} />
    </mesh>
  )
}

const SparkleField = () => {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 600
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3 + 0] = (Math.random() - 0.5) * 8
      array[i * 3 + 1] = Math.random() * 4 - 1
      array[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return array
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y += 0.0006
    const material = ref.current.material as THREE.PointsMaterial
    material.size = 0.035 + Math.sin(state.clock.elapsedTime * 1.2) * 0.01
    material.opacity = 0.25 + Math.abs(Math.sin(state.clock.elapsedTime * 0.8)) * 0.2
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  )
}

const EnergyRing = ({ color, position }: { color: string; position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12
    ref.current.scale.setScalar(scale)
    const material = ref.current.material as THREE.MeshStandardMaterial
    material.opacity = 0.25 + Math.abs(Math.sin(state.clock.elapsedTime * 1.1)) * 0.3
    ref.current.rotation.z += 0.002
  })

  return (
    <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.55, 0.02, 32, 180]} />
      <meshStandardMaterial color={color} transparent opacity={0.35} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  )
}

const AnimatedSpotlight = () => {
  const ref = useRef<THREE.SpotLight>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.4
    ref.current.position.x = Math.sin(t) * 3.4
    ref.current.position.y = 3 + Math.sin(t * 1.6) * 0.6
    ref.current.position.z = Math.cos(t) * 2.6
    ref.current.target.position.set(0, 0, 0)
    ref.current.target.updateMatrixWorld()
  })

  return <spotLight ref={ref} angle={0.6} intensity={1.1} penumbra={0.6} color="#72a0ff" distance={12} />
}

const Detector = ({ position, label, color }: { position: [number, number, number]; label: string; color: string }) => (
  <Float speed={2} rotationIntensity={0.6} floatIntensity={0.6}>
    <mesh position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.2} />
      <Html distanceFactor={12} position={[0, 0.35, 0]} center className="visualizer__label">
        {label}
      </Html>
    </mesh>
  </Float>
)

const Axis = ({
  start,
  end,
  color,
  label,
  labelPosition,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  label: string
  labelPosition: [number, number, number]
}) => {
  return (
    <>
      <Line points={[start, end]} color={color} lineWidth={2} />
      <Html distanceFactor={14} position={labelPosition} center className="visualizer__label">
        {label}
      </Html>
    </>
  )
}

const InvisibleLightVisualizer = () => (
  <div className="visualizer__wrapper glass-panel">
    <div className="visualizer__header">
      <h3>Self-made spectrum visual</h3>
      <p>
        This 3D scene sketches an electromagnetic wave travelling from long to short wavelengths. Detectors tuned to
        radio, infrared, and ultraviolet bands sit along the path, showing how instruments translate invisible photons
        into data.
      </p>
    </div>

    <div className="visualizer__canvas">
      <Canvas className="visualizer__three" style={{ height: 720 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#050816']} />
          <PerspectiveCamera makeDefault position={[2.5, 2, 3]} fov={45} />
          <ambientLight intensity={0.3} />
          <pointLight position={[4, 6, 3]} intensity={1.4} color="#9db4ff" />
          <pointLight position={[-4, -3, -3]} intensity={0.7} color="#ff9a5f" />
          <AnimatedSpotlight />
          <SparkleField />

          <Float rotationIntensity={0.4} floatIntensity={0.2}>
            <WaveRibbon />
          </Float>

          <Detector position={[-1.6, -0.4, -0.2]} label="Radio Receiver" color="#6adeff" />
          <Detector position={[-0.2, 0.2, 0.3]} label="Infrared Sensor" color="#ff7b4a" />
          <Detector position={[1.2, 0.8, -0.1]} label="UV Photodiode" color="#b388ff" />
          <EnergyRing color="#6adeff" position={[-1.6, -0.4, -0.2]} />
          <EnergyRing color="#ff7b4a" position={[-0.2, 0.2, 0.3]} />
          <EnergyRing color="#b388ff" position={[1.2, 0.8, -0.1]} />

          <Axis start={[-2.5, -1.2, 0]} end={[2.5, -1.2, 0]} color="#5f9bff" label="Wavelength →" labelPosition={[2.6, -1.2, 0]} />
          <Axis start={[-2.5, -1.2, 0]} end={[-2.5, 1.5, 0]} color="#ff6ec7" label="Amplitude" labelPosition={[-2.5, 1.7, 0]} />

          <OrbitControls enablePan={false} minDistance={2.5} maxDistance={6} />
        </Suspense>
      </Canvas>
    </div>
  </div>
)

export default InvisibleLightVisualizer

