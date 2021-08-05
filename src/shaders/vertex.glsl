attribute float a_velocity;


void main(){

  vec3 pos = position;

  vec4 mvPosition =  modelViewMatrix * vec4( pos, 1.0 );
  gl_PointSize = 200. * (1. / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

}