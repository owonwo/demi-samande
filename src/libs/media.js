import { Box, Geometry, Mesh, Plane, Program, Sphere, Texture } from "ogl";
import fragment from "./shaders/plain.frag";
import vertex from "./shaders/plain.vert";

export class Media {
  constructor({ gl, scene, element, index }) {
    this.gl = gl;
    this.element = element;
    this.scene = scene;
    this.index = index;

    this.createTexture();
    this.createProgram();
    this.createMesh();
    this.createBounds();
  }

  createTexture() {
    this.texture = new Texture(this.gl);
    this.image = new Image();
    this.image.src = this.element.getAttribute("src");
    this.image.crossOrigin = "anonymous";
    console.log(`Loading started ${this.index}`);
    this.image.addEventListener("load", () => {
      console.log(`Loaded ${this.index}`);
      this.texture.image = this.image;
    });
  }

  createProgram() {
    this.geometry = new Plane(this.gl);
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        texture: { value: this.texture },
      },
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });

    this.mesh.position.x += this.index * this.mesh.scale.x;
    this.originalPosition = {
      x: this.mesh.position.x,
      y: this.mesh.position.y,
    };
    this.mesh.setParent(this.scene);
  }

  createBounds() {
    this.bounds = this.element.getBoundingClientRect();
    this.screen = { width: 0, height: 0 };
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.updateScale();
    this.updateX();
    this.updateY();
  }

  updateScale() {
    this.mesh.scale.x =
      (this.screen.width * this.bounds.width) / this.viewport.width;
    this.mesh.scale.y =
      (this.screen.height * this.bounds.height) / this.viewport.height;
  }

  updateX(x = 0) {
    this.mesh.position.x =
      -(this.screen.width / 2) +
      this.mesh.scale.x / 2 +
      ((this.bounds.left - x) / this.viewport.width) * this.screen.width;
  }

  updateY(y = 0) {
    console.log(y);
    this.mesh.position.y =
      this.screen.height / 2 -
      this.mesh.scale.y / 2 -
      ((this.bounds.top - y) / this.viewport.height) * this.screen.height;
  }

  updateAll({ x, y }) {
    this.updateScale();
    this.updateX(x);
    this.updateY(y);
  }

  update({ screen }) {
    if (!this.mesh) return;
    this.screen = screen;
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    if (!this.once) {
      this.updateAll({});
      this.once = true;
    }
  }

  onMouseMove(event) {
    const x = event.clientX;
    const y = event.clientY - window.scrollY;

    console.log({ x, y });

    this.updateAll({ x, y });
  }
}
