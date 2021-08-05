import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import tsuru from '../models/tsuru.gltf'


class Origami {
  constructor(){
    
  }

  display = (scene) => {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/' );

    loader.load(tsuru, (gltf)=>{
      this.model = gltf.scene;
      scene.add(this.model)
      this.model.scale.set(20,20,20);
      this.model.position.y = -10
      this.model.position.z = -20
      this.model.rotation.y = Math.PI/2.4
    })
  }
}


async function GetModels() {
  
}

export default Origami;