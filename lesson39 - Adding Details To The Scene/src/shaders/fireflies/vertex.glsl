uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.y += 0.75 - sin(uTime + modelPosition.x * 100.0) * aScale;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  gl_PointSize = uSize * uPixelRatio * aScale;
  gl_PointSize *= (1.0 / - viewPosition.z);
}