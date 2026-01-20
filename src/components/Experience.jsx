cat > src/components/Experience.jsx << 'EOF'
import { OrbitControls, Environment } from '@react-three/drei'
import PlayerCanvas from './PlayerCanvas'

export default function Experience() {
  return (
    <>
      <OrbitControls
        target={[0, 1, 0]}
        minDistance={2}
        maxDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <PlayerCanvas />
    </>
  )
}
