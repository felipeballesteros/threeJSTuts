import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Debug, RigidBody, Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics>

            <Debug/>

            {/* Ball */}
            <RigidBody colliders='ball'>
                <mesh castShadow position={ [ - 2, 2, 0 ] }>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            {/* Boxes */}
            <RigidBody>
                <mesh castShadow position={ [ 2, 2, 0 ] }>
                    <boxGeometry args={ [ 3, 2, 1 ] }/>
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <mesh castShadow position={ [ 2, 2, 3 ] }>
                    <boxGeometry args={ [ 1, 1, 1 ] }/>
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody>

            {/* Floor */}
            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

        </Physics>

    </>
}