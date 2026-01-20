import { useGLTF } from '@react-three/drei'
import { useStore } from '../lib/store'

export default function Asset({ category, asset }) {
  const { scene } = useGLTF(`/models/${category}/${asset}.glb`)
  
  return <primitive object={scene.clone()} />
}
