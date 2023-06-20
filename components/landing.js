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
import styles from '../styles/Landing.module.css';

const GOLDEN_RATIO = 1.61803398875;
const CAMERA_START = 8;

const Landing = () => {
    return (
        <div className='wrapper'>
            <div className={styles.container} id='canvas-container'>
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        fov: 48,
                        position: [0, 1, CAMERA_START],
                        rotation: [0, 0, 0],
                    }}
                >
                    <Scene />
                </Canvas>
            </div>
            <Header isHomepage={true} />
            {/* <Loading /> */}
        </div>
    );
};

function Scene({ p = new THREE.Vector3() }) {
    const { camera, renderer } = useThree();
    const scrollPos = useRef(0);
    // const floor = useTexture('/floor-tile-black.png');
    const floor = useTexture('/floor2.png');
    floor.repeat.set(20, 20);
    floor.offset.set(0.49, 0.49);
    floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
    const ceiling = useTexture('/ceiling2.png');
    ceiling.repeat.set(10, 10);
    ceiling.offset.set(0.49, 0.49);
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
                        }
                    } else {
                        if (window.scrollY !== 0) {
                            scrollPos.current += deltaY / 250;
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });

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
            state.camera.position.z < 25
        ) {
            cameraTargetRotation.y =
                ((-Math.PI / 4) * (state.camera.position.z - 20)) / (25 - 20);
        } else if (
            state.camera.position.z >= 25 &&
            state.camera.position.z < 30
        ) {
            cameraTargetRotation.y =
                (-Math.PI / 4) *
                (1 - (state.camera.position.z - 25) / (30 - 25));
        } else {
            cameraTargetRotation.y = 0;
        }

        easing.damp3(state.camera.rotation, cameraTargetRotation, 0.1, dt);
    });

    return (
        <group>
            <ambientLight intensity={1} />
            {/* Ceiling */}
            <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial map={ceiling} />
            </mesh>
            {/* Floor */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial map={floor} opacity='0.5' transparent />
            </mesh>
            {/* Block text reflection */}
            {/* <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.2, 100]} />
                <meshStandardMaterial color={'black'} />
            </mesh> */}
            {/* Reflections */}
            <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
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
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial map={floor} opacity='0.5' transparent />
            </mesh>
            {/* Main logo */}
            <Image
                url='/logo-text-old.svg'
                position={[0, 1, 4]}
                scale={[5.74 / 4, 3.05 / 4, 1]}
                transparent
            />
            {/* Slab */}
            <Image
                url='/slab.png'
                position={[-1.5, 1.25, 0.1]}
                scale={[11.13 / 1, 3.31 / 1, 1]}
                transparent
            />
            {/* Left dots */}
            <Image
                url='/grid.png'
                position={[-4, 1, 4.5]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[3.5 / 2, 3.9 / 2, 1]}
                transparent
            />
            {/* Top dots */}
            <Image
                url='/grid.png'
                position={[3.5, 2.5, 2]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[3.5 / 2, 3.9 / 2, 1]}
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
