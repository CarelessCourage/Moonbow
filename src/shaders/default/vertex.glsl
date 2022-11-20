uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = (uv - vec2(0.5))*0.9 + vec2(0.5);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}