import { useEffect, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import VirtualScroll from 'virtual-scroll';
import styles from '../styles/Projects.module.css';
import { Plane } from 'three';
import { Loading } from './loading';
import { loadingTimeMs } from '../utils/helper';

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

const init = (setSelected) => {
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
    camera.position.z = 5;

    // Points
    const totalPoints = 8;
    const theta = (Math.PI * 2) / totalPoints;
    const textures = [
        `/reconnect.jpg`,
        `/bleach.jpg`,
        '/route-246.jpg',
        `/theatre.jpg`,
        `/black-eye-patch.jpg`,
        `/8.webp`,
        `/versus.jpg`,
        `/one-piece.jpg`,
    ].map((url) => new THREE.TextureLoader().load(url));
    const titles = [
        'RE:CONNECT',
        'BLEACH EX.PV',
        'Route 246',
        'THEATRE IN\nA DREAM',
        'H&M x\nBlackEyePatch',
        'SPACE SHOWER',
        'Versus Night 0.0',
        'ONE PIECE',
    ];
    const radius = 7;
    const group = new THREE.Group();
    const loader = new FontLoader();
    for (let i = 0; i < totalPoints; i++) {
        const geo = new THREE.PlaneGeometry(5, 2.8, 10, 10);
        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: textures[i] },
            },
            vertexShader: `
                varying vec2 vUv;
                void main(){
                  vUv = uv;
                  vec3 newPosition = position;
                  float distanceFromCenter = abs(
                      (modelMatrix * vec4(position, 1.0)).y
                  );
                   
                  // most important
                  newPosition.z *= 0.0 + 1.1*pow(distanceFromCenter,2.);
                    
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
                }`,
            fragmentShader: `
                  uniform sampler2D uTexture;
                  varying vec2 vUv;
                  void main()	{
                    gl_FragColor = texture2D(uTexture,vUv);
                  }
                 `,
        });
        const mesh = new THREE.Mesh(geo, mat);
        const angle = theta * i;
        // console.log(angle);
        mesh.name = 'plane';
        group.add(mesh);
        mesh.position.set(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
        );
        mesh.rotation.z = angle;
        loader.load('/sharp-grotesk.json', function (font) {
            const textGeometry = new TextGeometry(titles[i], {
                font: font,
                size: 0.4,
                height: 0.01,
                curveSegments: 8,
            });
            const textMaterial = new THREE.MeshBasicMaterial({
                color: 'white',
            });
            const text = new THREE.Mesh(textGeometry, textMaterial);
            text.name = 'text';
            group.add(text);
            text.position.set(
                radius * 1 * Math.cos(angle),
                radius * 1 * Math.sin(angle),
                2
            );
            text.rotation.z = angle;
            // console.log(text.position);
        });
    }
    scene.add(group);
    group.position.x = -(visibleWidthAtZDepth(0, camera) / 2) - 1;

    // Scrolling
    // let scrollPos = 0;
    let scrollPos = 1.87 * 2;
    setTimeout(() => {
        scrollPos = 0;
    }, loadingTimeMs);
    let scrollTargetPos = 0;
    let scrollSpeed = 0;
    let scrollTargetSpeed = 0;
    const scroller = new VirtualScroll();
    scroller.on((event) => {
        scrollPos = -event.y / 6000;
        scrollSpeed = (event.deltaY * theta) / 2000;

        // always allow scroll, but if position less than half way, scroll back
        // if position more than halfway, scroll forwards
        // event.y = 5000;
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

    // Parallax mouse movement
    let oldX = window.innerWidth / 2;
    let oldY = window / innerHeight / 2;
    let deltaX = 0;
    let deltaY = 0;
    let targetDeltaX = 0;
    let targetDeltaY = 0;
    let xPos = 0;
    let yPos = 0;
    let xTargetPos = 0;
    let yTargetPos = 0;
    const onMouseMove = (e) => {
        deltaX = Math.abs(e.clientX) < 10 && e.clientX - oldX;
        deltaY = Math.abs(e.clientY) < 10 && e.clientY - oldY;
        // deltaY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
        // console.log(e.clientY);
        // console.log(deltaX, deltaY);
        xPos = e.clientX;
        yPos = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Rendering
    const render = () => {
        requestAnimationFrame(render);
        scrollSpeed *= 0.9;
        scrollTargetSpeed += (scrollSpeed - scrollTargetSpeed) * 0.1;
        scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
        // group.rotation.y = -Math.abs(scrollTargetSpeed) * 0.5;
        // group.position.z = scrollTargetSpeed * 5;
        group.rotation.z = scrollTargetPos * 1.25;
        // group.scale.set(
        //     Math.max(1, Math.abs(scrollTargetSpeed * 2)),
        //     Math.max(1, Math.abs(scrollTargetSpeed * 2)),
        //     1
        // );

        // if (scrollSpeed < 0.01 && scrollSpeed > -0.01) {
        //     scrollPos = Math.ceil(scrollPos / theta) * theta;
        // } else {
        //     group.rotation.z = scrollTargetPos;
        //     // scrollPos = 0;
        // }

        // when scroll speed comes close to 0 (within a threshold), set group.rotation.z to one of the angles (theta * i)

        // movement toward mouse
        deltaX *= 0.9;
        deltaY *= 0.9;
        targetDeltaX += (deltaX - targetDeltaX) * 0.05;
        targetDeltaY += (deltaY - targetDeltaY) * 0.05;

        scene.traverse(function (child) {
            if (child.name === 'plane') {
                child.translateX(targetDeltaX / 3000);
                child.translateY(-targetDeltaY / 3000);
            }
            if (child.name === 'text') {
                child.translateX(targetDeltaX / 1000);
                child.translateY(-targetDeltaY / 1000);
            }
        });

        // xPos *= 0.9;
        // yPos *= 0.9;
        xTargetPos += (xPos - xTargetPos) * 0.05;
        yTargetPos += (yPos - yTargetPos) * 0.05;
        // group.rotation.y = xTargetPos / 7000 - 0.14;
        group.rotation.y = xTargetPos / 9000;
        group.rotation.x = yTargetPos / 5000;

        // clamp the max rotations with if statements
        // group.rotateY(targetDeltaX / 3000);
        // group.rotateX(targetDeltaY / 5000);
        // if (group.rotation.x > -0.1 && group.rotation.x < 0.1) {
        //     group.rotateX((targetDeltaY / 1000).toFixed(1));
        //     console.log(group.rotation.x);
        // }

        let rot;
        if (group.rotation.z >= 0) {
            rot = group.rotation.z % (Math.PI * 2);
        } else {
            rot = Math.PI * 2 + (group.rotation.z % (Math.PI * 2));
        }

        // refactor this later to be generic to work with any number of project cards
        let selected = 0;
        if (rot > theta * 7 + theta * 0.5 || rot <= theta * 0.5) {
            setSelected(0);
            selected = 0;
        } else if (rot > theta * 0.5 && rot <= theta + theta * 0.5) {
            setSelected(1);
            selected = 1;
        } else if (
            rot > theta + theta * 0.5 &&
            rot <= theta * 2 + theta * 0.5
        ) {
            setSelected(2);
            selected = 2;
        } else if (
            rot > theta * 2 + theta * 0.5 &&
            rot <= theta * 3 + theta * 0.5
        ) {
            setSelected(3);
            selected = 3;
        } else if (
            rot > theta * 3 + theta * 0.5 &&
            rot <= theta * 4 + theta * 0.5
        ) {
            setSelected(4);
            selected = 4;
        } else if (
            rot > theta * 4 + theta * 0.5 &&
            rot <= theta * 5 + theta * 0.5
        ) {
            setSelected(5);
            selected = 5;
        } else if (
            rot > theta * 5 + theta * 0.5 &&
            rot <= theta * 6 + theta * 0.5
        ) {
            setSelected(6);
            selected = 6;
        } else if (
            rot > theta * 6 + theta * 0.5 &&
            rot <= theta * 7 + theta * 0.5
        ) {
            setSelected(7);
            selected = 7;
        }
        // console.log(selected);

        // for (let i = 0; i < group.children.length; i++) {
        //     group.children[i].translateX(0);
        //     group.children[selected].translateX(-1);
        // }

        for (let i = 0; i < group.children.length; i++) {
            group.children[i].rotation.x = scrollTargetSpeed * 2;
            // group.children[i].scale.set(1, 1, 1);

            // if (i === selected) {
            //     // group.children[i - 1].scale.set(1.2, 1.2, 1.2);
            //     group.children[i + 1].scale.set(1.2, 1.2, 1.2);
            //     group.children[i].scale.set(1.5, 1.5, 1.5);
            // }
        }

        // Radial progress indicator
        const progressCircle = document.querySelector('.progress-circle');
        if (progressCircle)
            progressCircle.style.transform = `rotate(${
                rot * (180 / Math.PI)
            }deg)`;

        renderer.render(scene, camera);
    };
    render();
};

const Projects = ({ getSelected }) => {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        init(setSelected);
    }, []);

    useEffect(() => {
        getSelected(selected);
    }, [selected]);

    return (
        <div className='wrapper'>
            <div className={styles.container} id='container'>
                <div id='webglEl'></div>
            </div>
            <img className='circle' src='/circle.svg' alt='' />
            <img className='progress-circle' src='/circle-chunk.svg' alt='' />
            <Loading />
        </div>
    );
};

export default Projects;
