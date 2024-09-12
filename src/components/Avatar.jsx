/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/66dfb191ca09e831cbd9d5ec.glb -o src/components/Avatar.jsx -k -r public 
*/

import React, { useEffect, useRef, useState } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF, useScroll } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { MathUtils } from "three";

export function Avatar(props) {
  const { scene } = useGLTF("/models/66dfb191ca09e831cbd9d5ec.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
  const { animations: walkingAnimation } = useFBX("/animations/Walking.fbx");

  idleAnimation[0].name = "Idle";
  walkingAnimation[0].name = "Walking";

  const group = useRef();
  const { actions } = useAnimations(
    [idleAnimation[0], walkingAnimation[0]],
    group
  );

  const scrollData = useScroll();
  const lastScroll = useRef(0);

  const [animation, setAnimation] = useState("Idle");

  //停止、歩くときだけ発火する。(animationの変更に依存する)
  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  useFrame(() => {
    const scrollDelta = scrollData.offset - lastScroll.current;
    let rotationTarget = 0;
    if (Math.abs(scrollDelta) > 0.00001) {
      setAnimation("Walking");
      if (scrollDelta > 0) {
        rotationTarget = 0;
      } else {
        rotationTarget = Math.PI;
      }
    } else {
      setAnimation("Idle");
    }

    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      rotationTarget,
      0.06
    );

    lastScroll.current = scrollData.offset; //これで前回の位置を入れてるのか。
  });

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Hair"
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Top"
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Bottom"
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Outfit_Footwear"
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Body"
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
    </group>
  );
}

useFBX.preload("/animations/Idle.fbx");
useFBX.preload("/animations/Walking.fbx");
useGLTF.preload("/models/66dfb191ca09e831cbd9d5ec.glb");
