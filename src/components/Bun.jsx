import React, { useRef, useState, useEffect, useContext } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { TooltipContext } from "../App";
import BunGlb from "./bun.glb?url";
import Hdr from "./blender-2k.hdr?url";

export default function Bun(props) {
  const tooltipRef = useContext(TooltipContext);
  const groupRef = useRef();
  const { nodes, materials } = useGLTF(BunGlb);
  const [hovered, hover] = useState(false);

  useFrame((state, delta) => {
    if (hovered) {
    } else {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "default";
    }
  }, [hovered]);

  return (
    <>
      <Environment files={[Hdr]} environment />
      <group
        ref={groupRef}
        {...props}
        dispose={null}
        onPointerOver={(...args) => {
          hover(true);
        }}
        onPointerOut={() => {
          hover(false);
        }}
        onClick={(e) => {
          tooltipRef.current.open({
            position: {
              x: e.clientX,
              y: e.clientY,
            },
            content: <a href="/docs/blender/2024-9-21" target="_blank">介绍</a>,
          });
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.bunMaterial}
          position={[0, 0.256, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Material}
          position={[0, 0.425, 0]}
          scale={0.88}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.cheese}
          position={[0, 0.561, 0]}
          scale={0.742}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.bunMaterial}
          position={[0, 0.665, 0]}
          rotation={[Math.PI, 0, 0]}
        />
      </group>
    </>
  );
}

useGLTF.preload(BunGlb);
