attribute vec3 aPosition;

void main() {
  // copy the position data into a vec4, using 1.0 as the w component
  vec4 position_vec4 = vec4(aPosition, 1.0);
  position_vec4.xy = position_vec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = position_vec4;
}