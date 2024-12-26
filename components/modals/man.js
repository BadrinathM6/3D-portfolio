import React, { useEffect, useRef, useState } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

const HeroSection = () => {
  const modelRef = useRef();
  const [modelProps, setModelProps] = useState({
    position: [0, -3.1, 0],
    scale: [2.8, 2.8, 2.8],
  });

  // Load model
  const { scene } = useGLTF('/models/animations/developer.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Load animations
  const idleAnimData = useFBX('/models/animations/idle.fbx');
  const saluteAnimData = useFBX('/models/animations/salute.fbx');

  // Prepare animations
  const animations = React.useMemo(() => {
    const idleAnim = idleAnimData.animations[0];
    const saluteAnim = saluteAnimData.animations[0];
    idleAnim.name = 'idle';
    saluteAnim.name = 'salute';
    return [idleAnim, saluteAnim];
  }, [idleAnimData, saluteAnimData]);

  const calculateModelProps = () => {
    const width = window.innerWidth;

    if (width < 640) {
      // Small screens (e.g., mobile)
      return {
        position: [0, -2.5, 0],
        scale: [1.8, 1.8, 1.8],
      };
    } else if (width < 1024) {
      // Medium screens (e.g., tablets)
      return {
        position: [0, -3, 0],
        scale: [2.2, 2.2, 2.2],
      };
    } else {
      // Large screens (e.g., desktops)
      return {
        position: [0, -3.1, 0],
        scale: [2.8, 2.8, 2.8],
      };
    }
  };

  useEffect(() => {
    // Set initial properties
    setModelProps(calculateModelProps());

    // Update properties on window resize
    const handleResize = () => {
      setModelProps(calculateModelProps());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get animation actions
  const { actions, mixer } = useAnimations(animations, modelRef);

  // Handle animation sequence
  useEffect(() => {
    if (!actions.idle || !actions.salute || !mixer) return;

    // Reset mixer and all animations
    mixer.stopAllAction();
    
    // Configure the salute animation
    actions.salute.clampWhenFinished = true;
    actions.salute.loop = THREE.LoopOnce;
    
    // Play idle animation
    actions.idle
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .play();

    // Play salute after delay
    setTimeout(() => {
      actions.idle.fadeOut(0.5);
      actions.salute
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(0.5)
        .play();

      // Listen for salute completion
      mixer.addEventListener('finished', () => {
        actions.salute.fadeOut(0.5);
        actions.idle
          .reset()
          .setEffectiveWeight(1)
          .fadeIn(0.5)
          .play();
      });
    }, 1500);

    // Cleanup
    return () => {
      mixer.removeEventListener('finished');
      mixer.stopAllAction();
    };
  }, [actions, mixer]);

  return (
    <group
      ref={modelRef}
      position={[0, -3.1, 0]}
      scale={[2.8, 2.8, 2.8]}
      rotation={[0.3, 0, 0]}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
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
};

// Preload assets
useGLTF.preload('/models/animations/developer.glb');

export default HeroSection;