import { useStore } from '../lib/store'
import Player from './Player'
import Asset from './Asset'

export default function PlayerCanvas() {
  const selections = useStore((state) => state.selections)

  return (
    <group position={[0, 0, 0]}>
      <Player />
      {Object.entries(selections).map(([category, asset]) => (
        asset && <Asset key={category} category={category} asset={asset} />
      ))}
    </group>
  )
}
