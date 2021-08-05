uniform sampler2D t_particle;

void main(){

  vec4 mask  = texture2D(t_particle, gl_PointCoord);

  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  gl_FragColor.a *= mask.r;
}