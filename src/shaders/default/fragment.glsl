uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uScreenSize;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
  float r = texture2D(uTexture, vUv).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}
