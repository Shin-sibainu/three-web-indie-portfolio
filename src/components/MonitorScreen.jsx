import { useGLTF, useTexture } from "@react-three/drei";
import { useAtom } from "jotai";
import React from "react";
import { projectAtom } from "./Interface";

export function MonitorScreen(props) {
  const [project] = useAtom(projectAtom);
  const projectTexture = useTexture(project.image);

  return (
    <group {...props} dispose={null}>
      <mesh>
        <planeGeometry args={[1.14, 0.66]} />
        <meshBasicMaterial map={projectTexture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/Monitor.glb");
