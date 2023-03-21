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

    const numCubes = 1000;
    let cubes = [];

    // const geoImage = new THREE.PlaneGeometry(4, 2.25, 10, 10);
    // const texImage = new THREE.TextureLoader().load('/bleach.jpg');
    // const matImage = new THREE.MeshBasicMaterial({
    //     map: texImage,
    //     transparent: true,
    // });
    // const meshImage = new THREE.Mesh(geoImage, matImage);
    // scene.add(meshImage);
    // meshImage.position.set(5, 1.5, 5);
    // meshImage.rotation.set(0, -Math.PI / 8, 0);

    // const geoImage = new THREE.PlaneGeometry(4, 2.25, 16, 16);
    // const matImage = new THREE.ShaderMaterial({
    //     vertexShader: `
    //         // varying vec2 vUv;
    //         // uniform float uTime;

    //         // void main() {
    //         //     vUv = uv;

    //         //     vec3 pos = position;
    //         //     float noiseFreq = 3.5;
    //         //     float noiseAmp = 0.15;
    //         //     vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    //         //     pos.z += snoise3(noisePos) * noiseAmp;

    //         //     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    //         // }

    //         #define PI 3.1415926
    //         #define PI2 PI*2.
    //         uniform float time;
    //         void main(){

    //           vec3 pos = position;
    //           pos.z = sin((length(uv - 0.5) - time) * 6. * PI2);

    //           gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    //     `,
    //     fragmentShader: `
    //         varying vec2 vUv;
    //         uniform sampler2D uTexture;

    //         void main() {
    //             vec3 texture = texture2D(uTexture, vUv).rgb;
    //             gl_FragColor = vec4(texture, 1.);
    //         }
    //     `,
    //     uniforms: {
    //         uTime: { value: 0.0 },
    //         uTexture: { value: new THREE.TextureLoader().load('/about4.jpg') },
    //     },
    // });
    // const texImage = new THREE.TextureLoader().load('/about4.jpg');
    // const matImage = new THREE.MeshBasicMaterial({
    //     map: texImage,
    //     transparent: true,
    // });
    // const meshImage = new THREE.Mesh(geoImage, matImage);
    // scene.add(meshImage);
    // meshImage.position.set(5, 1.5, 5);
    // meshImage.rotation.set(0, -Math.PI / 8, 0);

    for (let i = 0; i < numCubes; i++) {
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const edges = new THREE.EdgesGeometry(geo, 1);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true })
        );
        scene.add(line);
        const posY = getRandomArbitrary(2, 7);
        const posZ = getRandomArbitrary(-15, 15);
        line.position.set(i - numCubes / 2, posY, posZ);
        line.rotation.set(
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2)
        );
        cubes.push(line);
        const sphere = new THREE.SphereGeometry(1, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
        });
        const sphereMesh = new THREE.Mesh(sphere, sphereMat);
        scene.add(sphereMesh);
        sphereMesh.position.set(i - numCubes / 2, posY, posZ);
        sphereMesh.rotation.set(
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2)
        );
        const sphereScale = getRandomArbitrary(0.01, 0.15);
        sphereMesh.scale.set(sphereScale, sphereScale, sphereScale);
    }

    const geoText = new THREE.PlaneGeometry(8, 2, 10, 10);
    const textureText = new THREE.TextureLoader().load('/title-text.svg');
    const matText = new THREE.MeshBasicMaterial({
        map: textureText,
        transparent: true,
    });
    const meshText = new THREE.Mesh(geoText, matText);
    meshText.position.x = -(visibleWidthAtZDepth(0, camera) / 5) + 2.75;
    meshText.position.y = 1;
    meshText.name = 'text';
    scene.add(meshText);

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

    // Image planes
    let meshImages = [];
    const geoImage = new THREE.PlaneGeometry(3, 3, 50, 50);
    const matImage1 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/about4.jpg'),
        transparent: true,
    });
    const meshImage1 = new THREE.Mesh(geoImage, matImage1);
    scene.add(meshImage1);
    meshImage1.position.set(5, 1.5, 5);
    meshImage1.rotation.set(0, -Math.PI / 8, 0);
    meshImages.push(meshImage1);

    const matImage2 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/about3.jpeg'),
        transparent: true,
    });
    const meshImage2 = new THREE.Mesh(geoImage, matImage2);
    scene.add(meshImage2);
    meshImage2.position.set(-5, 1.5, 5);
    meshImage2.rotation.set(0, Math.PI / 8, 0);
    meshImages.push(meshImage2);

    const matImage3 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/about2.jpeg'),
        transparent: true,
    });
    const meshImage3 = new THREE.Mesh(geoImage, matImage3);
    scene.add(meshImage3);
    meshImage3.position.set(-2, 4.5, 5);
    meshImage3.rotation.set(0, 0, 0);
    meshImages.push(meshImage3);

    const matImage4 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/about1.jpeg'),
        transparent: true,
    });
    const meshImage4 = new THREE.Mesh(geoImage, matImage4);
    scene.add(meshImage4);
    meshImage4.position.set(2, 4.5, 5);
    meshImage4.rotation.set(0, 0, 0);
    meshImages.push(meshImage4);

    const matImage5 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/about5.jpeg'),
        transparent: true,
    });
    const meshImage5 = new THREE.Mesh(geoImage, matImage5);
    scene.add(meshImage5);
    meshImage5.position.set(3, 2.5, 10);
    meshImage5.rotation.set(0, -Math.PI / 8, 0);
    meshImages.push(meshImage5);

    const matImage6 = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('/adidas-1.jpeg'),
        transparent: true,
    });
    const meshImage6 = new THREE.Mesh(geoImage, matImage6);
    scene.add(meshImage6);
    meshImage6.position.set(-3, 2.5, 10);
    meshImage6.rotation.set(0, Math.PI / 8, 0);
    meshImages.push(meshImage6);

    // const matImage7 = new THREE.MeshBasicMaterial({
    //     map: new THREE.TextureLoader().load('/about2.jpeg'),
    //     transparent: true,
    // });
    // const meshImage7 = new THREE.Mesh(geoImage, matImage7);
    // scene.add(meshImage7);
    // meshImage7.position.set(-2, 1.5, 10);
    // meshImage7.rotation.set(0, 0, 0);
    // meshImages.push(meshImage7);

    // const matImage8 = new THREE.MeshBasicMaterial({
    //     map: new THREE.TextureLoader().load('/about1.jpeg'),
    //     transparent: true,
    // });
    // const meshImage8 = new THREE.Mesh(geoImage, matImage8);
    // scene.add(meshImage8);
    // meshImage8.position.set(2, 1.5, 10);
    // meshImage8.rotation.set(0, 0, 0);
    // meshImages.push(meshImage8);

    // Rendering
    const clock = new THREE.Clock();
    const render = () => {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime() * 10;

        if (meshImages.length > 0) {
            meshImages.forEach((meshImage) => {
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

        // let hovering = null;

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

        // plane.rotation.x += ((scrollTargetPos / 1000) * Math.PI) / 400;

        // if (text1 && plane) {
        //     text1.material.opacity = remap(
        //         camera.position.distanceTo(text1.position),
        //         12,
        //         7
        //     );

        //     plane.material.opacity =
        //         1 -
        //         remap(camera.position.distanceTo(text1.position), 12, 7) +
        //         0.2;
        // }

        if (meshText && plane && cubes) {
            meshText.material.opacity = remap(
                camera.position.distanceTo(meshText.position),
                12,
                7
            );

            // meshImage.material.opacity =
            //     1 -
            //     remap(camera.position.distanceTo(meshImage.position), 12, 7) +
            //     0.2;

            meshImages.forEach((meshImage) => {
                meshImage.material.opacity =
                    remap(
                        camera.position.distanceTo(meshImage.position),
                        12,
                        7
                    ) + 0.2;
            });

            // cubes.forEach((cube) => {
            //     cube.material.opacity =
            //         1 -
            //         remap(
            //             camera.position.distanceTo(meshText.position),
            //             12,
            //             7
            //         ) +
            //         0.2;
            // });
        }

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
            {/* <Loading /> */}
        </div>
    );
};

export default Landing;
