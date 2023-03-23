import { Float, Environment, useGLTF, OrbitControls } from '@react-three/drei'

export default function Experience()
{

    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return <>

        <Environment preset='city' />

        <color args={ ['#241a1a'] } attach='background' />

        <OrbitControls makeDefault />
        
        <Float rotationIntensity={0.4}>
            <primitive
                position-y={ -1.2 }
                object={ computer.scene } 
            />
        </Float>

    </>
}