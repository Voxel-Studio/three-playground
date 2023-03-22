import { useEffect, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import Header from './header';
import VirtualScroll from 'virtual-scroll';
import styles from '../styles/Landing.module.css';
import glsl from 'glslify';
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
    const container = document.getElementById('container');
    const webglEl = document.getElementById('webglEl');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100
    );
    camera.position.set(0, 1, 5);
    camera.rotation.x = Math.PI / 32;

    const geo = new THREE.PlaneGeometry(50, 50, 15, 15);
    const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
    });
    const plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = Math.PI / 2;
    // plane.rotation.x = Math.PI / 2 - Math.PI / 8;
    plane.rotation.z = Math.PI / 4;
    scene.add(plane);

    const geoText = new THREE.PlaneGeometry(5.74 / 1.5, 3 / 1.5, 1, 1);
    const textureText = new THREE.TextureLoader().load('/logo-text.svg');
    const matText = new THREE.MeshBasicMaterial({
        map: textureText,
        transparent: true,
    });
    const meshText = new THREE.Mesh(geoText, matText);
    meshText.position.x = -(visibleWidthAtZDepth(0, camera) / 5) + 3;
    meshText.position.y = 2.25;
    meshText.name = 'text';
    scene.add(meshText);

    const numCubes = 100;
    let cubes = [];

    // for (let i = 0; i < numCubes; i++) {
    //     const geo = new THREE.BoxGeometry(1, 1, 1);
    //     const edges = new THREE.EdgesGeometry(geo, 1);
    //     const line = new THREE.LineSegments(
    //         edges,
    //         new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true })
    //     );
    //     scene.add(line);
    //     const posY = getRandomArbitrary(2, 7);
    //     const posZ = getRandomArbitrary(-15, 15);
    //     line.position.set(i - numCubes / 2, posY, posZ);
    //     line.rotation.set(
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2)
    //     );
    //     // const cubeScale = getRandomArbitrary(0.25, 0.75);
    //     // line.scale.set(cubeScale, cubeScale, cubeScale);
    //     cubes.push(line);
    //     const sphere = new THREE.SphereGeometry(1, 16, 16);
    //     const sphereMat = new THREE.MeshBasicMaterial({
    //         color: 0xffffff,
    //         transparent: true,
    //     });
    //     const sphereMesh = new THREE.Mesh(sphere, sphereMat);
    //     scene.add(sphereMesh);
    //     sphereMesh.position.set(i - numCubes / 2, posY, posZ);
    //     sphereMesh.rotation.set(
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2),
    //         getRandomArbitrary(0, Math.PI * 2)
    //     );
    //     const sphereScale = getRandomArbitrary(0.01, 0.15);
    //     sphereMesh.scale.set(sphereScale, sphereScale, sphereScale);
    // }

    // let cubes = [];
    const addCube = (manualCubes) => {
        manualCubes.forEach((cube) => {
            const geo = new THREE.BoxGeometry(1, 1, 1);
            const edges = new THREE.EdgesGeometry(geo, 1);
            const line = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({
                    color: 0xffffff,
                    transparent: true,
                })
            );
            scene.add(line);
            line.position.copy(cube.position);
            cubes.push(line);
            const cubeScale = getRandomArbitrary(0.85, 1.15);
            line.scale.set(cubeScale, cubeScale, cubeScale);
            line.rotation.set(
                // getRandomArbitrary(0, Math.PI * 2),
                0,
                // getRandomArbitrary(0, Math.PI * 2),
                0,
                // getRandomArbitrary(0, Math.PI * 2)
                0
            );
            const sphere = new THREE.SphereGeometry(1, 16, 16);
            const sphereMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
            });
            const sphereMesh = new THREE.Mesh(sphere, sphereMat);
            scene.add(sphereMesh);
            sphereMesh.position.copy(cube.position);
            sphereMesh.rotation.set(
                getRandomArbitrary(0, Math.PI * 2),
                getRandomArbitrary(0, Math.PI * 2),
                getRandomArbitrary(0, Math.PI * 2)
            );
            const sphereScale = getRandomArbitrary(0.05, 0.15);
            sphereMesh.scale.set(sphereScale, sphereScale, sphereScale);
        });
    };

    addCube([
        {
            position: new THREE.Vector3(5, 4, -1),
        },
        {
            position: new THREE.Vector3(-3, 2, 2),
        },
        {
            position: new THREE.Vector3(1, 3, 3),
        },
        {
            position: new THREE.Vector3(-5.5, 3.5, 6),
        },
        {
            position: new THREE.Vector3(4.5, 4.75, 9),
        },
        {
            position: new THREE.Vector3(-4.5, 4.75, 14),
        },
        {
            position: new THREE.Vector3(2, 4.5, 21),
        },
        {
            position: new THREE.Vector3(-3, 1.5, 24),
        },
    ]);

    // Image planes
    let meshImages = [];
    const addImagePlanes = (imagePlanes) => {
        imagePlanes.forEach((imagePlane) => {
            const geoImage = new THREE.PlaneGeometry(
                imagePlane.scale.x,
                imagePlane.scale.y,
                1,
                1
            );
            const matImage = new THREE.MeshBasicMaterial({
                map: imagePlane.map,
                transparent: true,
            });
            const meshImage = new THREE.Mesh(geoImage, matImage);
            meshImage.position.copy(imagePlane.position);
            meshImage.rotateOnWorldAxis(imagePlane.rotation);
            meshImage.setRotationFromEuler(imagePlane.rotation);
            scene.add(meshImage);
            meshImages.push(meshImage);
        });
    };

    addImagePlanes([
        {
            map: new THREE.TextureLoader().load('/about4.jpg'),
            position: new THREE.Vector3(5, 3, -2),
            rotation: new THREE.Euler(0, -Math.PI / 32, 0),
            scale: {
                x: 2.5,
                y: 2.5,
            },
        },
        {
            map: new THREE.TextureLoader().load('/about2.jpeg'),
            position: new THREE.Vector3(-7, 2.5, -3),
            rotation: new THREE.Euler(0, -Math.PI / 16, 0),
            scale: {
                x: 2.5,
                y: 2.5,
            },
        },
        {
            map: new THREE.TextureLoader().load('/about3.jpeg'),
            position: new THREE.Vector3(-5, 2.5, 5),
            rotation: new THREE.Euler(0, Math.PI / 16, 0),
            scale: {
                x: 2,
                y: 3,
            },
        },
        {
            map: new THREE.TextureLoader().load('/about2.jpeg'),
            position: new THREE.Vector3(-2, 4, 10),
            rotation: new THREE.Euler(0, Math.PI / 16, 0),
            scale: {
                x: 3,
                y: 3,
            },
        },
        {
            map: new THREE.TextureLoader().load('/about1.jpeg'),
            position: new THREE.Vector3(5, 2.5, 9),
            rotation: new THREE.Euler(0, -Math.PI / 16, 0),
            scale: {
                x: 2,
                y: 2,
            },
        },
        {
            map: new THREE.TextureLoader().load('/news2.jpg'),
            position: new THREE.Vector3(3, 2.5, 15),
            rotation: new THREE.Euler(0, -Math.PI / 16, 0),
            scale: {
                x: 2.5,
                y: 3,
            },
        },
        {
            map: new THREE.TextureLoader().load('/adidas-1.jpeg'),
            position: new THREE.Vector3(0, 5, 18),
            rotation: new THREE.Euler(0, 0, 0),
            scale: {
                x: 4,
                y: 3,
            },
        },
        {
            map: new THREE.TextureLoader().load('/adidas-2.jpeg'),
            position: new THREE.Vector3(-5, 2, 18),
            rotation: new THREE.Euler(0, 0, 0),
            scale: {
                x: 4,
                y: 3,
            },
        },
        {
            map: new THREE.TextureLoader().load('/news1.jpg'),
            position: new THREE.Vector3(5, 2, 18),
            rotation: new THREE.Euler(0, 0, 0),
            scale: {
                x: 4,
                y: 3,
            },
        },
    ]);

    // Text
    let texts = [];
    const addText = (manualTexts) => {
        manualTexts.forEach((text) => {
            const geo = new THREE.PlaneGeometry(
                text.scale.x,
                text.scale.y,
                1,
                1
            );
            const mat = new THREE.MeshBasicMaterial({
                map: text.map,
                transparent: true,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(text.position);
            mesh.name = 'text';
            scene.add(mesh);
            texts.push(mesh);
        });
    };

    addText([
        {
            position: new THREE.Vector3(3, 2.25, 7),
            scale: {
                x: 2.79 / 1.5,
                y: 3 / 1.5,
            },
            map: new THREE.TextureLoader().load('/lorem-1.svg'),
        },
        {
            position: new THREE.Vector3(-3, 1.75, 14),
            scale: {
                x: 2.79 / 1.5,
                y: 3 / 1.5,
            },
            map: new THREE.TextureLoader().load('/lorem-1.svg'),
        },
    ]);

    // meshImage.position.set(3, 1.5, 5);
    // meshImage.rotation.set(0, -Math.PI / 8, 0);

    // const loader = new FontLoader();
    // const fontSize = 0.5;
    // let text1;
    // loader.load('/lexend-deca.json', function (font) {
    //     // const textGeometry = new TextGeometry('INSERT PRODUCTIONS', {
    //     const textGeometry = new TextGeometry(
    //         // 'CREATIVE. TECHNICAL. PRODUCTION.',
    //         'CREATIVE. TECHNICAL.',
    //         {
    //             font: font,
    //             size: fontSize,
    //             height: 0.01,
    //             curveSegments: 12,
    //         }
    //     );
    //     const textMaterial = new THREE.MeshBasicMaterial({
    //         color: 'white',
    //         transparent: true,
    //     });
    //     text1 = new THREE.Mesh(textGeometry, textMaterial);
    //     text1.position.x = -(visibleWidthAtZDepth(0, camera) / 5) - 1.5;
    //     text1.position.y = 1.5;
    //     text1.name = 'text';
    //     scene.add(text1);
    // });

    // let text2;
    // loader.load('/lexend-deca.json', function (font) {
    //     const textGeometry = new TextGeometry('PRODUCTION', {
    //         font: font,
    //         size: fontSize,
    //         height: 0.01,
    //         curveSegments: 12,
    //     });
    //     const textMaterial = new THREE.MeshBasicMaterial({
    //         color: 'white',
    //         transparent: true,
    //     });
    //     text2 = new THREE.Mesh(textGeometry, textMaterial);
    //     text2.position.x = -(visibleWidthAtZDepth(0, camera) / 5) - 1.5;
    //     text2.position.y = 0.75;
    //     text2.name = 'text';
    //     // scene.add(text2);
    // });

    let scrollPos = 0;
    let scrollTargetPos = 0;
    document.addEventListener(
        'wheel',
        function (e) {
            // scrollPos += e.deltaY / 250;
            scrollPos += e.deltaY / 750;
            return false;
        },
        true
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#000000');
    // renderer.setSize(window.innerWidth, window.innerHeight - 120);
    renderer.setSize(window.innerWidth, window.innerHeight);
    webglEl.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Resize
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight - 120);
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);

    // Rendering
    const clock = new THREE.Clock();
    const render = () => {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime() * 10;

        if (meshText) {
            const position = meshText.geometry.attributes.position;
            for (let i = 0; i < position.count; i++) {
                const z = Math.sin(i / 10 + (time + i) / 7) / 8;
                position.setZ(i, z);
            }
            position.needsUpdate = true;
        }

        if (meshImages.length > 0) {
            meshImages.forEach((meshImage, idx) => {
                const position = meshImage.geometry.attributes.position;
                for (let i = 0; i < position.count; i++) {
                    const z = Math.sin(i / 10 + (time + i) / 7) / 8;
                    position.setZ(i, z);

                    // const currentX = position.getY(i);
                    // const waveX1 = 0.05 * Math.sin(currentX * 2 + time);
                    // const waveX2 = 0.025 * Math.sin(currentX * 3 + time);
                    // position.setZ(i, waveX1 + waveX2);
                }
                position.needsUpdate = true;
            });
        }

        if (texts.length > 0) {
            texts.forEach((text, idx) => {
                const position = text.geometry.attributes.position;
                for (let i = 0; i < position.count; i++) {
                    const z = Math.sin(i / 10 + (time + i) / 7) / 8;
                    position.setZ(i, z);
                }
                position.needsUpdate = true;
            });
        }

        // if (cubes.length > 0) {
        //     cubes.forEach((cube) => {
        //         const position = cube.geometry.attributes.position;
        //         for (let i = 0; i < position.count; i++) {
        //             // const z = Math.sin(i / 10 + (time + i) / 7) / 8;
        //             // position.setZ(i, z);

        //             const currentX = position.getY(i);
        //             const waveX1 = 0.05 * Math.sin(currentX * 2 + time);
        //             const waveX2 = 0.025 * Math.sin(currentX * 3 + time);
        //             position.setY(i, waveX1 + waveX2);
        //         }
        //         position.needsUpdate = true;
        //     });
        // }

        scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
        camera.position.z = scrollTargetPos + 5;

        cubes.forEach((cube) => {
            cube.rotateY(Math.PI / 1000);
        });

        const position = plane.geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
            const z = Math.sin(i / 5 + (time + i) / 7) / 4;
            position.setZ(i, z);
        }
        position.needsUpdate = true;

        // plane.rotation.x += (scrollTargetPos / 1000) * Math.PI;

        if (meshText) {
            meshText.material.opacity = remap(
                camera.position.distanceTo(meshText.position),
                12,
                7
            );
        }

        meshImages &&
            meshImages.forEach((meshImage) => {
                meshImage.material.opacity = remap(
                    camera.position.distanceTo(meshImage.position),
                    15,
                    11
                );
            });

        texts &&
            texts.forEach((text) => {
                text.material.opacity = remap(
                    camera.position.distanceTo(text.position),
                    15,
                    11
                );
            });

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();

    //NEW

    // const SEPARATION = 100,
    //     AMOUNTX = 100,
    //     AMOUNTY = 100;

    // // let container, stats;
    // // let container;
    // let container = document.getElementById('container');
    // let webglEl = document.getElementById('webglEl');
    // let camera, scene, renderer;

    // let particles,
    //     count = 0;

    // // let mouseX = -100,
    // //     mouseY = -275;

    // let mouseX = 0,
    //     mouseY = 0;

    // let windowHalfX = window.innerWidth / 2;
    // let windowHalfY = window.innerHeight / 2;

    // init();
    // animate();

    // function init() {
    //     // container = document.createElement('div');
    //     // document.body.appendChild(container);

    //     camera = new THREE.PerspectiveCamera(
    //         75,
    //         window.innerWidth / window.innerHeight,
    //         1,
    //         10000
    //     );
    //     camera.position.z = 1000;

    //     scene = new THREE.Scene();

    //     //

    //     const numParticles = AMOUNTX * AMOUNTY;

    //     const positions = new Float32Array(numParticles * 3);
    //     const scales = new Float32Array(numParticles);

    //     let i = 0,
    //         j = 0;

    //     for (let ix = 0; ix < AMOUNTX; ix++) {
    //         for (let iy = 0; iy < AMOUNTY; iy++) {
    //             positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
    //             positions[i + 1] = 0; // y
    //             positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z

    //             scales[j] = 1;

    //             i += 3;
    //             j++;
    //         }
    //     }

    //     const geometry = new THREE.BufferGeometry();
    //     geometry.setAttribute(
    //         'position',
    //         new THREE.BufferAttribute(positions, 3)
    //     );
    //     geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    //     const material = new THREE.ShaderMaterial({
    //         uniforms: {
    //             color: { value: new THREE.Color(0xffffff) },
    //             scaleFactor: { value: 100.0 },
    //         },
    //         vertexShader: `
    //             uniform float scaleFactor;
    //             varying vec2 vUv;
    //             attribute float scale;
    //             void main() {
    //                 vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    //                 gl_PointSize = scale * ( scaleFactor / - mvPosition.z );
    //                 gl_Position = projectionMatrix * mvPosition;
    //             }
    //         `,
    //         fragmentShader: `
    // 		    uniform vec3 color;
    // 		    void main() {
    // 			    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    // 			    gl_FragColor = vec4( color, 1.0 );
    // 		    }
    //         `,
    //     });

    //     //

    //     particles = new THREE.Points(geometry, material);
    //     console.log(particles);
    //     scene.add(particles);

    //     //

    //     renderer = new THREE.WebGLRenderer({ antialias: true });
    //     renderer.setPixelRatio(window.devicePixelRatio);
    //     renderer.setSize(window.innerWidth, window.innerHeight - 120);
    //     container.appendChild(renderer.domElement);

    //     // stats = new Stats();
    //     // container.appendChild(stats.dom);

    //     container.style.touchAction = 'none';
    //     container.addEventListener('pointermove', onPointerMove);

    //     //

    //     window.addEventListener('resize', onWindowResize);
    // }

    // function onWindowResize() {
    //     windowHalfX = window.innerWidth / 2;
    //     windowHalfY = window.innerHeight / 2;

    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();

    //     renderer.setSize(window.innerWidth, window.innerHeight - 120);
    // }

    // //

    // function onPointerMove(event) {
    //     if (event.isPrimary === false) return;

    //     mouseX = event.clientX - windowHalfX;
    //     mouseY = event.clientY - windowHalfY;
    //     console.log(mouseX, mouseY);
    // }

    // //

    // function animate() {
    //     requestAnimationFrame(animate);

    //     render();
    //     // stats.update();
    // }

    // function render() {
    //     camera.position.x += (mouseX - camera.position.x) * 0.05;
    //     camera.position.y += (-mouseY - camera.position.y) * 0.05;
    //     camera.lookAt(scene.position);

    //     const positions = particles.geometry.attributes.position.array;
    //     const scales = particles.geometry.attributes.scale.array;

    //     let i = 0,
    //         j = 0;

    //     for (let ix = 0; ix < AMOUNTX; ix++) {
    //         for (let iy = 0; iy < AMOUNTY; iy++) {
    //             positions[i + 1] =
    //                 Math.sin((ix + count) * 0.3) * 50 +
    //                 Math.sin((iy + count) * 0.5) * 50;

    //             scales[j] =
    //                 (Math.sin((ix + count) * 0.3) + 1) * 20 +
    //                 (Math.sin((iy + count) * 0.5) + 1) * 20;

    //             i += 3;
    //             j++;
    //         }
    //     }

    //     particles.geometry.attributes.position.needsUpdate = true;
    //     particles.geometry.attributes.scale.needsUpdate = true;

    //     renderer.render(scene, camera);

    //     count += 0.1;
    // }
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
            <Header isHomepage={true} />
            <Loading />
        </div>
    );
};

export default Landing;
