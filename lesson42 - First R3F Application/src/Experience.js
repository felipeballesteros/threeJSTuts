import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Experience() {

  const cubeRef = useRef()
  useFrame( ( state, delta ) => {
    cubeRef.current.rotation.y += delta
  })

  return (
  <>
    <mesh position-x={1} ref={cubeRef}>
        <boxGeometry scale={ 1.5 } />
        <meshBasicMaterial color={'mediumPurple'} wireframe={true} />
    </mesh>

    <mesh position-x={-1}>
        <sphereGeometry args={ [1, 20, 20] } />
        <meshBasicMaterial color={'orange'} wireframe={true} />
    </mesh>

    <mesh rotation-x={Math.PI * -0.5} position-y={-1}>
        <planeGeometry args={ [4,4] } />
        <meshBasicMaterial color={'greenyellow'} />
    </mesh>
  </>
  )
}