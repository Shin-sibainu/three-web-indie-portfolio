import { useEffect, useRef, useState } from "react";
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  useScroll,
} from "@react-three/drei";

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
import { Balloon } from "./Balloon";
import { Mailbox } from "./Mailbox";
import { ParkBench } from "./ParkBench";
import { Pigeon } from "./Pigeon";

import { MathUtils } from "three";
import { motion } from "framer-motion-3d";
import { MonitorScreen } from "./MonitorScreen";

const SECTIONS_DISTANCE = 10;

export const Experience = () => {
  const [section, setSection] = useState(config.sections[0]);

  const sceneContainer = useRef();
  const scrollData = useScroll(); //スクロールオフセットを取得するため

  useFrame(() => {
    //シーングループ丸ごとz軸の負の方向に移動させている。
    sceneContainer.current.position.z =
      -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1);

    //個々のセクションの数字を取得するために、offsetからの四捨五入してセクション位置を把握
    setSection(
      config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))]
    );
  });

  useEffect(() => {
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(
        window.location.hash.replace("#", "")
      );
      if (sectionIndex !== -1) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) *
            (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        );
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Environment preset="sunset" />
      <Avatar />

      {/* 地面：plane */}
      <ContactShadows opacity={0.6} color={"#9c8e66"} scale={[30, 30]} />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.001}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#b0c4de" />
      </mesh>

      {/* 歩いている場所に応じてanimate={"home"}, {"skills"}...と変わっている。 */}
      <motion.group ref={sceneContainer} animate={section}>
        {/* HOME */}
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0,
            },
          }}
        >
          <Star position-z={0} position-y={2.2} scale={0.3} />
          <Float>
            <MacBookPro
              position-x={-1.5}
              position-y={0.3}
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
              position-x={-1.8}
              position-y={0.2}
              position-z={-3}
              bevelEnabled
              bevelThickness={0.3}
              rotation-y={Math.PI / 10}
            >
              {config.home.subtitle}
            </SectionTitle>
          </Center>
        </motion.group>

        {/* SKILLS */}
        <motion.group
          position-z={SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            skills: {
              y: 0,
            },
          }}
        >
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
        </motion.group>

        {/* PROJECTS */}
        <motion.group
          position-z={2 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            projects: {
              y: 0,
            },
          }}
        >
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
              <MonitorScreen
                rotation-x={-0.18}
                position-z={-0.895}
                position-y={1.74}
              />
              <RoundedBox scale-x={2} position-z={-1} position-y={0.5}>
                <meshStandardMaterial color={"white"} />
              </RoundedBox>
            </group>
          </group>
        </motion.group>

        {/* CONTACT */}
        <motion.group
          position-z={3 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            contact: {
              y: 0,
            },
          }}
        >
          <SectionTitle position-x={-2} position-z={0.6}>
            CONTACT
          </SectionTitle>
          <group position-x={-2}>
            <ParkBench
              scale={0.5}
              position-x={-0.5}
              position-z={-2.5}
              rotation-y={-Math.PI / 4}
            />
            <group position-y={2.2} position-z={-0.5}>
              <Float floatIntensity={2} rotationIntensity={1.5}>
                <Balloon scale={1.5} position-x={-0.5} color="#71a2d9" />
              </Float>
              <Float
                floatIntensity={1.5}
                rotationIntensity={2}
                position-z={0.5}
              >
                <Balloon scale={1.3} color="#d97183" />
              </Float>
              <Float speed={2} rotationIntensity={2}>
                <Balloon scale={1.6} position-x={0.4} color="yellow" />
              </Float>
            </group>
          </group>

          <Mailbox
            scale={0.25}
            rotation-y={1.25 * Math.PI}
            position-x={1}
            position-y={0.25}
            position-z={0.5}
          />
          <Float floatIntensity={1.5} speed={3}>
            <Pigeon
              position-x={2}
              position-y={1.5}
              position-z={-0.5}
              scale={0.3}
            />
          </Float>
        </motion.group>
      </motion.group>
    </>
  );
};
