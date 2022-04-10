import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LoadingManager } from 'three';

/**
 * Textures
 */
// in order to use the image, you have to change use at as a texture
// const image = new Image();
// image.src = './textures/door/color.jpg';
// const texture = new THREE.Texture(image);

// image.addEventListener('load', () => {
// 	texture.needsUpdate = true;
// })

// LoadingManager -> can be used to mutualize the events. It's useful if we want to know the global loading progress or to be informed when everything is loaded.
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
// 	console.log('onStart');
// };

// loadingManager.onLoad = () => {
// 	console.log('onLoad');
// };

// loadingManager.onProgress = () => {
// 	console.log('onProgress');
// };

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(
	// './textures/door/color.jpg',
	'./textures/minecraft.png',
	() => {
		// console.log('load');
	},
	() => {
		// console.log('progress');
	},
	() => {
		// console.log('error');
	}
);
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// // The point of rotation is to the bottom left
// colorTexture.rotation = Math.PI * 0.25;
// // The point of rotation is in the center
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// minFilter : How the texture is sampled when a texel covers less than one pixel. The default is THREE.LinearMipmapLinearFilter, which uses mipmapping and a trilinear filter. *** When using NearestFilter on minFilter, you don't need the minmaps. You can deactivate the mipmaps generation with generateMipmaps = false
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
// magFilter : How the texture is sampled when a texel covers more than one pixel. The default is THREE.LinearFilter, which takes the four closest texels and bilinearly interpolates among them. The other option is THREE.NearestFilter, which uses the value of the closest texel and is better result, better framerate and better for performance.
colorTexture.magFilter = THREE.NearestFilter;

const alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const heightTexture = textureLoader.load('./textures/door/height.jpg');
const normalTexture = textureLoader.load('./textures/door/normal.jpg');
const ambientOcclusionTexture = textureLoader.load(
	'./textures/door/ambientOcclusion.jpg'
);
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg');
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg');

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener('resize', () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
