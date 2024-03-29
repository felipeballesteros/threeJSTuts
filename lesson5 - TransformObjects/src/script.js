import './style.css'
import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new MeshBasicMaterial({ color: 0xff0000 })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new MeshBasicMaterial({ color: 0x00ff00 })
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new MeshBasicMaterial({ color: 0x0000ff })
)

cube2.position.x = 2
cube3.position.x = -2

group.add(cube1, cube2, cube3)
group.position.y = 1


// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
  
// scene.add(mesh)
// mesh.position.set(0.7, -0.6, 0.5)

// Scale
// mesh.scale.set(2, 0.5, 0.5)

// Rotation
// mesh.rotation.y = 1

// Axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera 
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 0.5
// camera.position.x = 1

scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)