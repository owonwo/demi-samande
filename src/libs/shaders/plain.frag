precision highp float;
uniform sampler2D texture;

varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(texture, vUv);
    // gl_FragColor = vec4(0.0, 0.8, 1.0, 1.0);
}
