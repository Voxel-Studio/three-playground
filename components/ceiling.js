import { Spotlight } from "./light";
import { Truss } from "./truss";

function Ceiling(props) {
  return (
    <group {...props}>
      <group position={[0, 0, 0.5]}>
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        {/* <Truss scale={0.8} position={[0, 0, 0]} /> */}
        <Truss scale={0.8} position={[3.4, 0, 0]} />
        <Spotlight
          scale={1.5}
          position={[-4.4, -1, -0.5]}
          rotation={[-Math.PI / 4, Math.PI / 1.5, 0]}
        />
        <Spotlight
          scale={1.5}
          position={[4.4, -1, -0.5]}
          rotation={[-Math.PI / 4, -Math.PI / 1.5, 0]}
        />
      </group>
      <group position={[-4.75, 0, 5.5]} rotation={[0, Math.PI / 2, 0]}>
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        <Truss scale={0.8} position={[0, 0, 0]} />
        <Truss scale={0.8} position={[3.4, 0, 0]} />
        <Spotlight
          scale={1.5}
          position={[-5.4, -1, 1]}
          rotation={[-Math.PI / 4, Math.PI / 1.15, 0]}
        />
      </group>
      <group position={[4.75, 0, 5.5]} rotation={[0, Math.PI / 2, 0]}>
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        <Truss scale={0.8} position={[0, 0, 0]} />
        <Truss scale={0.8} position={[3.4, 0, 0]} />
        <Spotlight
          scale={1.5}
          position={[-6.4, -1, 1]}
          rotation={[-Math.PI / 4, Math.PI / 1.15, 0]}
        />
      </group>
      <group position={[0, 0, 10.5]} rotation={[0, Math.PI / 2, 0]}>
        <Truss scale={0.8} position={[-6.8, 0, 0]} />
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        <Truss scale={0.8} position={[0, 0, 0]} />
        <Truss scale={0.8} position={[3.4, 0, 0]} />
        <Truss scale={0.8} position={[6.8, 0, 0]} />
        <Spotlight
          scale={1.5}
          position={[8.4, -1, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Spotlight
          scale={1.5}
          position={[4.4, -1, 0.5]}
          rotation={[-Math.PI / 6, Math.PI, 0]}
        />
        <Spotlight
          scale={1.5}
          position={[-4.4, -1, -0.5]}
          rotation={[Math.PI / 6, 0, 0]}
        />

        <Spotlight
          scale={1.5}
          position={[-8.4, -1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </group>
      <group position={[-4.75, 0, 16]} rotation={[0, Math.PI / 2, 0]}>
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        <Truss scale={0.8} position={[0, 0, 0]} />
        <Truss scale={0.8} position={[3.4, 0, 0]} />
      </group>
      <group position={[4.75, 0, 16]} rotation={[0, Math.PI / 2, 0]}>
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        <Truss scale={0.8} position={[0, 0, 0]} />
        <Truss scale={0.8} position={[3.4, 0, 0]} />
      </group>
      <group position={[0, 0, 20.75]}>
        <Truss scale={0.8} position={[-3.4, 0, 0]} />
        {/* <Truss scale={0.8} position={[0, 0, 0]} /> */}
        <Truss scale={0.8} position={[3.4, 0, 0]} />
      </group>
    </group>
  );
}

export default Ceiling;
