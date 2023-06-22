import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import {
    useCursor,
    MeshReflectorMaterial,
    useTexture,
    Image,
    Text,
    Environment,
} from '@react-three/drei';
import * as THREE from 'three';
import { easing } from 'maath';
import Header from './header';
import { Loading } from './loading';
import styles from '../styles/Landing.module.css';

const GOLDEN_RATIO = 1.61803398875;
const CAMERA_START = 8;

const Landing = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    useEffect(() => {
        // setWindowWidth(window.innerWidth);
        // setWindowHeight(window.innerHeight);

        const onWindowResize = () => {
            // setWindowWidth(window.innerWidth);
            // setWindowHeight(window.innerHeight);
            // camera.aspect = window.innerWidth / window.innerHeight;
            // camera.updateProjectionMatrix();
            // gl.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);
    }, []);
    return (
        <div className='wrapper'>
            <div className={styles.container} id='canvas-container'>
                <Canvas
                    // dpr={[1, 1.5]}
                    camera={{
                        fov: 48,
                        position: [0, 1, CAMERA_START],
                        rotation: [0, 0, 0],
                        // aspect: windowWidth / windowHeight,
                        resize: { resize: 1 },
                    }}
                    updateDefaultCamera={true}
                >
                    <Scene />
                </Canvas>
            </div>
            <Header isHomepage={true} />
            <Loading />
        </div>
    );
};

function Scene({ p = new THREE.Vector3() }) {
    const slab = useRef();
    const { camera, gl, scene } = useThree();
    const logoScale = 1.25;
    const scrollPos = useRef(0);
    // const floor = useTexture('/floor-tile-black.png');
    const floor = useTexture('/floor2.png');
    floor.repeat.set(22, 22);
    floor.offset.set(0.5, 0.5);
    floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
    const ceiling = useTexture('/ceiling2.png');
    ceiling.repeat.set(11, 11);
    ceiling.offset.set(0.5, 0.5);
    ceiling.wrapS = ceiling.wrapT = THREE.RepeatWrapping;
    useEffect(() => {
        let lastKnownScrollPosition = 0;
        let deltaY = 0;

        document.addEventListener('scroll', function (e) {
            let ticking = false;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    deltaY = window.scrollY - lastKnownScrollPosition;
                    lastKnownScrollPosition = window.scrollY;

                    if (deltaY >= 0) {
                        if (window.scrollY < 19225) {
                            scrollPos.current += deltaY / 250;
                            // scrollPos.current += deltaY / 500;
                        }
                    } else {
                        if (window.scrollY !== 0) {
                            scrollPos.current += deltaY / 250;
                            // scrollPos.current += deltaY / 250;
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            gl.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);

        slab.current.material.depthWrite = false;

        // Resize
        // const onWindowResize = () => {
        //     camera.aspect = window.innerWidth / window.innerHeight;
        //     camera.updateProjectionMatrix();
        //     renderer.setSize(window.innerWidth, window.innerHeight);
        // };
        // window.addEventListener('resize', onWindowResize, false);
    }, []);

    useFrame((state, dt) => {
        p.set(0, 1, scrollPos.current + CAMERA_START);
        easing.damp3(state.camera.position, p, 0.4, dt);

        let cameraTargetRotation = new THREE.Vector3(0, 0, 0);

        if (state.camera.position.z > 0 && state.camera.position.z < 10) {
            cameraTargetRotation.y = 0;
        } else if (
            state.camera.position.z >= 10 &&
            state.camera.position.z < 15
        ) {
            cameraTargetRotation.y =
                (Math.PI / 4) * ((state.camera.position.z - 10) / (15 - 10));
        } else if (
            state.camera.position.z >= 15 &&
            state.camera.position.z < 20
        ) {
            cameraTargetRotation.y =
                (Math.PI / 4) *
                (1 - (state.camera.position.z - 15) / (20 - 15));
        } else if (
            state.camera.position.z >= 20 &&
            state.camera.position.z < 29
        ) {
            cameraTargetRotation.y =
                ((-Math.PI / 4) * (state.camera.position.z - 20)) / (29 - 20);
        } else if (
            state.camera.position.z >= 29 &&
            state.camera.position.z < 40
        ) {
            cameraTargetRotation.y =
                (-Math.PI / 4) *
                (1 - (state.camera.position.z - 29) / (40 - 29));
        } else {
            cameraTargetRotation.y = 0;
        }

        easing.damp3(state.camera.rotation, cameraTargetRotation, 0.2, dt);

        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (child.name !== 'noFade') {
                    // child.material.transparent = true;
                    // child.material.color.set(0x555555);
                    // child.material.combine = THREE.MultiplyOperation;
                    // child.material.opacity = 1;
                    // child.material.opacity =
                    //     1 * (1 - (state.camera.position.z - 45) / (55 - 45));
                }
            }
        });
    });

    return (
        <group>
            <ambientLight intensity={1} />
            {/* Ceiling */}
            <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
                <planeGeometry args={[50, 70]} />
                <meshStandardMaterial map={ceiling} />
            </mesh>
            {/* Floor */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 70]} />
                <meshStandardMaterial map={floor} opacity='0.5' transparent />
            </mesh>
            {/* Block text reflection */}
            {/* <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.2, 100]} />
                <meshStandardMaterial color={'black'} />
            </mesh> */}
            {/* Reflections */}
            <mesh
                position={[0, -0.01, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                name='noFade'
            >
                <planeGeometry args={[50, 70]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={2048}
                    mixBlur={1}
                    mixStrength={75}
                    roughness={1}
                    depthScale={1.6}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.6}
                    color='#111111'
                    metalness={0.1}
                />
            </mesh>
            {/* Back wall */}
            <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
                <planeGeometry args={[55, 10]} />
                <meshStandardMaterial color={'#181818'} />
            </mesh>
            {/* Main logo */}
            <Image
                // url='/logo-text-old.svg'
                url='/creative.svg'
                position={[0, 1, 4.5]}
                scale={[5.26 / 4, 2.51 / 4, 1]}
                transparent
            />
            {/* Slab */}
            <Image
                url='/slab.svg'
                position={[-1.25, 1.48, 0.1]}
                scale={[6.549 * 1.25, 1.7 * 1.25, 1]}
                transparent
                ref={slab}
            />
            {/* Left dots */}
            <Image
                url='/grid.png'
                position={[-4, 1, 4]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[1.972 / 2, 2.86 / 2, 1]}
                transparent
            />
            {/* Top dots */}
            <Image
                url='/grid.png'
                position={[3.5, 2.5, 2]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1.972 / 2, 2.86 / 2, 1]}
                transparent
            />
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[2.5, 0.92, 2]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* Yellow one */}
            <Frame
                p={[-3, 0, 1]}
                r={[0, 0, 0]}
                s={[0.9, GOLDEN_RATIO, 0.075]}
                url='/pepsi1.jpeg'
            />
            {/* Pink one */}
            <Frame
                p={[-2, 0, 5]}
                r={[0, Math.PI / 2, 0]}
                s={[0.9, GOLDEN_RATIO, 0.075]}
                url='/about1.jpeg'
            />
            <Frame
                p={[2, 0, 5]}
                r={[0, -Math.PI / 2 + Math.PI / 8, 0]}
                s={[0.9, GOLDEN_RATIO, 0.075]}
                url='/about3.jpeg'
            />
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[-5, 0.92, 5.5]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* Left tall dots */}
            <Image
                url='/grid-tall.png'
                position={[-3.5, 1.1, 6.5]}
                rotation={[0, 0, 0]}
                scale={[1.972 / 2, 4.34 / 2, 1]}
                transparent
            />
            {/* Purple one */}
            <Frame
                p={[-3.75, 0, 9.5]}
                r={[0, Math.PI / 2, 0]}
                s={[2.5, GOLDEN_RATIO, 0.075]}
                url='/tiktok-1.jpeg'
            />
            {/* Transforming spaces */}
            <Image
                url='/transforming.svg'
                position={[-3.75, 1, 12]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[6.19 / 4, 2.7 / 4, 1]}
                transparent
            />
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[-3.75, 0.92, 13]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* Second purple one */}
            <Frame
                p={[-5.5, 0, 13.5]}
                r={[0, Math.PI / 2 - Math.PI / 4, 0]}
                s={[0.9, GOLDEN_RATIO, 0.075]}
                url='/more-news-1.jpg'
            />
            {/* Arch back dots */}
            <Image
                url='/grid-tall.png'
                position={[-6.5, 1.1, 12]}
                rotation={[0, 0, 0]}
                scale={[1.972 / 2, 4.34 / 2, 1]}
                transparent
            />
            {/* Arch top dots */}
            <Image
                url='/grid-tall.png'
                position={[-6.5, 2.2, 13.1]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1.972 / 2, 4.34 / 2, 1]}
                transparent
            />
            {/* Bg slab */}
            <Image
                url='/slab-r.svg'
                position={[-7, 1.48, 10]}
                scale={[6.549 * 1.25, 1.7 * 1.25, 1]}
                rotation={[0, Math.PI / 2, 0]}
                transparent
                ref={slab}
            />
            {/* Top logo */}
            <group>
                <Image
                    url='/bracket-l.svg'
                    position={[-4, 5, 7]}
                    scale={[1.899 * logoScale, 7.367 * logoScale, 1]}
                    rotation={[Math.PI / 2, 0, 0]}
                    transparent
                    ref={slab}
                />
                <Image
                    url='/middle.svg'
                    position={[0, 5, 7]}
                    scale={[1.042 * logoScale, 5.891 * logoScale, 1]}
                    rotation={[Math.PI / 2, 0, 0]}
                    transparent
                    ref={slab}
                />
                <Image
                    url='/bracket-r.svg'
                    position={[4, 5, 7]}
                    scale={[1.899 * logoScale, 7.367 * logoScale, 1]}
                    rotation={[Math.PI / 2, 0, 0]}
                    transparent
                    ref={slab}
                />
            </group>
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[0.75, 0.92, 12]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* Second purple one */}
            <Frame
                p={[2, 0, 14]}
                r={[0, 0, 0]}
                s={[1.5, GOLDEN_RATIO, 0.075]}
                url='/more-news-2.jpg'
            />
            {/* Front dots */}
            <Image
                url='/grid.png'
                position={[2.75, 1.5, 14.5]}
                rotation={[0, 0, 0]}
                scale={[1.972 / 2, 2.86 / 2, 1]}
                transparent
            />
            {/* Right dots */}
            <Image
                url='/grid.png'
                position={[3.25, 1.5, 15.05]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[1.972 / 2, 2.86 / 2, 1]}
                transparent
            />
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[3.75, 0.92, 15.5]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* More tall dots */}
            <Image
                url='/grid-tall.png'
                position={[3, 1.1, 18.75]}
                rotation={[0, 0, 0]}
                scale={[1.972 / 2, 4.34 / 2, 1]}
                transparent
            />
            {/* Bg slab two */}
            <Image
                url='/slab.svg'
                position={[7, 1.48, 19]}
                scale={[6.549 * 1.25, 1.7 * 1.25, 1]}
                rotation={[0, -Math.PI / 2, 0]}
                transparent
                ref={slab}
            />
            {/* Third purple one */}
            <Frame
                p={[2.85, 0, 20.5]}
                r={[0, -Math.PI / 2 + Math.PI / 4, 0]}
                s={[1.5, GOLDEN_RATIO, 0.075]}
                url='/adidas-1.jpeg'
            />
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[4.5, 0.92, 22]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* Innovative */}
            <Image
                url='/innovative.svg'
                position={[2.85, 1, 24]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[5.04 / 4, 2.51 / 4, 1]}
                transparent
            />
            {/* Teal one */}
            <Frame
                p={[2.85, 0, 26]}
                r={[0, -Math.PI / 2, 0]}
                s={[1.8, GOLDEN_RATIO, 0.075]}
                url='/services-card3.jpeg'
            />
            {/* Second arch back dots */}
            <Image
                url='/grid-tall.png'
                position={[4, 1.1, 26]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[1.972 / 2, 4.34 / 2, 1]}
                transparent
            />
            {/* Second arch top dots */}
            <Image
                url='/grid-tall.png'
                position={[2.9, 2.2, 26]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
                scale={[1.972 / 2, 4.34 / 2, 1]}
                transparent
            />
            {/* Pole */}
            <Image
                url='/pole.png'
                position={[4.5, 0.92, 27.5]}
                rotation={[0, 0, 0]}
                scale={[0.045 / 1, 1.85 / 1, 1]}
                transparent
            />
            {/* Final logo */}
            <Image
                url='/logo-full.svg'
                position={[0, 1, 38]}
                rotation={[0, 0, 0]}
                scale={[7 / 2, 1.517 / 2, 1]}
                transparent
                name='noFade'
            />
        </group>
    );
}

function Frame({ p, r, s, url }) {
    return (
        <group position={p} rotation={r}>
            <mesh
                position={[0, GOLDEN_RATIO / 2, 0]}
                // scale={[0.5, GOLDEN_RATIO, 0.075]}
                scale={s}
            >
                <boxGeometry />
                <meshStandardMaterial color='#191919' />

                <Image
                    url={url}
                    position={[0, 0, 0.7]}
                    scale={[0.975, 0.975, 1]}
                />
            </mesh>
        </group>
    );
}

export default Landing;
