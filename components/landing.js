import { useEffect, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
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
    // Element variables
    const container = document.getElementById('container');
    const webglEl = document.getElementById('webglEl');

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1100
    );
    camera.position.set(0, 1, 5);

    // const cube1 = new THREE.BoxGeometry(1, 1);
    // const mat1 = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    //     side: THREE.DoubleSide,
    //     wireframe: true,
    // });
    // const cubeMesh1 = new THREE.Mesh(cube1, mat1);
    // cubeMesh1.position.set(0, 4, -5);
    // scene.add(cubeMesh1);

    const geo = new THREE.PlaneGeometry(50, 50, 50, 50);
    const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        wireframe: true,
    });
    const plane = new THREE.Mesh(geo, mat);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    // const wireframe = new THREE.WireframeGeometry(plane);
    // const line = new THREE.LineSegments(wireframe);
    // line.material.depthTest = false;
    // line.material.opacity = 0.25;
    // line.material.transparent = true;
    // line.rotation.x = Math.PI / 2;
    // scene.add(line);

    // var geo2 = new THREE.EdgesGeometry(plane); // or WireframeGeometry( geometry )
    // var mat2 = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    // var wireframe = new THREE.LineSegments(geo2, mat2);
    // scene.add(wireframe);

    // const geometry2 = new THREE.BoxGeometry(1, 1, 1);
    // const edges2 = new THREE.EdgesGeometry(geometry2, 1);
    // const line2 = new THREE.LineSegments(
    //     edges2,
    //     new THREE.LineBasicMaterial({ color: 0xffffff })
    // );
    // scene.add(line2);
    // line2.position.set(0, 4, -5);

    const numCubes = 30;
    let cubes = [];

    // make it so the cubes don't overlap
    for (let i = 0; i < numCubes; i++) {
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const edges = new THREE.EdgesGeometry(geo, 1);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0xffffff })
        );
        scene.add(line);
        const posY = getRandomArbitrary(2, 7);
        const posZ = getRandomArbitrary(-15, 15);
        line.position.set(
            // getRandomArbitrary(-15, 15),
            i - numCubes / 2,
            // i - 2,
            // getRandomArbitrary(2, 7),
            posY,
            // i - 15
            // getRandomArbitrary(-15, 15)
            posZ
        );
        line.rotation.set(
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2)
        );
        // const cubeScale = getRandomArbitrary(0.75, 1.15);
        // line.scale.set(cubeScale, cubeScale, cubeScale);
        cubes.push(line);
        const sphere = new THREE.SphereGeometry(1, 16, 16);
        const sphereMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        const sphereMesh = new THREE.Mesh(sphere, sphereMat);
        scene.add(sphereMesh);
        sphereMesh.position.set(
            // getRandomArbitrary(-15, 15),
            i - numCubes / 2,
            // i - 2,
            // getRandomArbitrary(2, 7),
            posY,
            // i - 15
            // getRandomArbitrary(-15, 15)
            posZ
        );
        sphereMesh.rotation.set(
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2),
            getRandomArbitrary(0, Math.PI * 2)
        );
        const sphereScale = getRandomArbitrary(0.01, 0.15);
        sphereMesh.scale.set(sphereScale, sphereScale, sphereScale);
    }

    // only makes a normal wireframe with triangles
    // const geometry3 = new THREE.PlaneGeometry(1, 1, 5, 5);
    // const edges3 = new THREE.EdgesGeometry(geometry3, 0);
    // const line3 = new THREE.LineSegments(
    //     edges3,
    //     new THREE.LineBasicMaterial({ color: 0xffffff })
    // );
    // scene.add(line3);
    // line3.position.set(0, 4, -5);
    // line3.rotation.x = Math.PI / 2;

    const loader = new FontLoader();
    let text;
    loader.load('/sharp-grotesk.json', function (font) {
        const textGeometry = new TextGeometry('INSERT PRODUCTIONS', {
            font: font,
            size: 0.4,
            height: 0.01,
            curveSegments: 8,
        });
        const textMaterial = new THREE.MeshBasicMaterial({
            color: 'white',
            transparent: true,
        });
        text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.x = -(visibleWidthAtZDepth(0, camera) / 5) - 1;
        text.position.y = 1.15;
        // text.rotation.x = Math.PI;
        // text.rotation.z = Math.PI / 2;
        text.name = 'text';
        scene.add(text);
    });
    // }

    // Scrolling
    // let scrollPos = 0;
    // let scrollTargetPos = 0;
    // let scrollSpeed = 0;
    // let scrollTargetSpeed = 0;
    // const scroller = new VirtualScroll();
    // scroller.on((event) => {
    //     scrollPos = -event.y / 6000;
    //     scrollSpeed = (event.deltaY * theta) / 2000;
    // });

    // need to also bind the touch event so it works on mobiles
    // scrolling by dragging the scroll bar also doesn't work
    let scrollPos = 0;
    let scrollTargetPos = 0;
    document.addEventListener(
        'wheel',
        function (e) {
            // if (camera.position.z >= 5) {
            // a
            // if (scrollPos > 0) {
            scrollPos += e.deltaY / 500;
            // }
            // console.log(camera.position.z);
            // console.log(scrollPos);
            // }
            return false;
        },
        true
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#000000');
    renderer.setSize(window.innerWidth, window.innerHeight);
    webglEl.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Resize
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);

    // Rendering
    const clock = new THREE.Clock();
    const render = () => {
        // if (camera.position.z >= 5) {
        scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
        camera.position.z = scrollTargetPos + 5;
        // }

        cubes.forEach((cube) => {
            cube.rotateY(Math.PI / 1000);
        });

        const delta = clock.getDelta();
        const time = clock.getElapsedTime() * 10;

        const position = plane.geometry.attributes.position;
        // console.log(position.array);
        for (let i = 0; i < position.count; i++) {
            // if (i === 0) {
            //     const distance = camera.position.distanceTo(position.array[i]);
            //     console.log(distance);
            // }
            const z = Math.sin(i / 5 + (time + i) / 7) / 4;
            position.setZ(i, z);
        }
        position.needsUpdate = true;

        if (text) {
            text.material.opacity = remap(
                camera.position.distanceTo(text.position),
                12,
                7
            );
        }

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
            <Loading />
        </div>
    );
};

export default Landing;
