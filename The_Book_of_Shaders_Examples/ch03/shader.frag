#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // Canvas size (width, height)
uniform vec2 u_mouse; // Mouse pos in screen pixels
uniform float u_time; // Time in seconds since load

void main() {
	// vec2 st = gl_FragCoord.xy/u_resolution;
	// gl_FragColor = vec4(st.x, st.y,0.0,1.0);

	// - Scrolling red
	// gl_FragColor = vec4(abs(sin(u_time * 1.0/10.0)),0.,0.,1.);
	
	// - Disco scroll
	// gl_FragColor = vec4(abs(sin(u_time * 1.0/1.0)),
	// 	abs(sin(u_time * 1.0/2.0)),
	// 	abs(sin(u_time * 3.0/1.0)),1.);

	// - (0,0) is in the bottom left 
	// gl_FragColor = vec4(u_mouse.x / u_resolution.x,0.,0.,1.);
	// gl_FragColor = vec4(0.,u_mouse.y / u_resolution.y,0.,1.);
	gl_FragColor = vec4(1.-u_mouse.x / u_resolution.x,0.,0.,1.); // flipped

}
