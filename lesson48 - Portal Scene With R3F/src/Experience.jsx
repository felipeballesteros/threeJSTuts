import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'

export default function Experience(){

    const { nodes } = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false // flip texture on y axis to make it fit
    

    return <>

        <color args={['#030202']} attach='background'/>

        <OrbitControls makeDefault />

        <mesh geometry={ nodes.baked.geometry }>
            <meshBasicMaterial map={ bakedTexture } />
        </mesh>
        

    </>
}