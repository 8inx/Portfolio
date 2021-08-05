import './css/style.css'
import * as THREE from 'three'
import Particle from './js/particle'

let scene, camera, renderer;
let particle


init()
animate()

function init() {
  
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    75, innerWidth/innerHeight, 0.1, 1000
  )
  scene.add(camera)


  renderer = new THREE.WebGL1Renderer({
    canvas: webgl,
    antialias: true,
    alpha: true
  })
  
  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio)

  particle = new Particle()
  scene.add(particle.mesh)



  camera.position.z = 3.0

}

function animate() {
  requestAnimationFrame(animate)
  renderer.render( scene, camera)

  particle.update()

}