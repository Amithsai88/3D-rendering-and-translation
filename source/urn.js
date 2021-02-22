import Transform from "./transform.js";
import objLoader from "https://cdn.skypack.dev/webgl-obj-loader";
export default class Urn {
  constructor(gl) {
    var ObjStr = document.getElementById("urn.obj").innerHTML;
    const urnData = new objLoader.Mesh(ObjStr);
    this.colors = [];
    this.pick = 0;
    this.fclr = [90 / 255, 80 / 255, 90 / 255];
    this.vertexAttributesData = new Float32Array(urnData.vertices);
    this.vertexIndices = new Uint16Array(urnData.indices);
    this.gl = gl;

    for (var j = 0; j < urnData.vertices.length / 3; j++) {
      this.colors = this.colors.concat(this.fclr);
    }
    this.vertexAttributesBuffer = this.gl.createBuffer();
    if (!this.vertexAttributesBuffer) {
      throw new Error("Buffer for vertex attributes could not be allocated");
    }
    this.transform = new Transform();
  }

  draw(shader) {
    const uModelTransformMatrix = shader.uniform("uModelTransformMatrix");
    let elementPerVertex = 3;

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexAttributesBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.vertexAttributesData),
      this.gl.STATIC_DRAW
    );
    const picker = shader.uniform("clrpick");
    shader.setUniformi(picker, this.pick);
    const aPosition = shader.attribute("aPosition");
    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(
      aPosition,
      elementPerVertex,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    const indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.vertexIndices),
      this.gl.STATIC_DRAW
    );

    const colBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.colors),
      this.gl.STATIC_DRAW
    );
    const aColor = shader.attribute("color");
    this.gl.enableVertexAttribArray(aColor);
    this.gl.vertexAttribPointer(
      aColor,
      elementPerVertex,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    const persMatrix = shader.uniform("perspectiveMatrix");
    shader.setUniformMatrix4fv(
      persMatrix,
      this.transform.getPerspectiveMatrix()
    );

    const cameraMatrix = shader.uniform("cameraMatrix");
    shader.setUniformMatrix4fv(cameraMatrix, this.transform.getCameraMatrix());

    shader.setUniformMatrix4fv(
      uModelTransformMatrix,
      this.transform.getMVPMatrix()
    );

    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.vertexIndices.length,
      this.gl.UNSIGNED_SHORT,
      0
    );
  }

  addVertex(position, color) {
    // New data can not be pushed to Typed arrays, we need to re-create them when required to edit
    this.vertexAttributesData = new Float32Array([
      ...this.vertexAttributesData,
      ...position,
      ...color
    ]);
  }
}
