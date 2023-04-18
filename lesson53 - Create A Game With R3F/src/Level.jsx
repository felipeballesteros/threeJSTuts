import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Debug, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import * as THREE from 'three'

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 )

const floor1Material = new THREE.MeshStandardMaterial( { color: 'limegreen'} )
const floor2Material = new THREE.MeshStandardMaterial( { color: 'greenyellow'} )
const obstacleMaterial = new THREE.MeshStandardMaterial( { color: 'orangered'} )
const wallMaterial = new THREE.MeshStandardMaterial( { color: 'slategrey'} )

const BlockStart = ( { position = [ 0, 0, 0 ] }  ) => {
    return <group position={ position } >
        <mesh 
            geometry={ boxGeometry }
            material={ floor1Material }
            position={ [0, -0.1, 0] } 
            scale={ [4, 0.2, 4] } 
            receiveShadow
        />
    </group>
}

const BlockEnd = ( { position = [ 0, 0, 0 ] }  ) => {

    const hamburger = useGLTF('./hamburger.glb')

    hamburger.scene.children.forEach( mesh => {
        mesh.castShadow = true
    })

    return <group position={ position } >
        <mesh 
            geometry={ boxGeometry }
            material={ floor1Material }
            position={ [0, 0, 0] } 
            scale={ [4, 0.2, 4] } 
            receiveShadow
        />

        <RigidBody
            type='fixed'
            colliders='hull'
            restitution={ 0.2 }
            friction={ 0 }
            position={ [ 0, 0.25, 0 ] }
        >
            {/* To cast shadow you have to target the meshes,
            not the primitive, which is a group */}
            <primitive 
                object={ hamburger.scene }
                scale={ 0.2 }
            />
        </RigidBody>
    </group>
}

const BlockSpinner = ( { position = [ 0, 0, 0 ] }  ) => {

    const obstacle = useRef()
    const [ speed ] = useState( () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1) )

    useFrame( (state) => {
        const time = state.clock.getElapsedTime()
        
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler( new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <group position={ position } >
        <mesh 
            geometry={ boxGeometry }
            material={ floor2Material }
            position={ [0, -0.1, 0] } 
            scale={ [4, 0.2, 4] } 
            receiveShadow
        />

        <RigidBody 
            type='kinematicPosition' 
            position={ [0, 0.3, 0] } 
            restitution={ 0.2 } // bounce rate
            friction={ 0 }
            ref={ obstacle }
        >
            <mesh 
                geometry={ boxGeometry }
                material={ obstacleMaterial }
                // position={ [0, -0.1, 0] } 
                scale={ [3.5, 0.3, 0.3] }
                castShadow
                receiveShadow
            />
        </RigidBody>

    </group>
}

const BlockLimbo = ( { position = [ 0, 0, 0 ] }  ) => {

    const obstacle = useRef()
    const [ timeOffset ] = useState( () => Math.random() * Math.PI * 2 )

    useFrame( (state) => {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2]})
    })

    return <group position={ position } >
        <mesh 
            geometry={ boxGeometry }
            material={ floor2Material }
            position={ [0, -0.1, 0] } 
            scale={ [4, 0.2, 4] } 
            receiveShadow
        />

        <RigidBody 
            type='kinematicPosition' 
            position={ [0, 0.3, 0] } 
            restitution={ 0.2 } // bounce rate
            friction={ 0 }
            ref={ obstacle }
        >
            <mesh 
                geometry={ boxGeometry }
                material={ obstacleMaterial }
                // position={ [0, -0.1, 0] } 
                scale={ [3.5, 0.3, 0.3] }
                castShadow
                receiveShadow
            />
        </RigidBody>

    </group>
}

const BlockAxe = ( { position = [ 0, 0, 0 ] }  ) => {

    const obstacle = useRef()
    const [ timeOffset ] = useState( () => Math.random() * Math.PI * 2 )

    useFrame( (state) => {
        const time = state.clock.getElapsedTime()
        const x = Math.sin(time + timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 0.75, z: position[2]})
    })

    return <group position={ position } >
        <mesh 
            geometry={ boxGeometry }
            material={ floor2Material }
            position={ [0, -0.1, 0] } 
            scale={ [4, 0.2, 4] } 
            receiveShadow
        />

        <RigidBody 
            type='kinematicPosition' 
            position={ [0, 0.3, 0] } 
            restitution={ 0.2 } // bounce rate
            friction={ 0 }
            ref={ obstacle }
        >
            <mesh 
                geometry={ boxGeometry }
                material={ obstacleMaterial }
                scale={ [1.5, 1.3, 0.3] }
                castShadow
                receiveShadow
            />
        </RigidBody>

    </group>
}

export default function Level( ) {
    return <>
        <Debug />
    
        <BlockStart position={ [0, 0, 16] }/>
        <BlockSpinner position={ [0, 0, 12] }/>
        <BlockLimbo position={ [0, 0, 8] }/>
        <BlockAxe position={ [0, 0, 4] }/>
        <BlockEnd position={ [0, 0, 0] }/>
    </>
}