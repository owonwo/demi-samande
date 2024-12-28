import { Renderer, Camera, Box, Mesh, Transform, Program } from "ogl";
import { Media } from "./media";

export default class Canvas {
  debug = false;
  medias = [];

  constructor() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createImages();
  }

  createRenderer() {
    this.renderer = new Renderer();
    this.gl = this.renderer.gl;

    const canvas = this.gl.canvas;
    canvas.classList.add("canvas");
    document.body.appendChild(canvas);
  }

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    });

    const { height, width } = this.calculateFOV(this.camera);
    this.sizes = {
      height,
      width,
    };
  }

  // for determining the width and height in view.
  calculateFOV(camera) {
    const fov = camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * camera.position.z;
    const width = height * camera.aspect;

    return {
      fov,
      height,
      width,
    };
  }

  createScene() {
    this.scene = new Transform();
  }

  createImages() {
    const elements = document.querySelectorAll(".gl-image");
    this.medias = Array.from(elements, (element, index) => {
      return new Media({
        gl: this.gl,
        index: index,
        scene: this.scene,
        element: element,
      });
    });
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;
  }

  registerListeners() {
    window.addEventListener("mousemove", (event) => {
      for (const media of this.medias) {
        media.onMouseMove(event);
      }
    });
  }

  update() {
    if (this.debug) {
      console.count("Rendering");
    }

    for (const media of this.medias) {
      media.update({ screen: this.sizes });
    }

    this.renderer.render({
      camera: this.camera,
      scene: this.scene,
    });
  }
}
