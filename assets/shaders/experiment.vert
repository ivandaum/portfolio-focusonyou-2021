attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uScale;
uniform float uRatio;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec2 vWindowRatio;
varying vec2 vResolution;

void main() {
    vUv = uv; 
    vResolution = uResolution;
    vWindowRatio = vec2(1.0, uResolution.y / uResolution.x);

    vec3 sPosition = vec3(position.x * uRatio, position.y, position.z);
    sPosition *= uScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(sPosition, 1.0);
}