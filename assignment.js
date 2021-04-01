var program;
var gl;
var thetaB = 0;
var thetaN = 0;
var scaleB = 1;
var scaleN = 1;
var transXB = 0;
var transYB = 0;
var transXN = 0;
var transYN = 0;
var bufferB;
var bufferN;
var verticesB;
var verticesN;
var checkB;
var checkN;
var redVal = 127;
var greenVal = 127;
var blueVal = 127;
var colors;

var debugColor = 1.0; //DEBUGGING COLORS
var idMatrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];
window.onload = function init() {

    //=============INITIALIZATION==================
    const canvas = document.querySelector("#glcanvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    //=================================================

    verticesB = [
        //B LEFT MAIN COLUMN
        vec2(-0.8, -0.8),
        vec2(-0.8, 0.8),
        vec2(-0.7, -0.8),
        vec2(-0.7, 0.8),
        vec2(-0.7, -0.8),
        vec2(-0.8, 0.8),
        //B TOP ROW
        vec2(-0.7, 0.8),
        vec2(-0.7, 0.6),
        vec2(-0.3, 0.6),
        vec2(-0.7, 0.8),
        vec2(-0.3, 0.8),
        vec2(-0.3, 0.6),
        //B LATEST ADDITION OF INCLINES (TOP-BOTTOM)
        vec2(-0.3, 0.8),
        vec2(-0.3, 0.6),
        vec2(-0.2, 0.6),
        vec2(-0.3, -0.6),
        vec2(-0.3, -0.8),
        vec2(-0.2, -0.6),
        //B TOP COLUMN
        vec2(-0.3, 0.6),
        vec2(-0.3, 0.25),
        vec2(-0.2, 0.6),
        vec2(-0.2, 0.6),
        vec2(-0.2, 0.25),
        vec2(-0.3, 0.25),
        //B TOP INCLINE
        vec2(-0.2, 0.25),
        vec2(-0.3, 0.0),    //Y -> 1.0
        vec2(-0.4, 0.0),    //Y -> 1.0
        vec2(-0.4, 0.0),    //Y -> 1.0
        vec2(-0.3, 0.25),
        vec2(-0.2, 0.25),
        //B MIDDLE ROW
        vec2(-0.3, 0.1),    //X -> -0.4
        vec2(-0.7, 0.1),
        vec2(-0.3, -0.1),   //X -> -0.4
        vec2(-0.7, 0.1),
        vec2(-0.7, -0.1),
        vec2(-0.3, -0.1),   //X -> -0.4
        //B BOTTOM INCLINE
        vec2(-0.4, -0.0),   //Y -> -1.0
        vec2(-0.3, -0.0),   //Y -> -1.0
        vec2(-0.2, -0.25),
        vec2(-0.2, -0.25),
        vec2(-0.4, -0.0),   //Y -> -1.0
        vec2(-0.3, -0.25),
        //B BOTTOM COLUMN
        vec2(-0.3, -0.25),
        vec2(-0.2, -0.25),
        vec2(-0.3, -0.6),
        vec2(-0.3, -0.6),
        vec2(-0.2, -0.25),
        vec2(-0.2, -0.6),
        //B BOTTOM ROW
        vec2(-0.3, -0.6),
        vec2(-0.7, -0.8),
        vec2(-0.7, -0.6),
        vec2(-0.7, -0.8),
        vec2(-0.3, -0.8),
        vec2(-0.3, -0.6),
    ];

    verticesN = [
        //N RIGHT COLUMN
        vec2(0.8, 0.8),
        vec2(0.7, 0.8),
        vec2(0.8, -0.8),
        vec2(0.8, -0.8),
        vec2(0.7, 0.8),
        vec2(0.7, -0.8),
        //N INCLINE
        vec2(0.7, -0.8),
        vec2(0.7, -0.5),
        vec2(0.3, 0.8),
        vec2(0.3, 0.8),
        vec2(0.7, -0.8),
        vec2(0.3, 0.5),
        //N LEFT COLUMN
        vec2(0.3, 0.8),
        vec2(0.2, 0.8),
        vec2(0.2, -0.8),
        vec2(0.2, -0.8),
        vec2(0.3, 0.8),
        vec2(0.3, -0.8)
    ]

    //======EVENT LISTENERS==================
    checkB = document.getElementById("checkB");
    checkN = document.getElementById("checkN");

    //=======================KEYS==========================
    window.addEventListener("keydown", function () {
        switch (event.keyCode) {
            case 65:  //KEY A
                if (checkB.checked && !checkN.checked) {
                    thetaB -= 0.1;
                } else if (!checkB.checked && checkN.checked) {
                    thetaN -= 0.1;
                } else if (checkB.checked && checkN.checked) {
                    thetaB -= 0.1;
                    thetaN -= 0.1;
                }
                break;
            case 68: //KEY D
                if (checkB.checked && !checkN.checked) {
                    thetaB += 0.1;
                } else if (!checkB.checked && checkN.checked) {
                    thetaN += 0.1;
                } else if (checkB.checked && checkN.checked) {
                    thetaB += 0.1;
                    thetaN += 0.1;
                }
                break;
            case 87: //KEY W
                if (checkB.checked && !checkN.checked) {
                    scaleB += 0.1;
                } else if (!checkB.checked && checkN.checked) {
                    scaleN += 0.1;
                } else if (checkB.checked && checkN.checked) {
                    scaleB += 0.1;
                    scaleN += 0.1;
                }
                break;
            case 83: //KEY S
                console.log(scaleB);
                if (checkB.checked && !checkN.checked && scaleB >= 0.1) {
                    scaleB -= 0.1;
                } else if (!checkB.checked && checkN.checked && scaleN >= 0.1) {
                    scaleN -= 0.1;
                } else if (checkB.checked && checkN.checked) {
                    if (scaleB >= 0.1) {
                        scaleB -= 0.1;
                    }
                    if(scaleN >= 0.1) {
                        scaleN -= 0.1;
                    }
                }
                break;

            case 38: //KEY UP
                if (checkB.checked && !checkN.checked) {
                    transYB += 0.07;
                } else if (!checkB.checked && checkN.checked) {
                    transYN += 0.07;
                } else if (checkB.checked && checkN.checked) {
                    transYB += 0.07;
                    transYN += 0.07;
                }
                break;
            case 40: //KEY DOWN
                if (checkB.checked && !checkN.checked) {
                    transYB -= 0.07;
                } else if (!checkB.checked && checkN.checked) {
                    transYN -= 0.07;
                } else if (checkB.checked && checkN.checked) {
                    transYB -= 0.07;
                    transYN -= 0.07;
                }
                break;
            case 37: //KEY LEFT
                if (checkB.checked && !checkN.checked) {
                    transXB -= 0.07;
                } else if (!checkB.checked && checkN.checked) {
                    transXN -= 0.07;
                } else if (checkB.checked && checkN.checked) {
                    transXB -= 0.07;
                    transXN -= 0.07;
                }
                break;
            case 39: //KEY RIGHT
                if (checkB.checked && !checkN.checked) {
                    transXB += 0.07;
                } else if (!checkB.checked && checkN.checked) {
                    transXN += 0.07;
                } else if (checkB.checked && checkN.checked) {
                    transXB += 0.07;
                    transXN += 0.07;
                }
                break;
        }
    });

    //=====================COLORS==================================
    document.getElementById("redSlider").oninput = function () {
        var val = document.getElementById("redSlider").value;
        redVal = val;
        document.getElementById("redOut").innerHTML = val;
    };

    document.getElementById("greenSlider").oninput = function () {
        var val = document.getElementById("greenSlider").value;
        greenVal = val;
        document.getElementById("greenOut").innerHTML = val;
    };

    document.getElementById("blueSlider").oninput = function () {
        var val = document.getElementById("blueSlider").value;
        blueVal = val;
        document.getElementById("blueOut").innerHTML = val;
    };

    //================================================================

    bufferB = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferB);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesB), gl.STATIC_DRAW);

    bufferN = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferN);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesN), gl.STATIC_DRAW);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    window.requestAnimationFrame(render);
};



function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    //==============SET COLORS=================
    colors = [redVal / 255, greenVal / 255, blueVal / 255, 1.0];
    var colorLocB = gl.getUniformLocation(program, "fColor");
    gl.uniform4fv(colorLocB, colors);

    //=======CALCULATE MATRIX======

    //==========MATRIX B=============
    var matrixB = translation(0.5, 0);
    matrixB = multi(matrixB, rotate(thetaB));
    matrixB = multi(matrixB, scale(scaleB));
    matrixB = multi(matrixB, translation(-0.5, 0));
    matrixB = multi(matrixB, translation(transXB, transYB));

    //==========MATRIX N=============
    var matrixN = translation(-0.5, 0);
    matrixN = multi(matrixN, rotate(thetaN));
    matrixN = multi(matrixN, scale(scaleN));
    matrixN = multi(matrixN, translation(0.5, 0));
    matrixN = multi(matrixN, translation(transXN, transYN));

    //=============B=================
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferB);

    var vAttB = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vAttB, 2, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(vAttB);

    var matrixLocB = gl.getUniformLocation(program, "transMatrix");
    gl.uniformMatrix4fv(matrixLocB, false, matrixB);
    gl.drawArrays(gl.TRIANGLES, 0, verticesB.length);

    //================N================

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferN);
    var vAttN = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vAttN, 2, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(vAttN);

    var matrixLocN = gl.getUniformLocation(program, "transMatrix");
    gl.uniformMatrix4fv(matrixLocN, false, matrixN);
    gl.drawArrays(gl.TRIANGLES, 0, verticesN.length);

    window.requestAnimationFrame(render);
}

function translation(tX, tY) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tX, tY, 0, 1
    ];
}

function rotate(theta) {
    var cos = Math.cos(theta);
    var sin = Math.sin(theta);
    return [
        cos, -sin, 0, 0,
        sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

function scale(s) {
    return [
        s, 0, 0, 0,
        0, s, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

function multi(a, b) {
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];
    var a30 = a[12];
    var a31 = a[13];
    var a32 = a[14];
    var a33 = a[15];
    var b00 = b[0];
    var b01 = b[1];
    var b02 = b[2];
    var b03 = b[3];
    var b10 = b[4];
    var b11 = b[5];
    var b12 = b[6];
    var b13 = b[7];
    var b20 = b[8];
    var b21 = b[9];
    var b22 = b[10];
    var b23 = b[11];
    var b30 = b[12];
    var b31 = b[13];
    var b32 = b[14];
    var b33 = b[15];

    return [
        a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
        a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
        a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
        a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
        a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
        a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
        a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
        a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
        a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
        a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
        a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
        a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
        a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
        a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
        a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
        a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
    ];
}
