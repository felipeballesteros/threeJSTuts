import { useMatcapTexture, Center, OrbitControls, Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'

export default function Experience(){

    const donutsGroup = useRef()
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    const [ torusGeometry, setTorusGeometry ] = useState()
    const [ material, setMaterial ] = useState()

    useFrame( (state, delta) =>{
        for( const donut of donutsGroup.current.children){
            donut.rotation.y += delta * 0.3
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <torusGeometry ref={ setTorusGeometry } args={ [ 1, 0.6, 16, 32 ] }/>

        <meshMatcapMaterial ref={ setMaterial } matcap={ matcapTexture} />

        <Center>
            <Text3D
                material= { material }
                font='./fonts/helvetiker_regular.typeface.json'
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                HELLO R3F
            </Text3D>
        </Center>

        <group ref={ donutsGroup } >
            {[...Array(100)].map( (value, index) =>
                <mesh
                    key={index}
                    geometry= { torusGeometry }
                    material= { material }
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}

                    scale={ 0.2 + Math.random() * 0.2 }

                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        0
                    ]}
                />
            )}
        </group>

    </>
}