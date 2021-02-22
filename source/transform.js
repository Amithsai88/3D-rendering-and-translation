import { vec3, mat4 } from "https://cdn.skypack.dev/gl-matrix";
import Renderer from "./renderer.js";
export default class Transform {
  constructor() {
    // var renderer = new Renderer();
    // const gl = renderer.webGlContext();
    this.translate = vec3.fromValues(0, 0, 0);
    this.scale = vec3.fromValues(1, 1, 1);
    this.rotationAngle = 0;
    this.rotationAxis = vec3.fromValues(0, 0, 1);

    this.perspectivematrix = mat4.create();
    this.eyematrix = mat4.create();
    this.modelTransformMatrix = mat4.create();
    mat4.identity(this.modelTransformMatrix);
    this.mvpMatrix = this.modelTransformMatrix;

    this.updateMVPMatrix();
  }

  getMVPMatrix() {
    return this.modelTransformMatrix;
  }

  // Keep in mind that modeling transformations are applied to objects in the opposite of the order in which they occur in the code
  updateMVPMatrix() {
    var fieldofview = 90;
    var aspect = 16 / 16;
    var znear = 1 / 2000;
    var zfar = 2000;
    mat4.perspective(this.perspectivematrix, fieldofview, aspect, znear, zfar);
    mat4.identity(this.modelTransformMatrix);
    mat4.translate(
      this.modelTransformMatrix,
      this.modelTransformMatrix,
      this.translate
    );
    mat4.rotate(
      this.modelTransformMatrix,
      this.modelTransformMatrix,
      this.rotationAngle,
      this.rotationAxis
    );
    mat4.scale(
      this.modelTransformMatrix,
      this.modelTransformMatrix,
      this.scale
    );
  }

  updateMVPMatrixaxes(angle) {
    mat4.identity(this.modelTransformMatrix);
    mat4.rotate(
      this.modelTransformMatrix,
      this.modelTransformMatrix,
      angle,
      this.rotationAxis
    );
    mat4.translate(
      this.modelTransformMatrix,
      this.modelTransformMatrix,
      this.translate
    );
    mat4.scale(
      this.modelTransformMatrix,
      this.modelTransformMatrix,
      this.scale
    );
  }

  setTranslate(translationVec) {
    this.translate = translationVec;
  }

  getTranslate() {
    return this.translate;
  }

  setScale(scalingVec) {
    this.scale = scalingVec;
  }

  getScale() {
    return this.scale;
  }

  camera(eye, center, up) {
    mat4.lookAt(this.eyematrix, eye, center, up);
  }
  setRotate(rotationAxis, rotationAngle) {
    this.rotationAngle = rotationAngle;
    this.rotationAxis = rotationAxis;
  }

  getPerspectiveMatrix() {
    return this.perspectivematrix;
  }

  getCameraMatrix() {
    return this.eyematrix;
  }
  getRotate() {
    return this.rotate;
  }
  degToRad(d) {
    return (d * Math.PI) / 180;
  }
  setPerspective() {}
}
