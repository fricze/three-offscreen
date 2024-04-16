import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Center,
  ContactShadows,
  Environment,
  CameraControls,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

function Model() {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("/hello_4dev.gltf");
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const color = hovered ? "hotpink" : "orange";

  useFrame((_state, delta) => {
    mesh.current.rotation.x += delta / 20;
    mesh.current.rotation.y += delta / 2;
  });

  return (
    <>
      <Center ref={mesh}>
        <mesh
          geometry={nodes.Text.geometry}
          material={materials[""]}
          material-color={color}
          scale={active ? 0.008 : 0.007}
          onClick={(e) => (e.stopPropagation(), setActive(!active))}
          onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
          onPointerOut={(e) => setHover(false)}
        />
      </Center>
      <ContactShadows
        color={color}
        position={[0, -1.5, 0]}
        blur={3}
        opacity={0.75}
      />
    </>
  );
}

export default function App() {
  return (
    <>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      <ambientLight />
      <pointLight position={[10, 10, 5]} />
      <Model />
      <Environment preset="city" />
      <CameraControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </>
  );
}
