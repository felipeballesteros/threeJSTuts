import { Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience(){

    const cube = useRef()
    const sphere = useRef()
    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls 
            anchor={[0, 0, 0]} 
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={100}
            fixed={true} // fixes size on screen regarding of zoom level
        >
            <mesh position-x={ - 2 } ref={sphere}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange" />
                <Html 
                    position={[1, 1, 0]}
                    wrapperClass='label'
                    center
                    distanceFactor={8}
                    occlude={[cube, sphere]} //Hide HTML if these are in front
                >
                    That is a sphere 🤘
                </Html>
            </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color='mediumpurple' />
        </mesh>
        <TransformControls object={cube} mode='translate'/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}