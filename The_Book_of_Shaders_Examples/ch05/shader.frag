#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
// float plot(vec2 st) {    
//     return smoothstep(0.02, 0.0, abs(st.y - st.x));
// }

#define PI 3.14159265359

float plot(vec2 st, float pct, float thickness){
  return  smoothstep( pct-thickness, pct, st.y) -
          smoothstep( pct, pct+thickness, st.y);
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    // float y = st.x; // Linear: x
    // float y = pow(st.x, 3.); //Polynomial?: x^n
    // float y = exp(st.x * .5)-1.; // Exponential: e^x
    // float y = log(st.x+1.); // Log: log(x)
    // float y = sqrt(st.x); // Sqiare root
    // float y = step(0.5,st.x); // Step function
    // float y = smoothstep(0.4, 0.9, st.x); // Smooth step function
    // float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x); // Double smooth step (bell curve)
    // float y = sin(2.*PI * st.x); // Sin
    // float y = cos(2.*PI * st.x); // Cos
    // float y = abs(sin(20. * st.x)); // Mountains!
    // float y = sin(st.x + u_time); // Scrolling sin (shifted)
    // float y = sin(st.x * u_time); // Shrinking sin (frequency)
    // float y = sin(st.x) *2.; // Steeper sin (amplitude)
    // float y = fract(sin(st.x * 2. * PI)) ; // Inverse sin
    // float y = ceil(sin(st.x * 4. * PI)); // 2bit wave sin

    float y;
    float x = st.x;
    //Others...
    // y = mod(x,0.5); // return x modulo of 0.5
    // y = fract(x); // return only the fraction part of a number
    // y = ceil(x);  // nearest integer that is greater than or equal to x
    // y = floor(x); // nearest integer less than or equal to x
    // y = sign(x);  // extract the sign of x
    // y = abs(x);   // return the absolute value of x
    // y = clamp(x,0.2,.8); // constrain x to lie between 0.2 and 0.8
    // y = min(0.0,x);   // return the lesser of x and 0.0
    // y = max(0.0,x);   // return the greater of x and 0.0 

    vec3 color = vec3(y);

    // Plot a line
    // float pct = plot(st);
    // float pct = plot(st,y);
    float pct = plot(st, y, 0.02);
    color = (1.0-pct)*color + pct*vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}