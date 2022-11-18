uniform float uTime;
uniform float uVelocity;
uniform sampler2D uTexture;
uniform vec2 uTextureCover;
uniform vec2 uTextureSize;
uniform vec2 uScreenSize;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.1415926535897932384626433832795;

vec3 rgbShift(sampler2D textureimage, vec2 uv, float offset) {
  float displace = sin(PI*vUv.y) * offset;
  float r = texture2D(textureimage, uv + displace).r;
  float g = texture2D(textureimage, uv).g;
  float b = texture2D(textureimage, uv + -displace).b;
  return vec3(r, g, b);
}

float test(sampler2D image, vec2 uv, vec2 power) {
  vec2 direction = vec2(5.0, 1.0);
  vec2 blur = (power * direction) / uScreenSize;

  return texture2D(image, uv).r
    + texture2D(image, uv + blur).r
    + texture2D(image, uv - blur).r;
}

float blurs(sampler2D image, vec2 uv) {
  float velocity = uVelocity / 500.0;
  float velocity2 = uVelocity / 9800.0;
  float color = texture2D(image, uv).r;
  vec2 power = vec2(4.3333333333333333) * velocity;

  int res = 7;
  for (int i = 0; i < res; i++) {
    vec2 p = power / float(i);
    float o = 0.37 / float(res);
    color += test(image, uv, p) * o + abs(velocity2);
  }

  return color * 0.3;
}

vec3 shiftAndBlur(sampler2D image, vec2 uv, float offset) {
  vec2 direction = vec2(5.0, 1.0);
  vec2 blur = (vec2(1.3333333333333333) * direction) / uScreenSize;
  float number = 0.35294117647058826;

  float tt = blurs(image, uv);

  float displace = sin(PI*vUv.y) * offset;
  float r = texture2D(image, uv + displace).r + tt;
  float g = texture2D(image, uv).g;
  float b = texture2D(image, uv - displace).b;
  return vec3(r,g,b);
}


vec2 imageCovertest(vec2 screenSize, vec2 imageSize, sampler2D imageTexture) {
  vec2 s = screenSize; // Screen
  vec2 i = imageSize; // Image
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 uv = vUv * s / new + offset;
  return uv;
}

vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.411764705882353) * direction;
  vec2 off2 = vec2(3.2941176470588234) * direction;
  vec2 off3 = vec2(5.176470588235294) * direction;
  color += texture2D(image, uv) * 0.1964825501511404;
  color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
  color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
  color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
  color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
  return color;
}

void main() {
  float velocity = uVelocity / 98000.0;
  float offset = velocity;

  vec2 coverUV = imageCovertest(uScreenSize, uTextureSize, uTexture);
  
  //vec3 color = shiftAndBlur(uTexture, coverUV, offset / 1.0);
  vec3 color2 = rgbShift(uTexture, coverUV, offset / 1.0);

  //gl_FragColor = vec4(color.r, color2.bg, 1.0);
  gl_FragColor = vec4(color2, 1.0);
}
