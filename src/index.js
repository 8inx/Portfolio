import './css/style.css'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import Particle from './js/particle'


let scene, camera;
let renderer, renderPass, afterImagePass, composer;
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

  renderPass = new RenderPass( scene, camera );
  afterImagePass = new AfterimagePass(0.8)

  composer = new EffectComposer( renderer );
  composer.addPass(renderPass)
  composer.addPass(afterImagePass)

  particle = new Particle()
  scene.add(particle.mesh)
  particle.mesh.layers.enable(1)




  camera.position.z = 3.0;
  document.body.onscroll = moveCamera;

}

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.y = top * 0.1;
}

function animate() {
  requestAnimationFrame(animate)

  camera.layers.set(1);
  composer.render();

  //renderer.render( scene, camera)

  particle.update()

}