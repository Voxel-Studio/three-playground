import { useEffect, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import Header from './header';
import VirtualScroll from 'virtual-scroll';
import styles from '../styles/Landing.module.css';
import { Plane } from 'three';
import { Loading } from './loading';
import { loadingTimeMs } from '../utils/helper';

const remap = (value, sourceMin, sourceMax, destMin = 0, destMax = 1) =>
    destMin +
    ((value - sourceMin) / (sourceMax - sourceMin)) * (destMax - destMin);

const visibleHeightAtZDepth = (depth, camera) => {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    // vertical fov in radians
    const vFOV = (camera.fov * Math.PI) / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

const visibleWidthAtZDepth = (depth, camera) => {
    const height = visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
};

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};

const init = () => {
    // const container = document.getElementById('container');
    // const webglEl = document.getElementById('webglEl');

    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //     75,
    //     window.innerWidth / window.innerHeight,
    //     1,
    //     1100
    // );
    // camera.position.set(0, 1, 5);

    // const geo = new THREE.PlaneGeometry(50, 50, 50, 50);
    // const mat = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    //     side: THREE.DoubleSide,
    //     wireframe: true,
    // });
    // const plane = new THREE.Mesh(geo, mat);
    // plane.rotation.x = Math.PI / 2;
    // scene.add(plane);

    // const numCubes = 30;
    // let cubes = [];

    // for (let i = 0; i < numCubes; i++) {
    //     const geo = new THREE.BoxGeometry(1, 1, 1);
    //     const edges = new THREE.EdgesGeometry(geo, 1);
    //     const line = new THREE.LineSegments(
    //         edges,
    //         new THREE.LineBasicMaterial({ color: 0xffffff })
    //     );
    //     scene.add(line);
    //     const posY = getRandomArbitrary(2, 7);
    //     const posZ = getRandomArbitrary(-15, 15);
    //     line.position.set(
    //         i - numCubes / 2,
    //         posY,
    //         posZ
    //     );
    //     line.rotation.set(
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2)
    //     );
    //     cubes.push(line);
    //     const sphere = new THREE.SphereGeometry(1, 16, 16);
    //     const sphereMat = new THREE.MeshBasicMaterial({
    //         color: 0xffffff,
    //     });
    //     const sphereMesh = new THREE.Mesh(sphere, sphereMat);
    //     scene.add(sphereMesh);
    //     sphereMesh.position.set(
    //         i - numCubes / 2,
    //         posY,
    //         posZ
    //     );
    //     sphereMesh.rotation.set(
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2)
    //     );
    //     const sphereScale = getRandomArbitrary(0.01, 0.15);
    //     sphereMesh.scale.set(sphereScale, sphereScale, sphereScale);
    // }

    // const loader = new FontLoader();
    // let text;
    // loader.load('/sharp-grotesk.json', function (font) {
    //     const textGeometry = new TextGeometry('INSERT PRODUCTIONS', {
    //         font: font,
    //         size: 0.4,
    //         height: 0.01,
    //         curveSegments: 8,
    //     });
    //     const textMaterial = new THREE.MeshBasicMaterial({
    //         color: 'white',
    //         transparent: true,
    //     });
    //     text = new THREE.Mesh(textGeometry, textMaterial);
    //     text.position.x = -(visibleWidthAtZDepth(0, camera) / 5) - 1;
    //     text.position.y = 1.15;
    //     text.name = 'text';
    //     scene.add(text);
    // });

    // let scrollPos = 0;
    // let scrollTargetPos = 0;
    // document.addEventListener(
    //     'wheel',
    //     function (e) {
    //         scrollPos += e.deltaY / 250;
    //         return false;
    //     },
    //     true
    // );

    // // Renderer
    // const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setClearColor('#000000');
    // renderer.setSize(window.innerWidth, window.innerHeight - 120);
    // webglEl.appendChild(renderer.domElement);
    // renderer.setPixelRatio(window.devicePixelRatio);

    // // Resize
    // const onWindowResize = () => {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(window.innerWidth, window.innerHeight - 120);
    // };
    // window.addEventListener('resize', onWindowResize, false);

    // // Rendering
    // const clock = new THREE.Clock();
    // const render = () => {
    //     scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
    //     camera.position.z = scrollTargetPos + 5;

    //     cubes.forEach((cube) => {
    //         cube.rotateY(Math.PI / 1000);
    //     });

    //     const delta = clock.getDelta();
    //     const time = clock.getElapsedTime() * 10;

    //     const position = plane.geometry.attributes.position;
    //     for (let i = 0; i < position.count; i++) {
    //         const z = Math.sin(i / 5 + (time + i) / 7) / 4;
    //         position.setZ(i, z);
    //     }
    //     position.needsUpdate = true;

    //     if (text) {
    //         text.material.opacity = remap(
    //             camera.position.distanceTo(text.position),
    //             12,
    //             7
    //         );
    //     }

    //     requestAnimationFrame(render);
    //     renderer.render(scene, camera);
    // };
    // render();

    const SEPARATION = 100,
        AMOUNTX = 100,
        AMOUNTY = 100;

    // let container, stats;
    // let container;
    let container = document.getElementById('container');
    let webglEl = document.getElementById('webglEl');
    let camera, scene, renderer;

    let particles,
        count = 0;

    // let mouseX = -100,
    //     mouseY = -275;

    let mouseX = 0,
        mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {
        // container = document.createElement('div');
        // document.body.appendChild(container);

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        //

        const numParticles = AMOUNTX * AMOUNTY;

        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);

        let i = 0,
            j = 0;

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
                positions[i + 1] = 0; // y
                positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

                scales[j] = 1;

                i += 3;
                j++;
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xffffff) },
                scaleFactor: { value: 100.0 },
            },
            vertexShader: `
                uniform float scaleFactor;
                varying vec2 vUv;
                attribute float scale;
                void main() {
                    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                    gl_PointSize = scale * ( scaleFactor / - mvPosition.z );
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
			    uniform vec3 color;
			    void main() {
				    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
				    gl_FragColor = vec4( color, 1.0 );
			    }
            `,
        });

        //

        particles = new THREE.Points(geometry, material);
        console.log(particles);
        scene.add(particles);

        //

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight - 120);
        container.appendChild(renderer.domElement);

        // stats = new Stats();
        // container.appendChild(stats.dom);

        container.style.touchAction = 'none';
        container.addEventListener('pointermove', onPointerMove);

        //

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight - 120);
    }

    //

    function onPointerMove(event) {
        if (event.isPrimary === false) return;

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        console.log(mouseX, mouseY);
    }

    //

    function animate() {
        requestAnimationFrame(animate);

        render();
        // stats.update();
    }

    function render() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        const positions = particles.geometry.attributes.position.array;
        const scales = particles.geometry.attributes.scale.array;

        let i = 0,
            j = 0;

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions[i + 1] =
                    Math.sin((ix + count) * 0.3) * 50 +
                    Math.sin((iy + count) * 0.5) * 50;

                scales[j] =
                    (Math.sin((ix + count) * 0.3) + 1) * 20 +
                    (Math.sin((iy + count) * 0.5) + 1) * 20;

                i += 3;
                j++;
            }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;

        renderer.render(scene, camera);

        count += 0.1;
    }
};

const Landing = () => {
    useEffect(() => {
        init();
    }, []);
    return (
        <div className='wrapper'>
            <div className={styles.container} id='container'>
                <div id='webglEl'></div>
            </div>
            {/* <Header isHomepage={true} />
            <Loading /> */}
        </div>
    );
};

export default Landing;
