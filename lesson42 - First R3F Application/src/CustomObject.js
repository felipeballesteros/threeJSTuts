import * as THREE from 'three'
import { useMemo, useRef, useEffect } from 'react'

export default function CustomObject() {

  const geometryRef = useRef()

  const verticesCount = 10 * 3

  const calculatedPositions = useMemo( () => {
    const positions = new Float32Array(verticesCount * 3)

    for( let i = 0; i < verticesCount * 3; i++){
      positions[i] = (Math.random() - 0.5) * 3
    }

    return positions
  }, [])

  useEffect( () => {
    geometryRef.current.computeVertexNormals()
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={ geometryRef }>
        <bufferAttribute 
          attach='attributes-position'
          count={ verticesCount }
          itemSize={ 3 }
          array={ calculatedPositions }
        />
      </bufferGeometry>
      <meshBasicMaterial color="red" side={ THREE.DoubleSide } />
    </mesh>
  )
}