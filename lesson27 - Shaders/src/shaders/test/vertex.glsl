uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main(){

    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // Breakdown:
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Creating the wave here:
    modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}