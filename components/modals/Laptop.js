import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

const HackerRoom = React.memo(function HackerRoom(props) {
  const { nodes, materials } = useGLTF("/models/hacker-room.glb");
  const modelRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Initial animation
  useEffect(() => {
    if (modelRef.current) {
      // Entrance animation
      gsap.fromTo(modelRef.current.position,
        { y: -5 },
        {
          y: -1.5,
          duration: 1.5,
          ease: "power2.out"
        }
      );
    }
  }, []);

  // Animations with hover effect
  useFrame((state) => {
    if (modelRef.current) {
      // Smooth up and down floating motion
      modelRef.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotation speed varies based on hover state
      const rotationSpeed = hovered ? 0.003 : 0.001;
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  // Click interaction
  const handleClick = () => {
    setClicked(!clicked);
    gsap.to(modelRef.current.rotation, {
      y: modelRef.current.rotation.y + Math.PI * 1,
      duration: 1.5,
      ease: "power2.inOut"
    });
  };

  return (
    <group
      {...props}
      ref={modelRef}
      dispose={null}
      position={[0.5, -1.5, 0]}
      scale={[0.033, 0.033, 0.033]}
      rotation={[0.4, 3.2, 0]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      />
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_3.geometry}
        material={materials.server_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_4.geometry}
        material={materials.vhsPlayer_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_5.geometry}
        material={materials.stand_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_6.geometry}
        material={materials.mat_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_7.geometry}
        material={materials.arm_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_8.geometry}
        material={materials.tv_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_9.geometry}
        material={materials.cables_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_10.geometry}
        material={materials.props_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_11.geometry}
        material={materials.ground_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_12.geometry}
        material={materials.key_mat}
      />
    </group>
  );
});

export default HackerRoom;

useGLTF.preload("/models/hacker-room.glb");