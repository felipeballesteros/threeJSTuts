import { useFrame, extend, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export default function Experience() {

  const cubeRef = useRef()

  // Hook that gets ThreeJS global values only once
  const { camera, gl } = useThree()

  useFrame( ( state, delta ) => {
    cubeRef.current.rotation.y += delta
  })

  return (
  <>
    <orbitControls args={[ camera, gl.domElement ]}/>

    <directionalLight position= { [1, 2 ,3] } intensity={ 1.5 } />
    <ambientLight intensity={ 0.5 } />

    <mesh position-x={1} ref={cubeRef}>
        <boxGeometry scale={ 1.5 } />
        <meshStandardMaterial color={'mediumPurple'} />
    </mesh>

    <mesh position-x={-1}>
        <sphereGeometry args={ [1, 20, 20] } />
        <meshStandardMaterial color={'orange'} />
    </mesh>

    <mesh rotation-x={Math.PI * -0.5} position-y={-1}>
        <planeGeometry args={ [4,4] } />
        <meshStandardMaterial color={'greenyellow'} />
    </mesh>
  </>
  )
}