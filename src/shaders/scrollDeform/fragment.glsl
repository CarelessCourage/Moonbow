uniform float uTime;
uniform float uVelocity;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uScreenSize;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.1415926535897932384626433832795;

vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 displace, float offset) {
  float bend = sin(PI*vUv.y) * offset;
  float r = texture2D(textureimage, uv + bend + (displace * 0.9)).r;
  float g = texture2D(textureimage, uv + (displace * 1.0)).g;
  float b = texture2D(textureimage, uv + -bend + (displace * 1.1)).b;
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

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec3 perlin(vec2 uv) {
  vec3 color = vec3(0.0);
  vec2 pos = vec2(uv*3.);

  float DF = 0.0;

  // Add a random position
  float a = 0.0;
  vec2 vel = vec2(uTime*.1);
  DF += snoise(pos+vel)*.25+.25;

  // Add a random position
  a = snoise(pos*vec2(cos(uTime*0.15),sin(uTime*0.1))*0.1)*3.1415;
  vel = vec2(cos(a),sin(a));
  DF += snoise(pos+vel)*.25+.25;

  return vec3( smoothstep(.5,1.15,fract(DF)) );
}


void main() {
  float velocity = uVelocity / 98000.0;
  float offset = velocity;

  vec2 coverUV = imageCovertest(uScreenSize, uTextureSize, uTexture);

  vec3 per = perlin(coverUV);
  vec2 per2 = vec2(per.r, per.r) / 1.0;

  vec3 color = rgbShift(uTexture, coverUV, per2, offset / 1.0);

  gl_FragColor = vec4(color, 1.0);
}
