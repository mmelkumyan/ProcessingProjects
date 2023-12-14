#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// vec3 color_A = vec3(6., .2, 0.05);
vec3 color_A = vec3(0.890,0.263,0.039);
vec3 color_B = vec3(0.374,0.796,1.000);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

/*
void main() {
	float percent = abs(sin(u_time));
	vec3 color = mix(color_A, color_B, percent);

	gl_FragColor = vec4(color, 1.0);
}
*/
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
	vec3 pct = vec3(st.x);

	// SUNSET - "Compose a gradient that resembles a William Turner sunset"
	pct.r = sin(st.x*PI*0.696+-0.856)+0.028;
    pct.g = sin(st.x*PI*1.148+0.016)*0.976+0.104;
    pct.b = pow(st.x+0.324,1.360)+-0.072;

	// Mix RGB channels based on pct functions
	color = mix(color_A, color_B, pct);

	// Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

	gl_FragColor = vec4(color, 1.0);
}

// Ease in functions: https://thebookofshaders.com/edit.php#06/easing.frag