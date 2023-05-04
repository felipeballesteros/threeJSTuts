import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier"
import { useKeyboardControls } from "@react-three/drei"

export default function Player() {

  const [subscribeKeys, getKeys] = useKeyboardControls()
  console.log(subscribeKeys)
  console.log(getKeys)

  useFrame( () => {
    const { forward, backward, leftward, rightward } = getKeys()
  })

  return <RigidBody position={[ 0, 1, 0 ]} colliders="ball" restitution={0.2} friction={1}>
    <mesh castShadow>
      <icosahedronGeometry args={ [0.3, 1 ] } />
      <meshStandardMaterial flatShading color='mediumpurple' />
    </mesh>
  </RigidBody>
  
}