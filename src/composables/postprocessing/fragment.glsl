uniform float uTime;
uniform float uVelocity;
uniform sampler2D tDiffuse;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.1415926535897932384626433832795;

vec3 rgbShift(sampler2D image, vec2 uv, float offset, float map) {
  float oo = offset = map * offset;
  float r = texture2D(image, uv + oo).r;
  float g = texture2D(image, uv).g;
  float b = texture2D(image, uv + -oo).b;
  return vec3(r, g, b);
}

vec2 defomationCurve(vec2 uv, float offset) {
  uv.y -= sin(PI*vUv.x) * offset;
  return uv;
}

float gradient(float amout, float force, float direction) {
  vec2 uvTest = vUv;
  vec4 top = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 bottom = vec4(0.0, 0.0, 0.0, 1.0);

  vec2 origin = vec2(amout, force);
  uvTest -= origin;
  
  float angle = radians(direction) + atan(uvTest.y, uvTest.x);

  float len = length(uvTest); 
  uvTest = vec2(cos(angle) * len, sin(angle) * len) + origin;
    
  return mix(top, bottom, smoothstep(0.0, 1.0, uvTest.x)).y;
}

vec2 deformedUv(float map) {
  float deform = clamp(map * 1.0, 0.0, 1.0);
  return (vUv - vec2(0.5))*deform + vec2(0.5);
}

void main() {
  float velocity = uVelocity / 98000.0;
  float offset = velocity;

  float amout = 0.02;
  float force = 0.3;
  float direction = 90.0;

  float g = gradient(amout, force, direction);
  vec2 newUv = deformedUv(g);

  vec3 color = rgbShift(tDiffuse, newUv, 0.0, g );
  gl_FragColor = vec4(color, 1.0);
}
