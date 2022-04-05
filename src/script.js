import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Cursor
 */

const cursor = {
	x: 0,
	y: 0,
};
// Cursor coordination
window.addEventListener('mousemove', (e) => {
	cursor.x = e.clientX / sizes.width - 0.5; // the - 0.5 is so it goes from -0.5 to 0.5, so we have a from left to right
	cursor.y = -(e.clientY / sizes.height - 0.5);

	console.log(cursor.x);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Sizes
const sizes = {
	width: 800,
	height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls - Orbit
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// You aim slightly above the camera like so:
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	// mesh.rotation.y = elapsedTime;

	// Update camera
	// camera.position.x = cursor.x * 3;
	// camera.position.y = cursor.y * 3;

	// To rotate around the square
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
	// camera.lookAt(mesh.position); // it's the same as : camera.lookAt(new THREE.Vector3(0, 0, 0));

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
