import * as THREE from 'three'
import texture from '../image/particle_texture.png'
import vshader from '../shaders/vertex.glsl'
import fshader from '../shaders/fragment.glsl'


const RandomBetween = (a, b) => {
  return a + (b-a) * Math.random()
}

const RandomPosition = (a, b, c) => {

  let x = a + (b-a) * Math.random();
  if( x >= 0 ){
    x = x + c 
  } else {
    x = x - c ;
  }
  return x;
}

class Particle {
  constructor(){
    
    this.size = 300
    this.speed = 0.1;

    this.material = new THREE.ShaderMaterial({
      uniforms:{
        t_particle: { type: "t", value: new THREE.TextureLoader().load(texture)}
      },
      vertexShader: vshader,
      fragmentShader: fshader,
      transparent: true
    })

    this.geometry = new THREE.BufferGeometry()

    this.positions = new THREE.BufferAttribute(
      new Float32Array( this.size *3), 3
    )
    this.velocity = new THREE.BufferAttribute(
      new Float32Array( this.size * 1), 1
    )
    
    for (let i = 0; i < this.size; i++) {
      let posX = RandomBetween(-50, 50)
      let posY = RandomBetween(-300, 50)
      let posZ = RandomPosition(-50, -5, 2)
      this.positions.setXYZ(i, posX, posY, posZ)
      this.velocity.setX(i, RandomBetween(0.005, 0.05))
    }


    this.geometry.setAttribute("position", this.positions)
    this.geometry.setAttribute("a_velocity", this.velocity)

    this.mesh = new THREE.Points(this.geometry, this.material)
  }


  update = () => {
    let attr = this.mesh.geometry.attributes
    let position = attr.position;
    let velocity = attr.a_velocity;

    for(let i = 0; i < this.size; i++){ 
      let newPos = position.getY(i) + velocity.getX(i)
      if(position.getY(i) >= 50){
        newPos = -300
      }
      position.setY(i, newPos)
      // console.log(position.getY(i))
    }
    position.needsUpdate = true
  }


}

export default Particle;