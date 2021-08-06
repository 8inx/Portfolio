import './resume.pdf'
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
let canvas;
let mouseX, mouseY;
let minspeed = 10000;


init()
animate()

function init() {
  
  canvas = document.getElementById('webgl')
  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(
    75, innerWidth/innerHeight, 0.1, 1000
  )
  camera.position.z = 3.0;
  scene.add(camera)
  
  const light = new THREE.PointLight(0xffffff,0.6)
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


  /* LISTENERS */
  document.body.onscroll = onScroll;
  document.body.onmousemove = mouseMove;
  document.body.ontouchmove = touchMove;
  document.body.onresize = Resize;
  document.body.onload = onLoad;

}


function Resize() {
  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;
  camera.aspect = document.body.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(document.body.clientWidth, window.innerHeight);
}

function onScroll() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.y = top * 0.05;
}

function mouseMove( event ) {
  mouseX = event.clientX - innerWidth/2;
  mouseY = event.clientY - innerHeight/2;

  particle.mesh.rotation.x = -mouseY/minspeed
  particle.mesh.rotation.y = -mouseX/minspeed

  if(tsuru.model){
    tsuru.model.rotation.x = -mouseY/minspeed
    tsuru.model.rotation.y = -mouseX/minspeed + Math.PI/2.4
  }

}

function touchMove( event ) {
  mouseX = event.touches[0].clientX - innerWidth/2;
  mouseY = event.touches[0].clientY - innerHeight/2;

  particle.mesh.rotation.x = -mouseY/minspeed
  particle.mesh.rotation.y = -mouseX/minspeed

  if(tsuru.model){
    tsuru.model.rotation.x = -mouseY/minspeed
    tsuru.model.rotation.y = -mouseX/minspeed + Math.PI/2.4
  }
}

function animate() {
  requestAnimationFrame(animate)

  particle.update()

  renderer.autoClear = false;
  renderer.clear();

  camera.layers.set(1);
  composer.render();

  renderer.clearDepth();
  camera.layers.set(0);
  renderer.render( scene, camera );

}

function onLoad() {
  const loader = document.getElementById('loader_wrapper')
  const page = document.getElementById('page_wrapper')
  
  loader.style.display = 'none';
  page.style.display = 'block';

}