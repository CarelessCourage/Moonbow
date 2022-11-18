uniform float uTime;
uniform float uVelocity;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.1415926535897932384626433832795;

vec3 defomationCurve(vec3 position, vec2 uv, float offset) {
  position.y -= sin(PI*uv.x) * offset;
  position.z += sin(PI*uv.x) * offset;
  return position;
}

float hoverCos(float time, float amount) {
  return cos(time*0.7) * amount;
}

float hoverSin(float time, float amount) {
  return sin(time*0.7) * amount;
}

void main() {
  vUv = (uv - vec2(0.5))*0.9 + vec2(0.5);
  
  vec3 pos = defomationCurve(position, vUv, uVelocity / 20.0);

  //pos.y += hoverCos(uTime, 10.0);
  vUv.y -= hoverSin(uTime, 0.02);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}