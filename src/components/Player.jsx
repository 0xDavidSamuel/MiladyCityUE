import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Player() {
  const group = useRef()
  const { scene } = useGLTF('/models/base-player.glb')

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene.clone()} />
    </group>
  )
}

useGLTF.preload('/models/base-player.glb')
