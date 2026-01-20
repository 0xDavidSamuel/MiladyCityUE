import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import UI from './UI'

export default function App() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Experience />
      </Canvas>
      <UI />
    </div>
  )
}
