import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'

export default function Experience(){

    const { nodes } = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false // flip texture on y axis to make it fit
    

    return <>

        <color args={['#030202']} attach='background'/>

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={ nodes.baked.geometry }>
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            {/* Pole Lights */}
            <mesh
                geometry={ nodes.poleLightA.geometry }
                position={ nodes.poleLightA.position }
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh
                geometry={ nodes.poleLightB.geometry }
                position={ nodes.poleLightB.position }
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>
        </Center>

    </>
}