import Shader from "./shader.js";
import vertexShaderSrc from "./vertex.js";
import fragmentShaderSrc from "./fragment.js";
import Renderer from "./renderer.js";
import Axes from "./axes.js";
import Urn from "./urn.js";
import Pyramid from "./pyramid.js";
import Mug from "./mug.js";
import { vec3 } from "https://cdn.skypack.dev/gl-matrix";

let prevmug;
let prevpyr;
let prevurn;
let isclick = false;
let dragangle = 0;
let startx;
let scrollleft;
let dragx = false;
let dragy = false;
let dragz = false;
let ispick = false;
const renderer = new Renderer();
const gl = renderer.webGlContext();
let shapes = [];
const shader = new Shader(gl, vertexShaderSrc, fragmentShaderSrc);
shader.use();

let xaxiscolor = [1.0, 0.0, 0.0];
let yaxiscolor = [0.0, 1.0, 0.0];
let zaxiscolor = [0.0, 0.0, 1.0];
let urncolor = [90 / 255, 80 / 255, 90 / 255];
let pyrcolor = [1, 1, 30 / 255];
let mugcolor = [30 / 255, 1, 1];

var eye = vec3.fromValues(9, 9, 9);
let copyeye = vec3.fromValues(9, 9, 9);
let center = vec3.fromValues(0, 0, 0);
let up = vec3.fromValues(0, 1, 0);
function cameratask(shape) {
  shape.transform.camera(eye, center, up);
}
function task(shape, translation, rotationAngle, rotationAxis, scale) {
  cameratask(shape);
  shape.transform.setTranslate(translation);
  shape.transform.setRotate(rotationAxis, rotationAngle);
  shape.transform.setScale(scale);
}
const xaxes = new Axes(gl, "r");
shapes.push(xaxes);
const yaxes = new Axes(gl, "g");
shapes.push(yaxes);
const zaxes = new Axes(gl, "b");
shapes.push(zaxes);
const urn = new Urn(gl);
shapes.push(urn);
const pyramid = new Pyramid(gl);
shapes.push(pyramid);
const mug = new Mug(gl);
shapes.push(mug);

task(
  xaxes,
  vec3.fromValues(0, 0, 0),
  0,
  vec3.fromValues(0, 0, 1),
  vec3.fromValues(1, 1, 1)
);

task(
  yaxes,
  vec3.fromValues(0, 0, 0),
  0,
  vec3.fromValues(0, 1, 0),
  vec3.fromValues(1, 1, 1)
);
task(
  zaxes,
  vec3.fromValues(0, 0, 0),
  0,
  vec3.fromValues(1, 0, 0),
  vec3.fromValues(1, 1, 1)
);
task(
  mug,
  vec3.fromValues(0, 0, 0),
  0,
  vec3.fromValues(1, 0, 0),
  vec3.fromValues(30, 30, 30)
);
task(
  urn,
  vec3.fromValues(0, 0, 0),
  0,
  vec3.fromValues(0, 1, 0),
  vec3.fromValues(2, 2, 2)
);
task(
  pyramid,
  vec3.fromValues(0, 0, 0),
  0,
  vec3.fromValues(0, 0, 1),
  vec3.fromValues(2.5, 2.5, 2.5)
);
window.onload = () => {
  xaxes.transform.updateMVPMatrixaxes(degToRad(270));
  yaxes.transform.updateMVPMatrixaxes(degToRad(90));
  zaxes.transform.updateMVPMatrixaxes(degToRad(90));

  prevmug = [
    vec3.fromValues(0, 0, 0),
    0,
    vec3.fromValues(1, 0, 0),
    vec3.fromValues(30, 30, 30)
  ];
  prevurn = [
    vec3.fromValues(0, 0, 0),
    0,
    vec3.fromValues(0, 1, 0),
    vec3.fromValues(2, 2, 2)
  ];
  prevpyr = [
    vec3.fromValues(0, 0, 0),
    0,
    vec3.fromValues(0, 0, 1),
    vec3.fromValues(2.5, 2.5, 2.5)
  ];

  window.addEventListener("keydown", function(event) {
    let key = document.getElementById("key");
    console.log(event.key);
    switch (event.key) {
      case "d":
        key.innerHTML = `KEY = d`;
        ispick = false;
        dragx = false;
        dragy = false;
        dragz = false;
        prevmug = [
          vec3.fromValues(-5, 0, 0),
          prevmug[1],
          prevmug[2],
          prevmug[3]
        ];
        prevurn = [
          vec3.fromValues(0, -5, 0),
          prevurn[1],
          prevurn[2],
          prevurn[3]
        ];
        prevpyr = [
          vec3.fromValues(5, 5, 0),
          prevpyr[1],
          prevpyr[2],
          prevpyr[3]
        ];
        task(mug, prevmug[0], prevmug[1], prevmug[2], prevmug[3]);
        task(urn, prevurn[0], prevurn[1], prevurn[2], prevurn[3]);
        task(pyramid, prevpyr[0], prevpyr[1], prevpyr[2], prevpyr[3]);
        break;
      case "e":
        key.innerHTML = `KEY = e`;
        ispick = false;
        dragx = false;
        dragy = false;
        dragz = false;
        prevmug = [
          vec3.fromValues(-2.5, -2.5, 0),
          prevmug[1],
          prevmug[2],
          prevmug[3]
        ];
        prevurn = [
          vec3.fromValues(2.5, 0, 0),
          prevurn[1],
          prevurn[2],
          prevurn[3]
        ];
        prevpyr = [
          vec3.fromValues(0, 2.5, 0),
          prevpyr[1],
          prevpyr[2],
          prevpyr[3]
        ];
        task(mug, prevmug[0], prevmug[1], prevmug[2], prevmug[3]);
        task(urn, prevurn[0], prevurn[1], prevurn[2], prevurn[3]);
        task(pyramid, prevpyr[0], prevpyr[1], prevpyr[2], prevpyr[3]);
        break;
      case "f":
        key.innerHTML = `KEY = f`;
        ispick = false;
        dragx = false;
        dragy = false;
        dragz = false;
        prevmug = [
          prevmug[0],
          prevmug[1] + degToRad(90),
          prevmug[2],
          prevmug[3]
        ];
        prevurn = [
          prevurn[0],
          prevurn[1] + degToRad(90),
          prevurn[2],
          prevurn[3]
        ];
        prevpyr = [
          prevpyr[0],
          prevpyr[1] + degToRad(90),
          prevpyr[2],
          prevpyr[3]
        ];
        task(mug, prevmug[0], prevmug[1], prevmug[2], prevmug[3]);
        task(urn, prevurn[0], prevurn[1], prevurn[2], prevurn[3]);
        task(pyramid, prevpyr[0], prevpyr[1], prevpyr[2], prevpyr[3]);
        break;
      case "g":
        key.innerHTML = `KEY = g`;
        ispick = false;
        dragx = false;
        dragy = false;
        dragz = false;
        let k = prevmug[3];
        let scmug = vec3.fromValues(0.5 * k[0], 0.5 * k[1], 0.5 * k[2]);
        let k1 = prevurn[3];
        let scurn = vec3.fromValues(2 * k1[0], 2 * k1[1], 2 * k1[2]);
        let k2 = prevpyr[3];
        let scpyr = vec3.fromValues(3 * k2[0], 3 * k2[1], 3 * k2[2]);
        console.log(scmug, scpyr, scurn);
        prevmug = [prevmug[0], prevmug[1], prevmug[2], scmug];
        prevurn = [prevurn[0], prevurn[1], prevurn[2], scurn];
        prevpyr = [prevpyr[0], prevpyr[1], prevpyr[2], scpyr];
        task(mug, prevmug[0], prevmug[1], prevmug[2], prevmug[3]);
        task(urn, prevurn[0], prevurn[1], prevurn[2], prevurn[3]);
        task(pyramid, prevpyr[0], prevpyr[1], prevpyr[2], prevpyr[3]);
        break;
      case "m":
        key.innerHTML = `KEY = m`;
        ispick = false;
        dragx = false;
        dragy = false;
        dragz = false;
        let m1 = prevmug[3];
        let scmug1 = vec3.fromValues(2 * m1[0], 2 * m1[1], 2 * m1[2]);
        let m2 = prevurn[3];
        let scurn1 = vec3.fromValues(0.5 * m2[0], 0.5 * m2[1], 0.5 * m2[2]);
        let m3 = prevpyr[3];
        let scpyr1 = vec3.fromValues(
          (1 / 3) * m3[0],
          (1 / 3) * m3[1],
          (1 / 3) * m3[2]
        );
        prevmug = [prevmug[0], prevmug[1], prevmug[2], scmug1];
        prevurn = [prevurn[0], prevurn[1], prevurn[2], scurn1];
        prevpyr = [prevpyr[0], prevpyr[1], prevpyr[2], scpyr1];
        task(mug, prevmug[0], prevmug[1], prevmug[2], prevmug[3]);
        task(urn, prevurn[0], prevurn[1], prevurn[2], prevurn[3]);
        task(pyramid, prevpyr[0], prevpyr[1], prevpyr[2], prevpyr[3]);
        break;
      case "h":
        key.innerHTML = `KEY = h`;
        ispick = true;
        dragx = false;
        dragy = false;
        dragz = false;
        function pixelscolr(x, y) {
          var pixels = new Uint8Array(4);
          renderer.clear();
          animate();
          gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          return pixels;
        }
        document.addEventListener("mousedown", function(event) {
          if (ispick) {
            xaxes.pick = 0;
            yaxes.pick = 0;
            zaxes.pick = 0;
            mug.pick = 0;
            urn.pick = 0;
            pyramid.pick = 0;
            let x = event.clientX;
            let y = event.clientY;
            var rect = event.target.getBoundingClientRect();
            x = x - rect.left;
            y = rect.bottom - y;
            let pixels = Array.from(pixelscolr(x, y));
            let shapecolor = [
              pixels[0] / 255,
              pixels[1] / 255,
              pixels[2] / 255
            ];

            if (compareArrays(shapecolor, xaxiscolor)) {
              xaxes.pick = 1;
            }
            if (compareArrays(shapecolor, yaxiscolor)) {
              yaxes.pick = 1;
            }
            if (compareArrays(shapecolor, zaxiscolor)) {
              zaxes.pick = 1;
            }
            if (compareArrays(shapecolor, mugcolor)) {
              mug.pick = 1;
            }
            if (compareArrays(shapecolor, urncolor)) {
              urn.pick = 1;
            }
            if (compareArrays(shapecolor, pyrcolor)) {
              pyramid.pick = 1;
            }
          }
        });
        break;
      case "y":
        key.innerHTML = `KEY = y`;
        ispick = false;
        dragy = true;
        dragx = false;
        dragz = false;
        // up = vec3.fromValues(0, 1, 0);
        // shapes.forEach(s => {
        //   s.transform.camera(eye, center, up);
        // });
        document.addEventListener(
          "mousedown",
          event => {
            isclick = true;
            startx = event.clientX;
            scrollleft = document.scrollLeft;
          },
          false
        );
        document.addEventListener(
          "mouseup",
          event => {
            isclick = false;
          },
          false
        );
        document.addEventListener(
          "mousemove",
          event => {
            event.preventDefault();
            if (isclick && dragy) {
              let mousex = event.clientX;
              let walk = mousex - startx;
              document.scrollLeft = scrollleft - walk;
              if (walk <= 0) {
                console.log("incera");
                dragangle += 1;
              } else {
                console.log("decera");
                dragangle -= 1;
              }
              let cos = Math.cos(degToRad(dragangle));
              let sin = Math.sin(degToRad(dragangle));
              eye[0] = copyeye[0] * cos + copyeye[2] * sin;
              eye[1] = copyeye[1];
              eye[2] = copyeye[2] * cos - copyeye[0] * sin;

              console.log(dragangle);
              startx = event.clientX;
            }
            shapes.forEach(s => {
              s.transform.camera(eye, center, up);
            });
          },
          false
        );
        break;
      case "z":
        key.innerHTML = `KEY = z`;
        ispick = false;
        dragz = true;
        dragx = false;
        dragy = false;
        // up = vec3.fromValues(0, 0, 1);
        // shapes.forEach(s => {
        //   s.transform.camera(eye, center, up);
        // });
        document.addEventListener(
          "mousedown",
          event => {
            isclick = true;
            startx = event.clientX;
            scrollleft = document.scrollLeft;
          },
          false
        );
        document.addEventListener(
          "mouseup",
          event => {
            isclick = false;
          },
          false
        );
        document.addEventListener(
          "mousemove",
          event => {
            event.preventDefault();
            if (isclick && dragz) {
              let mousex = event.clientX;
              let walk = mousex - startx;
              document.scrollLeft = scrollleft - walk;
              if (walk <= 0) {
                console.log("incera");
                dragangle += 1;
              } else {
                console.log("decera");
                dragangle -= 1;
              }
              let cos = Math.cos(degToRad(dragangle));
              let sin = Math.sin(degToRad(dragangle));
              eye[0] = copyeye[0] * cos + copyeye[1] * sin;
              eye[1] = copyeye[1] * cos - copyeye[0] * sin;
              eye[2] = copyeye[2];

              console.log(dragangle);
              startx = event.clientX;
            }
            shapes.forEach(s => {
              s.transform.camera(eye, center, up);
            });
          },
          false
        );
        break;
      case "x":
        key.innerHTML = `KEY = x`;
        ispick = false;
        dragx = true;
        dragy = false;
        dragz = false;
        // up = vec3.fromValues(1, 0, 0);
        // shapes.forEach(s => {
        //   s.transform.camera(eye, center, up);
        // });
        document.addEventListener(
          "mousedown",
          event => {
            isclick = true;
            startx = event.clientX;
            scrollleft = document.scrollLeft;
          },
          false
        );
        document.addEventListener(
          "mouseup",
          event => {
            isclick = false;
          },
          false
        );
        document.addEventListener(
          "mousemove",
          event => {
            event.preventDefault();
            if (isclick && dragx) {
              let mousex = event.clientX;
              let walk = mousex - startx;
              document.scrollLeft = scrollleft - walk;
              if (walk <= 0) {
                console.log("incera");
                dragangle += 1;
              } else {
                console.log("decera");
                dragangle -= 1;
              }
              let cos = Math.cos(degToRad(dragangle));
              let sin = Math.sin(degToRad(dragangle));
              eye[0] = copyeye[0];
              eye[1] = copyeye[1] * cos + copyeye[2] * sin;
              eye[2] = copyeye[2] * cos - copyeye[1] * sin;

              console.log(dragangle);
              startx = event.clientX;
            }
            shapes.forEach(s => {
              s.transform.camera(eye, center, up);
            });
          },
          false
        );
        break;
    }
  });
};
function compareArrays(colr1, colr2) {
  return JSON.stringify(colr1) == JSON.stringify(colr2);
}
function degToRad(d) {
  return (d * Math.PI) / 180;
}
function animate() {
  renderer.clear();
  urn.transform.updateMVPMatrix();
  pyramid.transform.updateMVPMatrix();
  mug.transform.updateMVPMatrix();
  xaxes.draw(shader);
  yaxes.draw(shader);
  zaxes.draw(shader);
  urn.draw(shader);
  pyramid.draw(shader);
  mug.draw(shader);
  window.requestAnimationFrame(animate);
}

animate();
shader.delete();
