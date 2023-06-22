import { useEffect, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
// import { Reflector } from '../utils/Reflector';
// import { Reflector } from '../utils/ReflectorNew';
import MeshReflectorMaterial from '../utils/MeshReflectorMaterial';
import Header from './header';
import { gsap } from 'gsap';
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
        50,
        window.innerWidth / window.innerHeight,
        1,
        1100
    );
    const cameraStartPos = 9;
    camera.position.set(0, 1, cameraStartPos);
    camera.rotation.x = Math.PI / 32;

    // Lighting
    // const ambLight = new THREE.PointLight(0xffffff, 0.5);
    // scene.add(ambLight);

    // Add plane
    const geo = new THREE.PlaneGeometry(50, 50, 15, 15);
    const texturePlane = new THREE.TextureLoader().load(
        '/floor-tile-black.png'
    );
    texturePlane.wrapS = THREE.RepeatWrapping;
    texturePlane.wrapT = THREE.RepeatWrapping;
    texturePlane.repeat.set(20, 20);
    texturePlane.offset.set(0.49, 0.49);
    const matPlane = new THREE.MeshBasicMaterial({
        map: texturePlane,
        side: THREE.DoubleSide,
        opacity: 0.5,
        transparent: true,
    });
    const plane = new THREE.Mesh(geo, matPlane);
    plane.rotation.x = Math.PI / 2;
    plane.rotation.z = Math.PI;
    plane.material.opacity = 0.5;
    scene.add(plane);

    const planeTop = new THREE.Mesh(geo, matPlane);
    planeTop.rotation.x = Math.PI / 2;
    planeTop.rotation.z = Math.PI;
    planeTop.position.y = 7;
    scene.add(planeTop);

    // Add screen 3D models
    const addModels = (models) => {
        models.forEach((model) => {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(model.file, (gltfScene) => {
                gltfScene.scene.position.copy(model.position);
                gltfScene.scene.rotateOnWorldAxis(model.rotation);
                gltfScene.scene.setRotationFromEuler(model.rotation);
                gltfScene.scene.scale.copy(model.scale);
                gltfScene.scene.traverse(function (child) {
                    child.layers.enable(1);
                });
                scene.add(gltfScene.scene);
            });
        });
    };
    addModels([
        {
            file: '/screen.glb',
            position: new THREE.Vector3(-3.25, 0, 0.5),
            rotation: new THREE.Euler(0, Math.PI / 2, 0),
            scale: new THREE.Vector3(0.5, 0.75, 1),
        },
        // {
        //     file: '/shiba.glb',
        //     position: new THREE.Vector3(-3.25, 1, 3),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     scale: new THREE.Vector3(0.5, 0.5, 0.5),
        // },
    ]);

    // Image planes
    let meshImages = [];
    const addImagePlanes = (imagePlanes) => {
        imagePlanes.forEach((imagePlane) => {
            // const geoImage = new THREE.PlaneGeometry(3.2, 1.8, 1, 1);
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
            meshImage.name = 'image';
            meshImage.layers.enable(1);
            scene.add(meshImage);
            meshImages.push(meshImage);
        });
    };

    addImagePlanes([
        // Slab
        {
            map: new THREE.TextureLoader().load('/slab.png'),
            position: new THREE.Vector3(-1.5, 1.25, 0.5),
            rotation: new THREE.Euler(0, 0, 0),
            scale: {
                x: 11.13 / 1,
                y: 3.31 / 1,
            },
        },
        // Left dot grid
        {
            map: new THREE.TextureLoader().load('/grid.png'),
            position: new THREE.Vector3(-5, 1, 4),
            rotation: new THREE.Euler(0, Math.PI / 2, 0),
            scale: {
                x: 3.5 / 2,
                y: 3.9 / 2,
            },
        },
        // Top dot grid
        {
            map: new THREE.TextureLoader().load('/grid.png'),
            position: new THREE.Vector3(4, 3, 2),
            rotation: new THREE.Euler(Math.PI / 2, 0, 0),
            scale: {
                x: 3.5 / 2,
                y: 3.9 / 2,
            },
        },
        // First pole
        {
            map: new THREE.TextureLoader().load('/pole.png'),
            position: new THREE.Vector3(2.5, 1.85 / 2, 3),
            rotation: new THREE.Euler(0, 0, 0),
            scale: {
                x: 0.045 / 1,
                y: 1.85 / 1,
            },
        },
        // Yellow image
        {
            map: new THREE.TextureLoader().load('/pepsi1.jpeg'),
            position: new THREE.Vector3(-3, 1.75 / 2.05, 1),
            rotation: new THREE.Euler(0, 0, 0),
            scale: {
                x: 1,
                y: 1.75,
            },
        },
        // {
        //     map: new THREE.TextureLoader().load('/tiktok-1.jpeg'),
        //     position: new THREE.Vector3(-3.5, 0.75, 1),
        //     rotation: new THREE.Euler(0, 0, 0),
        //     scale: {
        //         x: 1.25,
        //         y: 2,
        //     },
        // },
        // {
        //     map: new THREE.TextureLoader().load('/about4.jpg'),
        //     position: new THREE.Vector3(-3, 0, 3.5),
        //     rotation: new THREE.Euler(0, Math.PI / 2, 0),
        //     scale: {
        //         x: 1.5,
        //         y: 4,
        //     },
        // },
    ]);

    // Add text
    const textScaling = 1.75;
    // const geoText = new THREE.PlaneGeometry(
    //     5.31 / textScaling,
    //     2.54 / textScaling,
    //     1,
    //     1
    // );
    // const textureText = new THREE.TextureLoader().load('/logo-text.svg');
    // const matText = new THREE.MeshBasicMaterial({
    //     map: textureText,
    //     transparent: true,
    // });
    // const meshText = new THREE.Mesh(geoText, matText);
    // // meshText.layers.set(0);
    // meshText.position.y = 1;
    // meshText.name = 'text';
    // scene.add(meshText);

    let cubes = [];
    let spheres = [];

    const addCube = (manualCubes) => {
        manualCubes.forEach((cube) => {
            const geo = new THREE.ConeGeometry(1, 1.5, 3);
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
            line.rotation.set(0, 0, 0);
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
            spheres.push(sphereMesh);
        });
    };

    // addCube([
    //     {
    //         position: new THREE.Vector3(5, 4, -1),
    //     },
    //     {
    //         position: new THREE.Vector3(-3, 2, 2),
    //     },
    //     {
    //         position: new THREE.Vector3(-2.5, 7, -4),
    //     },
    //     {
    //         position: new THREE.Vector3(-5.5, 3.5, 6),
    //     },
    //     {
    //         position: new THREE.Vector3(4.5, 4.75, 9),
    //     },
    //     {
    //         position: new THREE.Vector3(-4.5, 4.75, 14),
    //     },
    //     {
    //         position: new THREE.Vector3(2, 4.5, 21),
    //     },
    //     {
    //         position: new THREE.Vector3(-3, 1.5, 24),
    //     },
    //     {
    //         position: new THREE.Vector3(0, 4.5, 31),
    //     },
    // ]);

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
            position: new THREE.Vector3(0, 1, 0.6),
            scale: {
                // x: 5.31 / textScaling,
                // y: 2.54 / textScaling,
                x: 5.74 / textScaling,
                y: 3 / textScaling,
            },
            map: new THREE.TextureLoader().load('/logo-text-old.svg'),
        },
        {
            position: new THREE.Vector3(3, 2.25, 7),
            scale: {
                x: 5.6 / 2,
                y: 1.5 / 2,
            },
            map: new THREE.TextureLoader().load('/lorem-wide.svg'),
        },
        {
            position: new THREE.Vector3(-3, 1.75, 14),
            scale: {
                x: 5.6 / 2,
                y: 1.5 / 2,
            },
            map: new THREE.TextureLoader().load('/lorem-wide.svg'),
        },
        {
            position: new THREE.Vector3(0, 1.75, 40),
            scale: {
                x: 10 / 2,
                y: 2.44 / 2,
            },
            map: new THREE.TextureLoader().load('/insert-logo-full.png'),
        },
    ]);

    // Toggle reflection visibility
    scene.children.forEach((child) => {
        // child.layers.enable(1);
        if (child.name === 'text') child.layers.disable(1);
    });

    plane.layers.disable(1);
    planeTop.layers.disable(1);

    let scrollPos = 0;
    let scrollTargetPos = 0;
    let lastKnownScrollPosition = 0;
    let deltaY = 0;

    document.addEventListener('scroll', function (e) {
        let ticking = false;
        if (!ticking) {
            // event throtteling
            window.requestAnimationFrame(function () {
                deltaY = window.scrollY - lastKnownScrollPosition;
                lastKnownScrollPosition = window.scrollY;

                if (deltaY >= 0) {
                    if (window.scrollY < 19225) {
                        scrollPos += deltaY / 250;
                    }
                } else {
                    if (window.scrollY !== 0) {
                        scrollPos += deltaY / 250;
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    // Hovering hotspots
    const rayCaster = new THREE.Raycaster();
    const hoverDuration = 2;
    let hoveringImage = false;
    document.addEventListener('mousemove', function (e) {
        let mouse = new THREE.Vector2();
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        rayCaster.setFromCamera(mouse, camera);
        let intersects = rayCaster.intersectObjects(scene.children);

        hoveringImage = false;
        // if (intersects.length > 0) {
        //     intersects.forEach((intersect, i) => {
        //         const obj = intersect.object;
        //         const hoverScale = 1.2;
        //         if (intersect.object.name === 'image') {
        //             hoveringImage = true;
        //             gsap.to(obj.scale, {
        //                 duration: hoverDuration,
        //                 ease: 'circ.out',
        //                 x: hoverScale,
        //                 y: hoverScale,
        //             });
        //         }
        //     });
        // }
    });

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#000000');
    renderer.setSize(window.innerWidth, window.innerHeight);
    webglEl.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add reflections
    const geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
    // const geometry = new THREE.Mesh(new THREE.PlaneGeometry(50, 50, 1, 1));
    const groundMirror = new Reflector(geometry, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        // color: 0xb5b5b5,
        color: 0x505050,
    });
    // groundMirror.material.fragmentShader = {

    // };
    // geometry.position.y = -0.01;
    // geometry.position.y = 0.1;
    // geometry.rotateX(-Math.PI / 2);
    // scene.add(geometry);
    // geometry.material = new MeshReflectorMaterial(
    //     renderer,
    //     camera,
    //     scene,
    //     geometry,
    //     {
    //         resolution: 1024,
    //         blur: [512, 128],
    //         mixBlur: 2.5,
    //         mixContrast: 1.5,
    //         mirror: 1,
    //     }
    // );
    // geometry.material.setValues({
    //     roughnessMap: new THREE.TextureLoader().load('/roughness.jpg'),
    //     normalMap: new THREE.TextureLoader().load('/normal.png'),
    //     normalScale: new THREE.Vector2(0.3, 0.3),
    // });
    // console.log(geometry.material);
    groundMirror.position.y = -0.01;
    groundMirror.rotateX(-Math.PI / 2);
    scene.add(groundMirror);

    // Resize
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        groundMirror &&
            groundMirror
                .getRenderTarget()
                .setSize(
                    window.innerWidth * window.devicePixelRatio,
                    window.innerHeight * window.devicePixelRatio
                );
    };
    window.addEventListener('resize', onWindowResize, false);

    // Rendering
    const clock = new THREE.Clock();
    const render = () => {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime() * 10;

        scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
        camera.position.z = scrollTargetPos + cameraStartPos;

        cubes.forEach((cube) => {
            cube.rotateY(Math.PI / 1000);
        });

        // const position = plane.geometry.attributes.position;
        // for (let i = 0; i < position.count; i++) {
        //     const z = Math.sin(i / 5 + (time + i) / 7) / 4;
        //     position.setZ(i, z);
        // }
        // position.needsUpdate = true;

        // if (meshText) {
        //     meshText.material.opacity = remap(
        //         camera.position.distanceTo(meshText.position),
        //         12,
        //         7
        //     );
        // }

        // meshImages &&
        //     meshImages.forEach((meshImage) => {
        //         meshImage.material.opacity = remap(
        //             camera.position.distanceTo(meshImage.position),
        //             15,
        //             11
        //         );
        //     });

        // texts &&
        //     texts.forEach((text) => {
        //         text.material.opacity = remap(
        //             camera.position.distanceTo(text.position),
        //             15,
        //             11
        //         );
        //     });

        // scene.children.forEach((child) => {
        //     if (child.name === 'image' && !hoveringImage) {
        //         gsap.to(child.scale, {
        //             duration: hoverDuration,
        //             ease: 'circ.out',
        //             x: 1,
        //             y: 1,
        //         });
        //     }
        // });

        // Fade out planes and cubes
        if (scrollPos > 35 && scrollPos < 60) {
            // if (plane) {
            //     gsap.to(plane.material, {
            //         duration: 2,
            //         ease: 'circ.out',
            //         opacity: 0,
            //     });
            // }
            if (cubes.length > 0) {
                cubes.forEach((cube, i) => {
                    gsap.to(cube.material, {
                        duration: 0.1,
                        delay: i * 0.1,
                        ease: 'circ.out',
                        opacity: 0,
                    });
                });
            }
        } else {
            // if (plane) {
            //     gsap.to(plane.material, {
            //         duration: 4,
            //         ease: 'circ.out',
            //         opacity: 1,
            //     });
            // }
            if (cubes.length > 0) {
                cubes.forEach((cube, i) => {
                    gsap.to(cube.material, {
                        duration: 0.1,
                        delay: i * 0.1,
                        ease: 'circ.out',
                        opacity: 1,
                    });
                });
            }
        }

        // geometry.material && geometry.material.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();
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
