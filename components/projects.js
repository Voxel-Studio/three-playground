import { useEffect, useState } from "react";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import VirtualScroll from "virtual-scroll";
import styles from "../styles/Projects.module.css";
import { Plane } from "three";
import { Loading } from "./loading";
import { loadingTimeMs, projectItems } from "../utils/helper";
import { useThree } from "@react-three/fiber";

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
    //Ratio
    let ratio = window.innerWidth / window.innerHeight / 2;
    // Element variables
    const container = document.getElementById("container");
    const webglEl = document.getElementById("webglEl");

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
    let projectImages = [];
    projectItems.map((item) => {
        projectImages.push(item.image);
    });
    const textures = projectImages.map((url) =>
        new THREE.TextureLoader().load(url)
    );
    let titles = [];
    projectItems.map((item) => {
        titles.push(item.title);
    });
    // const radius = 7;
    let radius = 5.5 * ratio;
    const group = new THREE.Group();
    const loader = new FontLoader();
    for (let i = 0; i < totalPoints; i++) {
        const geo = new THREE.PlaneGeometry(4, 2.25, 10, 10);
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
        const angle = theta * i + Math.PI;
        mesh.name = "plane" + " " + i;
        group.add(mesh);
        mesh.position.set(
            radius * Math.cos(angle),
            radius * Math.sin(angle),
            0
        );
        mesh.rotation.z = angle;
        console.log(mesh.scale);
        mesh.scale.x *= ratio;
        mesh.scale.y *= -1 * ratio;
        loader.load("/lexend-deca.json", function (font) {
            const textGeometry = new TextGeometry(titles[i], {
                font: font,
                size: 0.16,
                height: 0.01,
                curveSegments: 8,
            });
            const textMaterial = new THREE.MeshBasicMaterial({
                color: "white",
            });
            const text = new THREE.Mesh(textGeometry, textMaterial);
            text.name = "text" + " " + i;
            group.add(text);
            text.position.set(
                // radius * 1 * Math.cos(angle),
                // radius * 1.75 * Math.cos(angle),
                radius * 2 * Math.cos(angle),
                // radius * 1 * Math.sin(angle),
                // radius * 1.75 * Math.sin(angle),
                radius * 2 * Math.sin(angle),
                2
            );
            text.rotation.z = angle;
            text.scale.y *= -1 * ratio;
            text.scale.x *= -1 * ratio;
            // console.log(text.position);
        });
    }
    scene.add(group);
    // group.position.x = -(visibleWidthAtZDepth(0, camera) / 2) - 1;
    // group.position.x = visibleWidthAtZDepth(0, camera) / 2 - 1;
    group.position.x = visibleWidthAtZDepth(0, camera) / 2 + 1;

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
        // scrollPos = -event.y / 6000;
        scrollPos = event.y / 6000;
        // scrollSpeed = (event.deltaY * theta) / 2000;
        scrollSpeed = (event.deltaY * theta) / 3000;

        // always allow scroll, but if position less than half way, scroll back
        // if position more than halfway, scroll forwards
        // event.y = 5000;
    });

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(window.innerWidth, window.innerHeight);
    webglEl.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Resize
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        ratio = window.innerWidth / window.innerHeight / 2;
        radius = 5.5 * ratio;
        scene.traverse((object) => {
            if (object.name.includes("plane")) {
                const angle =
                    theta * object.name[object.name.length - 1] + Math.PI;
                // Scale the mesh
                object.scale.x = ratio;
                object.scale.y = -1 * ratio;
                //Reposition the mesh
                object.position.set(
                    radius * Math.cos(angle),
                    radius * Math.sin(angle),
                    0
                );
            }
            if (object.name.includes("text")) {
                const angle =
                    theta * object.name[object.name.length - 1] + Math.PI;
                object.position.set(
                    radius * 2 * Math.cos(angle),
                    radius * 2 * Math.sin(angle),
                    2
                );
                object.scale.x = -1 * ratio;
                object.scale.y = -1 * ratio;
            }
        });
        group.position.x = visibleWidthAtZDepth(0, camera) / 2 + 1;
    };
    window.addEventListener("resize", onWindowResize, false);

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
    const rayCaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
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

        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        rayCaster.setFromCamera(mouse, camera);
        let intersects = rayCaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const hit = intersects[0].object;
            if (hit) {
                const name = hit.name;
                const type = name.split(" ")[0];
                if (type === "plane") {
                    document.body.style.cursor = "pointer";
                }
            }
        } else {
            document.body.style.cursor = "auto";
        }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onClick = (e) => {
        rayCaster.setFromCamera(mouse, camera);
        let intersects = rayCaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const hit = intersects[0].object;
            if (hit) {
                const name = hit.name;
                const type = name.split(" ")[0];
                console.log(type);
                const num = name.split(" ")[1];
                // if (type === 'plane' || type === 'text') {
                if (type === "plane") {
                    window.location.href = `/case-studies/${projectItems[num].id}`;
                }
            }
        }
    };
    window.addEventListener("click", onClick);

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

        // movement toward mouse
        deltaX *= 0.9;
        deltaY *= 0.9;
        targetDeltaX += (deltaX - targetDeltaX) * 0.05;
        targetDeltaY += (deltaY - targetDeltaY) * 0.05;

        scene.traverse(function (child) {
            if (child.name === "plane") {
                child.translateX(targetDeltaX / 3000);
                child.translateY(-targetDeltaY / 3000);
            }
            if (child.name === "text") {
                child.translateX(targetDeltaX / 1000);
                child.translateY(-targetDeltaY / 1000);
            }
        });

        xTargetPos += (xPos - xTargetPos) * 0.05;
        yTargetPos += (yPos - yTargetPos) * 0.05;
        // group.rotation.y = xTargetPos / 9000;
        // group.rotation.x = yTargetPos / 5000;
        group.rotation.y = xTargetPos / 40000;
        group.rotation.x = yTargetPos / 20000;

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
            setSelected(7);
            selected = 7;
        } else if (
            rot > theta + theta * 0.5 &&
            rot <= theta * 2 + theta * 0.5
        ) {
            setSelected(6);
            selected = 6;
        } else if (
            rot > theta * 2 + theta * 0.5 &&
            rot <= theta * 3 + theta * 0.5
        ) {
            setSelected(5);
            selected = 5;
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
            setSelected(3);
            selected = 3;
        } else if (
            rot > theta * 5 + theta * 0.5 &&
            rot <= theta * 6 + theta * 0.5
        ) {
            setSelected(2);
            selected = 2;
        } else if (
            rot > theta * 6 + theta * 0.5 &&
            rot <= theta * 7 + theta * 0.5
        ) {
            setSelected(1);
            selected = 1;
        }
        // console.log(selected);

        const progressNumbers = document.querySelectorAll(".progressNumber");
        progressNumbers.forEach((number) => (number.style.opacity = 0.25));
        if (progressNumbers[selected])
            progressNumbers[selected].style.opacity = 1;
        const brackets = document.querySelector(".brackets");
        if (brackets)
            brackets.style.transform = `translateY(calc(${selected}em + ${
                selected * 10
            }px))`;

        // for (let i = 0; i < group.children.length; i++) {
        //     group.children[i].translateX(0);
        //     group.children[selected].translateX(-1);
        // }

        for (let i = 0; i < group.children.length; i++) {
            // group.children[i].rotation.x = scrollTargetSpeed * 2;
        }

        // Radial progress indicator
        // const progressCircle = document.querySelector('.progress-circle');
        // if (progressCircle)
        //     progressCircle.style.transform = `rotate(${
        //         rot * (180 / Math.PI)
        //     }deg)`;

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
        <div className="wrapper">
            <div className={styles.container} id="container">
                <div id="webglEl"></div>
            </div>
            <ul className={styles.progress}>
                <img className="brackets" src="/brackets.svg" alt="" />
                <li className="progressNumber">01</li>
                <li className="progressNumber">02</li>
                <li className="progressNumber">03</li>
                <li className="progressNumber">04</li>
                <li className="progressNumber">05</li>
                <li className="progressNumber">06</li>
                <li className="progressNumber">07</li>
                <li className="progressNumber">08</li>
            </ul>
            {/* <img className='circle' src='/circle.svg' alt='' /> */}
            {/* <img className='progress-circle' src='/circle-chunk.svg' alt='' /> */}
            <Loading />
        </div>
    );
};

export default Projects;
