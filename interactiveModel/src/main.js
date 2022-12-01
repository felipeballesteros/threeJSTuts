import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

(() => {
  // Set our main variables
  let scene,  
    renderer,
    camera,
    model,                              // Our character
    neck,                               // Reference to the neck bone in the skeleton
    waist,                               // Reference to the waist bone in the skeleton
    possibleAnims,                      // Animations found in our file
    mixer,                              // THREE.js animations mixer
    idle,                               // Idle, the default state our character returns to
    clock = new THREE.Clock(),          // Used for anims, which run to a clock instead of frame rate 
    currentlyAnimating = false,         // Used to check whether characters neck is being used in another anim
    raycaster = new THREE.Raycaster(),  // Used to detect the click on our character
    loaderAnim = document.getElementById('js-loader')

    const init = () => {
      const canvas = document.querySelector("#canvasElement")
      const backgroundColor = 0xf1f1f1
    
      // Init the scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(backgroundColor)
      scene.fog = new THREE.Fog(backgroundColor, 60, 100)

      // Init the renderer
      renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: true,
        setPixelRatio: window.devicePixelRatio,
      })

      renderer.shadowMap.enabled = true

      document.body.appendChild(renderer.domElement)


      // Add a camera
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )

      camera.position.set(0, -3, 30)

      // Add texture for model
      let stacy_txt = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg')
      stacy_txt.flipY = false
      
      const stacy_mtl = new THREE.MeshPhongMaterial({
        map: stacy_txt,
        color: 0xffffff
      })

      // Add Model
      const MODEL_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb'
      let loader = new GLTFLoader()
      
      loader.load(
        MODEL_PATH,
        (gltf) => {
          const model = gltf.scene
          let fileAnimations = gltf.animations

          model.traverse( o => {
            if (o.isMesh) {
              o.castShadow = true
              o.receiveShadow = true
              o.material = stacy_mtl
            }

            // Reference the neck and waist bones
            if (o.isBone && o.name === 'mixamorigNeck'){
              neck = o
            }
            if (o.isBone && o.name === 'mixamorigSpine'){
              waist = o
            }
          })

          // set the models initial scale
          model.scale.set(7,7,7)
          model.position.y = -11

          scene.add(model)

          // Animations
          mixer = new THREE.AnimationMixer(model)
          let idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'idle')

          idleAnim.tracks.splice(3, 3)
          idleAnim.tracks.splice(9, 3)

          idle = mixer.clipAction(idleAnim)
          idle.play()
        },
        undefined, // no need for this function
        (error) => {
          console.log(error)
        }
      )

      // Remove loading animation
      loaderAnim.remove()


      // Add lights
      // Hemisphere Light
      let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61)
      hemiLight.position.set(0, 50, 0)
      
      // Add Hemisphere light to the scene
      scene.add(hemiLight)

      // Directional Light
      let d = 8.25
      let dirLight = new THREE.DirectionalLight(0xffffff, 0.54)
      dirLight.position.set(-8, 12, 8)
      dirLight.castShadow = true
      dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024)
      dirLight.shadow.camera.near = 0.1
      dirLight.shadow.camera.far = 1500
      dirLight.shadow.camera.left = d * -1
      dirLight.shadow.camera.right = d
      dirLight.shadow.camera.top = d
      dirLight.shadow.camera.bottom = d * -1

      scene.add(dirLight)


      // Floor
      let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1)
      let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        shininess: 0,
      })

      let floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.rotation.x = -0.5 * Math.PI
      floor.receiveShadow = true
      floor.position.y = -11
      
      scene.add(floor)

      // Circle in the background
      let geometry = new THREE.SphereGeometry(8, 32, 32)
      let material = new THREE.MeshBasicMaterial({ color: 0xf2ce2e }) // 0xf2ce2e 
      let sphere = new THREE.Mesh(geometry, material)
      sphere.position.z = -15
      sphere.position.y = -2.5
      sphere.position.x = -0.25

      scene.add(sphere);
    }

    const resizeRendererToDisplaySize = renderer => {
      const canvas = renderer.domElement
      let width = window.innerWidth
      let height = window.innerHeight
      let canvasPixelWidth = canvas.width / window.devicePixelRatio
      let canvasPixelHeight = canvas.height / window.devicePixelRatio

      const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height
      
      if(needResize){
        renderer.setSize(width, height, false)
      }
      return needResize
    }

    const update = () => {
      if(mixer) {
        mixer.update(clock.getDelta())
      }

      if (resizeRendererToDisplaySize(renderer)){
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }
      renderer.render(scene, camera)
      requestAnimationFrame(update)
    }



    // Start execution here
    init()
    update()

    document.addEventListener('mousemove', e => {
      let mouseCoords = getMousePos(e)
      if (neck && waist){
        moveJoint(mouseCoords, neck, 50)
        moveJoint(mouseCoords, waist, 30)
      }
    })

    const getMousePos = e => {
      return {
        x: e.clientX,
        y: e.clientY
      }
    }

    const moveJoint = (mouse, joint, degreeLimit) => {
      let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit)
      joint.rotation.y = THREE.MathUtils.degToRad(degrees.x)
      joint.rotation.x = THREE.MathUtils.degToRad(degrees.y)
    }

    const getMouseDegrees = (x, y, degreeLimit) => {
      let dx = 0,
          dy = 0,
          xdiff,
          xPercentage,
          ydiff,
          yPercentage

      let w = { x: window.innerWidth, y: window.innerHeight }

      // Left (Rotates neck left between 0 and -degreeLimit)
      // 1. If cursor is on the left half of the screen
      if( x <= w.x / 2) {
        // 2. Get the difference between middle of screen and cursor position
        xdiff = w.x / 2 - x
        // 3. Find the percentage of that difference (percentage toward edge on the screen)
        xPercentage = (xdiff / (w.x / 2)) * 100
        // 4. Convert that to a percentage of the maximum rotation we allow for the neck
        dx = ((degreeLimit * xPercentage) / 100) * -1
      }

      // Right (Rotates neck right between 0 and degreeLimit)
      if (x >= w.x / 2) {
        xdiff = x - w.x / 2;
        xPercentage = (xdiff / (w.x / 2)) * 100;
        dx = (degreeLimit * xPercentage) / 100;
      }

      // Up (Rotates neck up between 0 and -degreeLimit)
      if (y <= w.y / 2) {
        ydiff = w.y / 2 - y
        yPercentage = (ydiff / (w.y / 2)) * 100
        // Note that I cut degreeLimit in half when she looks up
        dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1
      }

      // Down (Rotates neck down between 0 and degreeLimit)
      if (y >= w.y / 2) {
        ydiff = y - w.y / 2;
        yPercentage = (ydiff / (w.y / 2)) * 100;
        dy = (degreeLimit * yPercentage) / 100;
      }
      return { x: dx, y: dy }
    }

  })()
