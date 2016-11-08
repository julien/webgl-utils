
function createShader(gl, type, src) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, src);
	gl.compileShader(shader);

	const res = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (res) {
		return shader;
	}

	const err = gl.getShaderInfoLog(shader);
	gl.deleteShader(shader);
	throw new Error(err);
}

function createProgram(gl, vsrc, fsrc) {
	const vshader = createShader(gl, gl.VERTEX_SHADER, vsrc);
	const fshader = createShader(gl, gl.FRAGMENT_SHADER, fsrc);
	const program = gl.createProgram();
	gl.attachShader(program, vshader);
	gl.attachShader(program, fshader);
	gl.linkProgram(program);

	const res = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (res) {
		return program;
	}

	const err = gl.getProgramInfoLog(program);
	gl.deleteProgram(progam);
	throw new Error(err);
}

function getProgramInfo(gl, program) {
	let info = {};

	const attrs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < attrs; i++) {
		const attr = gl.getActiveAttrib(program, i);
		info[attr.name] = gl.getAttribLocation(program, attr.name);
	}

	const unis = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
	for (let i = 0; i < unis; i++) {
		const uni = gl.getActiveUniform(program, i);
		info[uni.name] = gl.getUniformLocation(program, uni.name);
	}

	return info;
}
