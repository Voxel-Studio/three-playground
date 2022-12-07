import { useEffect, useState } from 'react';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
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
    let textures = [
        `/1.webp`,
        `/2.webp`,
        `/3.webp`,
        `/4.webp`,
        `/5.webp`,
        `/6.webp`,
        `/7.webp`,
        `/8.webp`,
    ].map((url) => new THREE.TextureLoader().load(url));
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
        console.log(angle);
        group.add(mesh);
        mesh.position.set(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
        );
        mesh.rotation.z = angle;
        loader.load('/maxilla-bold.json', function (font) {
            const textGeometry = new TextGeometry('BLEACH EX.PV', {
                font: font,
                size: 0.5,
                height: 0.01,
                curveSegments: 8,
            });
            const textMaterial = new THREE.MeshBasicMaterial({
                color: 'white',
            });
            const text = new THREE.Mesh(textGeometry, textMaterial);
            group.add(text);
            text.position.set(
                radius * Math.cos(angle),
                radius * Math.sin(angle),
                2
            );
            // text.translateX(-1);
            text.rotation.z = angle;
        });
    }
    scene.add(group);
    group.position.x = -(visibleWidthAtZDepth(0, camera) / 2) + 0.5;

    // Scrolling
    let scrollPos = 0;
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
    let oldX = 0;
    let oldY = 0;
    const onMouseMove = (e) => {
        let deltaX = e.x - oldX;
        let deltaY = e.y - oldY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Rendering
    const render = () => {
        requestAnimationFrame(render);
        scrollSpeed *= 0.9;
        scrollTargetSpeed += (scrollSpeed - scrollTargetSpeed) * 0.1;
        scrollTargetPos += (scrollPos - scrollTargetPos) * 0.1;
        group.rotation.y = -Math.abs(scrollTargetSpeed) * 0.5;
        group.position.z = scrollTargetSpeed * 5;
        group.rotation.z = scrollTargetPos * 1.25;
        group.scale.set(
            Math.max(1, Math.abs(scrollTargetSpeed * 2)),
            Math.max(1, Math.abs(scrollTargetSpeed * 2)),
            1
        );

        // if (scrollSpeed < 0.01 && scrollSpeed > -0.01) {
        //     scrollPos = Math.ceil(scrollPos / theta) * theta;
        // } else {
        //     group.rotation.z = scrollTargetPos;
        //     // scrollPos = 0;
        // }

        // when scroll speed comes close to 0 (within a threshold), set group.rotation.z to one of the angles (theta * i)

        for (let i = 0; i < group.children.length; i++) {
            group.children[i].rotation.x = scrollTargetSpeed;
        }

        let rot;
        if (group.rotation.z >= 0) {
            rot = group.rotation.z % (Math.PI * 2);
        } else {
            rot = Math.PI * 2 + (group.rotation.z % (Math.PI * 2));
        }

        // refactor this later to be generic to work with any number of project cards
        if (rot > theta * 7 + theta * 0.5 || rot <= theta * 0.5) {
            setSelected(0);
        } else if (rot > theta * 0.5 && rot <= theta + theta * 0.5) {
            setSelected(1);
        } else if (
            rot > theta + theta * 0.5 &&
            rot <= theta * 2 + theta * 0.5
        ) {
            setSelected(2);
        } else if (
            rot > theta * 2 + theta * 0.5 &&
            rot <= theta * 3 + theta * 0.5
        ) {
            setSelected(3);
        } else if (
            rot > theta * 3 + theta * 0.5 &&
            rot <= theta * 4 + theta * 0.5
        ) {
            setSelected(4);
        } else if (
            rot > theta * 4 + theta * 0.5 &&
            rot <= theta * 5 + theta * 0.5
        ) {
            setSelected(5);
        } else if (
            rot > theta * 5 + theta * 0.5 &&
            rot <= theta * 6 + theta * 0.5
        ) {
            setSelected(6);
        } else if (
            rot > theta * 6 + theta * 0.5 &&
            rot <= theta * 7 + theta * 0.5
        ) {
            setSelected(7);
        }

        // Radial progress indicator
        const progressCircle = document.querySelector('.progress-circle');
        progressCircle.style.transform = `rotate(${rot * (180 / Math.PI)}deg)`;

        renderer.render(scene, camera);
    };
    render();
};

const Playground = ({ getSelected }) => {
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
        </div>
    );
};

export default Playground;
