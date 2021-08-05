import './css/style.css'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import Particle from './js/particle'
import Origami from './js/origami'


let scene, camera;
let renderer, renderPass, afterImagePass, composer;
let particle, tsuru;
let mouseX, mouseY;
// let clock = new THREE.Clock();


init()
animate()

function init() {
  
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    75, innerWidth/innerHeight, 0.1, 1000
  )
  camera.position.z = 3.0;
  scene.add(camera)
  
  const light = new THREE.PointLight(0x999999,1)
  scene.add(light)
  renderer = new THREE.WebGL1Renderer({
    canvas: webgl,
    antialias: true,
    alpha: true
  })
  
  renderer.setSize(innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio)

  /* COMPOSER */

  renderPass = new RenderPass( scene, camera );
  afterImagePass = new AfterimagePass(0.8)

  composer = new EffectComposer( renderer );
  composer.addPass(renderPass)
  composer.addPass(afterImagePass)

  /* SCENE OBJECTS */

  particle = new Particle()
  scene.add(particle.mesh)
  particle.mesh.layers.enable(1)
  
  tsuru = new Origami()
  tsuru.display(scene)
  //console.log(tsuru.model)


  /* LISTENERS */
  document.body.onscroll = moveCamera;
  document.body.onmousemove = mouseMove;
  document.body.onresize = Resize;

}

function Resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
}

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.y = top * 0.1;
}

function mouseMove( event ) {
  mouseX = event.clientX - innerWidth/2;
  mouseY = event.clientY - innerHeight/2;

  particle.mesh.rotation.x = -mouseY/10000
  particle.mesh.rotation.y = -mouseX/10000

  if(tsuru.model){
    tsuru.model.rotation.x = -mouseY/10000
    tsuru.model.rotation.y = -mouseX/10000 + Math.PI/2.4
  }
}

function animate() {
  requestAnimationFrame(animate)

  // const elapsedTime = clock.getElapsedTime()
  // particle.mesh.rotation.y = -1 * elapsedTime;
  // console.log(elapsedTime)
  // if(mouseX > 0){
  //   particle.mesh.rotation.x = -mouseX * elapsedTime * 0.00008;
  //   particle.mesh.rotation.y = -mouseY * elapsedTime * 0.00008;
  // }


  particle.update()

  renderer.autoClear = false;
  renderer.clear();

  camera.layers.set(1);
  composer.render();

  renderer.clearDepth();
  camera.layers.set(0);
  renderer.render( scene, camera );

  //renderer.render( scene, camera)

}