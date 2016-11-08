const test = require('tape');
const size = 64;
const gl = require('gl')(size, size, {preserveDrawingBuffer: true});
const utils = require('./bundle');

const vsrc = `
attribute vec3 a_position;
uniform float u_pointSize;

void main() {
	gl_PointSize = u_pointSize;
	gl_Position = vec4(a_position, 1.);
}
`;

const fsrc = `
precision mediump float;

void main() {
	gl_FragColor = vec4(.3, .3, .8, 1.);
}
`;

test('should create a program from shader sources', (t) => {
	const program = utils.createProgram(gl, vsrc, fsrc);
	t.ok(program !== null, "program should not be null");
	t.end();
});

test('should retrieve attribs and uniforms from a program', (t) => {
	const program = utils.createProgram(gl, vsrc, fsrc);
	t.ok(program !== null, "program should not be null");

	const programInfo = utils.getProgramInfo(gl, program);
	t.notOk(programInfo === null, "program info should not be null");
    t.ok(programInfo.a_position === 0, "a_position attribute should be present and have a value of 0");
	t.ok(programInfo.u_pointSize !== undefined, "u_pointSize uniform should not be undefined");
	t.end();
});

