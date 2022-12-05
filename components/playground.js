import { useEffect } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import VirtualScroll from 'virtual-scroll';
import styles from '../styles/Playground.module.css';

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
    const radius = 2;
    // const radius = 3;
    const group = new THREE.Group();
    for (let i = 0; i < totalPoints; i++) {
        const geo = new THREE.SphereGeometry(0.025, 10, 10);
        const mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mesh = new THREE.Mesh(geo, mat);
        const theta = (Math.PI * 2) / totalPoints;
        const angle = theta * i;
        group.add(mesh);
        mesh.position.set(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
        );
    }
    scene.add(group);
    group.position.x = 0;
    // group.position.x = -radius * 2;

    // Scrolling
    let scrollPos = 0;
    let scrollTargetPos = 0;
    let scrollSpeed = 0;
    let scrollTargetSpeed = 0;
    const scroller = new VirtualScroll();
    scroller.on((event) => {
        scrollPos = event.y / 4000;
        scrollSpeed = event.deltaY / 2000;
        // console.log(event);
    });

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor('#e5e5e5');
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
        group.rotation.z = scrollTargetPos;
        group.rotation.y = scrollTargetSpeed * 4;
        group.position.z = -scrollTargetSpeed * 5;

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
