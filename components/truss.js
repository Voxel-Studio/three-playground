import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Truss(props) {
  const { nodes, materials } = useGLTF("/stage_truss_short_v2_-_low_poly.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Material_003-material"].geometry}
            material={materials.Material_003}
          >
            <meshStandardMaterial color="black" />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["Material_004-material"].geometry}
          >
            <meshStandardMaterial color="black" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/stage_truss_short_v2_-_low_poly.glb");
