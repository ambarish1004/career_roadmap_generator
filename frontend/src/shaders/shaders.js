export const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;

export const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uScene;

varying vec2 vUv;

void main() {
  // Time-based waves
  float wave = sin(vUv.y * 10.0 + uTime) * 0.01;

  // Mouse-based distortion
  vec2 dist = vUv - uMouse;
  float strength = 0.03 / length(dist);
  vec2 offset = dist * strength;

  vec4 sceneColor = texture2D(uScene, vUv + offset + wave);

  gl_FragColor = sceneColor;
}

`;
