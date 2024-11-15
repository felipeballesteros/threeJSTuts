import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { CuboidCollider, Debug, RigidBody, Physics, CylinderCollider, InstancedRigidBodies } from '@react-three/rapier'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience(){

    const [ hitSound ] = useState( () => new Audio('./hit.mp3'))
    const hamburguer = useGLTF('./hamburger.glb')

    const cubeCount = 100
    const cubes = useRef()


    const cube = useRef()
    const twister = useRef()

    const cubeTransforms = useMemo( () => {
        const positions = []
        const rotations = []
        const scales = []

        for ( let i = 0; i < cubeCount; i++ ){
           positions.push( [
                ( Math.random() - 0.5 ) * 8,
                6 + i * 0.2,        
                ( Math.random() - 0.5 ) * 8           
            ] ),
           rotations.push( [
                Math.random(),
                Math.random(),
                Math.random()
           ])
           const scale = 0.2 + Math.random() * 0.8
           scales.push( [scale, scale, scale])
        }

        return {
            positions,
            rotations,
            scales 
        }
    }, [])

    // useEffect( () => {
    //     for(let i = 0; i < cubeCount; i++){
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose(
    //             new THREE.Vector3( i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1,1,1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    const cubeJump = () => {
        const mass = cube.current.mass()
        cube.current.applyImpulse( { x: 0,  y: 5 * mass, z: 0 })
        cube.current.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })
    }

    useFrame( (state) => {
        const time = state.clock.getElapsedTime()

        // Rotation on itself
        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        // Rotation on the plane
        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({ x, y: -0.8, z})
    })

    const collitionEnter = () => {
        hitSound.currentTime = 0
        hitSound.volume = Math.random()
        hitSound.play()
    }

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={ [ 0, -9.81, 0]}>

            {/* <Debug/> */}

            {/* Ball */}
            <RigidBody colliders='ball'>
                <mesh castShadow position={ [ -1.5 , 4, 0 ] }>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            {/* Cube */}
            <RigidBody 
                ref={ cube } 
                position={ [ 1.5, 3, 0 ] } 
                gravityScale={1}
                restitution={0.5} // Bounciness
                colliders={ false }
                onCollisionEnter={ collitionEnter }
            >
                <mesh castShadow onClick={ cubeJump } >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>

                <CuboidCollider mass={ 5 } args={ [ 0.5, 0.5, 0.5] } />
            </RigidBody>

            {/* Twister */}
            <RigidBody
                ref={ twister }
                position={ [0, -0.8, 0] }
                friction={ 0 }
                type="kinematicPosition"
            >
                <mesh castShadow scale={[ 0.4, 0.4, 3 ]}>
                    <boxGeometry/>
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>

            {/* Floor */}
            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            {/* Hamburger */}
            <RigidBody colliders={false} position={ [ 0, 4, 0 ] }>
                <primitive object={ hamburguer.scene } scale={ 0.25 } />
                <CylinderCollider args={ [0.5, 1.25 ] } />
            </RigidBody>

            {/* Invisible Walls */}
            <RigidBody type="fixed">
                <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, 5.5 ] } />
                <CuboidCollider args={ [ 5, 2, 0.5 ] } position={ [ 0, 1, - 5.5 ] } />
                <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ 5.5, 1, 0 ] } />
                <CuboidCollider args={ [ 0.5, 2, 5 ] } position={ [ - 5.5, 1, 0 ] } />
            </RigidBody>

            <InstancedRigidBodies
                positions = { cubeTransforms.positions }
                rotations = { cubeTransforms.rotations }
                scales = { cubeTransforms.scales }
            >
                <instancedMesh castShadow ref={ cubes } args={ [ null, null, cubeCount ] }>
                    <boxGeometry />
                    <meshStandardMaterial color='tomato' />
                </instancedMesh>
            </InstancedRigidBodies>

        </Physics>

    </>
}