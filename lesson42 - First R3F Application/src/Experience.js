export default function Experience() {

  return (
  <>
    <mesh position-x={1}>
        <boxGeometry scale={ 1.5 } />
        <meshBasicMaterial color={'mediumPurple'} />
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