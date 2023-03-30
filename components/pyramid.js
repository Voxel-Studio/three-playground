import { useEffect } from 'react';
import * as THREE from 'three';

const init = (containerId, shapeType) => {
    const webglEl = document.getElementById(containerId);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        webglEl.offsetWidth / webglEl.offsetHeight,
        1,
        1100
    );
    camera.position.set(0, 1, 5);
    camera.rotation.x = Math.PI / 32;

    // const geo = new THREE.PlaneGeometry(50, 50, 15, 15);
    // const mat = new THREE.MeshBasicMaterial({
    //     color: 0xffffff,
    //     side: THREE.DoubleSide,
    //     wireframe: true,
    //     transparent: true,
    // });
    // const plane = new THREE.Mesh(geo, mat);
    // plane.rotation.x = Math.PI / 2;
    // plane.rotation.z = Math.PI / 4;
    // scene.add(plane);

    let cubes = [];
    const addCube = (manualCubes) => {
        manualCubes.forEach((cube) => {
            // const geo = new THREE.BoxGeometry(1, 1, 1);
            // const geo = new THREE.ConeGeometry(1, 1.5, 3);
            let geo;
            if (shapeType === 'pyramid') {
                geo = new THREE.ConeGeometry(1, 1.5, 3);
            } else if (shapeType === 'cube') {
                geo = new THREE.BoxGeometry(1, 1, 1);
            } else {
                geo = new THREE.CylinderGeometry(0.75, 0.75, 1.5, 12);
            }
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
            const cubeScale = 2.5;
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
                // getRandomArbitrary(0, Math.PI * 2),
                // getRandomArbitrary(0, Math.PI * 2),
                // getRandomArbitrary(0, Math.PI * 2)
                0,
                0,
                0
            );
            const sphereScale = 0.1;
            sphereMesh.scale.set(sphereScale, sphereScale, sphereScale);
        });
    };

    addCube([
        {
            position: new THREE.Vector3(0, 2, 0),
        },
    ]);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#000000');
    renderer.setSize(webglEl.offsetWidth, webglEl.offsetHeight);
    webglEl.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Rendering
    const clock = new THREE.Clock();
    const render = () => {
        // const time = clock.getElapsedTime() * 10;

        // const position = plane.geometry.attributes.position;
        // for (let i = 0; i < position.count; i++) {
        //     const z = Math.sin(i / 5 + (time + i) / 7) / 4;
        //     position.setZ(i, z);
        // }
        // position.needsUpdate = true;

        cubes.forEach((cube) => {
            cube.rotateY(Math.PI / 1000);
        });

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();
};

const Pyramid = ({ setId, shapeType }) => {
    const containerId = setId;
    useEffect(() => {
        init(containerId, shapeType);
    }, []);
    return (
        <div id='container'>
            <div id='webglEl'></div>
        </div>
    );
};

export default Pyramid;
