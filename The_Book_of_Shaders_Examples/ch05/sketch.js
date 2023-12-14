let my_shader;

function preload(){
  my_shader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  noStroke();

}

function draw() {
  my_shader.setUniform("u_resolution", [width, height]);
  my_shader.setUniform("u_time", millis() / 1000.0); // we divide millis by 1000 to convert it to seconds
  my_shader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]); // we flip Y so it's oriented properly in our shader

  shader(my_shader);
  rect(0,0,width,height);
  
}
