#ifdef GL_ES
precision mediump float;
#endif

#define GLSLIFY 1
#pragma glslify: pnoise = require(./noise.glsl)

uniform float uTime;
uniform float uT;
uniform float uRevert;

uniform sampler2D uTexture;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec2 vWindowRatio;
varying vec2 vResolution;

vec2 center = vec2(.5);
float speed = 0.001;


float blob(vec2 st, in float radius) {
    float velocity = uTime * speed;

    float intensity = 5.0 * (1.0 - uT);
    float n = pnoise(st * intensity + velocity);
    float gap = radius - (radius * n);

    vec2 dist = (st - uMouse) * vWindowRatio;
    float c = step(radius, dot(dist, dist) * 5.0);

    return smoothstep(radius, radius + gap, dot(dist, dist) * 5.0);
}

void main() {
    vec2 st = gl_FragCoord.xy / vResolution.xy;

    float radius = uT * 2.0;
    float alpha = blob(st, radius);
    float d = abs(uRevert - alpha);

    vec3 texture = texture2D(uTexture, vUv + d * .01).rgb;
    gl_FragColor = vec4(texture, d);
}