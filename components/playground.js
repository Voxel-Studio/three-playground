import { useEffect } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import VirtualScroll from 'virtual-scroll';
import styles from '../styles/Playground.module.css';

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
    // camera.position.x = 0.1;
    camera.position.z = 5;

    // Geometry
    // const geo = new THREE.SphereGeometry(1, 10, 10);
    // const mat = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    // const mesh = new THREE.Mesh(geo, mat);
    // scene.add(mesh);

    // Points
    const totalPoints = 8;
    const theta = (Math.PI * 2) / totalPoints;
    const colors = [
        'white',
        'yellow',
        'hotpink',
        'lightblue',
        'red',
        'orange',
        'purple',
        'green',
    ];
    const radius = 6;
    // const radius = 3;
    const group = new THREE.Group();
    for (let i = 0; i < totalPoints; i++) {
        // const geo = new THREE.SphereGeometry(0.025, 10, 10);
        const geo = new THREE.PlaneGeometry(3, 2, 1, 1);
        const mat = new THREE.MeshBasicMaterial({
            color: colors[i],
        });
        const mesh = new THREE.Mesh(geo, mat);
        const angle = theta * i;
        console.log(angle);
        group.add(mesh);
        mesh.position.set(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
        );
    }
    scene.add(group);
    // group.position.x = 0;
    group.position.x = -visibleWidthAtZDepth(0, camera) / 2;
    // group.position.x = -radius * 2;

    // Scrolling
    let scrollPos = 0;
    let scrollTargetPos = 0;
    let scrollSpeed = 0;
    let scrollTargetSpeed = 0;
    const scroller = new VirtualScroll();
    console.log(scroller);
    scroller.on((event) => {
        scrollPos = event.y / 4000;
        scrollSpeed = (event.deltaY * theta) / 1000;
        // console.log(scrollPos);
        console.log(event.originalEvent);
        console.log(event.y);

        // always allow scroll, but if position less than half way, scroll back
        // if position more than halfway, scroll forwards
        // event.y = 5000;
    });

    scroller.off((event) => {
        console.log(event);
    });

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
    const render = () => {
        requestAnimationFrame(render);
        scrollSpeed *= 0.9;
        scrollTargetSpeed += (scrollSpeed - scrollTargetSpeed) * 0.1;
        scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
        group.rotation.y = scrollTargetSpeed * 4;
        group.position.z = -scrollTargetSpeed * 5;
        group.rotation.z = scrollTargetPos;

        // if (scrollSpeed < 0.01 && scrollSpeed > -0.01) {
        //     scrollPos = Math.ceil(scrollPos / theta) * theta;
        // } else {
        //     group.rotation.z = scrollTargetPos;
        //     // scrollPos = 0;
        // }

        // when scroll speed comes close to 0 (within a threshold), set group.rotation.z to one of the angles (theta * i)

        // for (let i = 0; i < group.children.length; i++) {
        //     group.children[i].position.z = -scrollTargetSpeed * 5;
        // }

        renderer.render(scene, camera);
    };
    render();
};

const Playground = () => {
    useEffect(() => {
        init();
    }, []);

    return (
        <div className='wrapper'>
            <div className={styles.container} id='container'>
                <div id='webglEl'></div>
            </div>
        </div>
    );
};

export default Playground;
