import { useRef } from "react";
import { Center, Environment, Float, useScroll } from "@react-three/drei";

import { Avatar } from "./Avatar";
import { SectionTitle } from "./SectionTitle";
import { useFrame } from "@react-three/fiber";

import { config } from "../config";

import { MacBookPro } from "./MacBookPro";
import { PalmTree } from "./PalmTree";
import { Star } from "./Star";
import { BookCase } from "./BookCase";
import { CouchSmall } from "./CouchSmall";
import { Lamp } from "./Lamp";
import { RoundedBox } from "@react-three/drei";
import { Monitor } from "./Monitor";

import { MathUtils } from "three";

const SECTIONS_DISTANCE = 10;

export const Experience = () => {
  const sceneContainer = useRef();
  const scrollData = useScroll(); //スクロールオフセットを取得するため

  useFrame(() => {
    //シーングループ丸ごとz軸の負の方向に移動させている。
    sceneContainer.current.position.z =
      -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);
  });

  return (
    <>
      <Environment preset="sunset" />
      <Avatar />

      <group ref={sceneContainer}>
        {/* HOME */}
        <group>
          <Star position-z={0} position-y={2.2} scale={0.3} />
          <Float>
            <MacBookPro
              position-x={-1.5}
              position-y={0}
              position-z={0}
              scale={0.3}
              rotation-y={Math.PI / 4}
            />
          </Float>
          <PalmTree
            scale={0.018}
            rotation-y={MathUtils.degToRad(140)}
            position={[4, 0, -5]}
          />
          <Float floatIntensity={0.6}>
            <Center disableY disableZ>
              <SectionTitle
                size={0.8}
                position-y={1.6}
                position-z={-3}
                bevelEnabled
                bevelThickness={0.3}
              >
                {config.home.title}
              </SectionTitle>
            </Center>
          </Float>
          <Center disableY disableZ>
            <SectionTitle
              size={0.7}
              position-x={-1.5}
              position-z={-3}
              bevelEnabled
              bevelThickness={0.3}
              rotation-y={Math.PI / 10}
            >
              {config.home.subtitle}
            </SectionTitle>
          </Center>
        </group>
        {/* SKILLS */}
        <group position-z={SECTIONS_DISTANCE}>
          <group position-x={-2}>
            <SectionTitle position-z={1.5} rotation-y={Math.PI / 6}>
              SKILLS
            </SectionTitle>
            <BookCase position-z={-2} />
            <CouchSmall
              scale={0.3}
              position-z={0}
              position-x={-0.2}
              rotation-y={Math.PI / 3}
            />
            <Lamp
              position-y={-0.8}
              position-z={0.6}
              position-x={0.6}
              rotation-y={-Math.PI}
            />
          </group>
          {/* <mesh position-y={2} position-z={-4} position-x={2}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial opacity={0.8} transparent color="yellow" />
          </mesh>
          <mesh position-y={2.3} position-z={-6} position-x={4.3}>
            <sphereGeometry args={[0.7, 64, 64]} />
            <meshStandardMaterial opacity={0.8} transparent color="orange" />
          </mesh> */}
        </group>

        {/* PROJECTS */}
        <group position-z={2 * SECTIONS_DISTANCE}>
          <group position-x={1}>
            <SectionTitle
              position-x={-0.5}
              position-z={0}
              rotation-y={-Math.PI / 6}
            >
              PROJECTS
            </SectionTitle>

            <group
              position-x={0.5}
              position-z={0}
              scale={0.8}
              rotation-y={-Math.PI / 6}
            >
              <Monitor
                scale={0.02}
                rotation-y={-Math.PI / 2}
                position-y={1}
                position-z={-1}
              />
              <RoundedBox scale-x={2} position-z={-1} position-y={0.5}>
                <meshStandardMaterial color={"white"} />
              </RoundedBox>
            </group>
          </group>
        </group>
        {/* CONTACT */}
        <group position-z={3 * SECTIONS_DISTANCE}>
          <SectionTitle position-x={0.5}>CONTACT</SectionTitle>
        </group>
      </group>

      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial color="white" />
      </mesh> */}
    </>
  );
};
