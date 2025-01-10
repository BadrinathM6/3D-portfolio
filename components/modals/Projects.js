import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import gsap from 'gsap';
import { MeshStandardMaterial } from "three";

const MODEL_PATH = "/models/optimized_model.glb";

const Model = React.memo(({ texture = '/textures/project/project1.webm', direction = null, ...props }) => {
  const meshRef = useRef();
  const { nodes, materials } = useGLTF(MODEL_PATH, true);

  const videoTexture = useVideoTexture(texture, {
    crossOrigin: "anonymous",
    loop: true,
    muted: true,
    start: false, // Don't start immediately
    preload: 'auto'
  });

  useEffect(() => {
    if (videoTexture && 'requestVideoFrameCallback' in HTMLVideoElement.prototype) {
      videoTexture.source.data.play();
    }
    return () => {
      videoTexture?.source?.data?.pause();
    };
  }, [videoTexture]);

  useEffect(() => {
    if (videoTexture) {
      videoTexture.flipY = false;
    }
  }, [videoTexture]);

  useEffect(() => {
    if (meshRef.current && direction !== null) {
      const targetRotation = direction === 'left' ? -Math.PI / 1.5 : Math.PI / 1.5;
      
      gsap.to(meshRef.current.rotation, {
        y: targetRotation,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          gsap.to(meshRef.current.rotation, {
            y: 0,
            duration: 1,
            ease: 'power3.out'
          });
        }
      });
    }
  }, [direction]);

  const screenMaterial = useMemo(() => {
    if (!videoTexture) return null;
    return new MeshStandardMaterial({
      map: videoTexture,
      toneMapped: false,
      roughness: 0.5, // Add reasonable defaults
      metalness: 0.1
    });
  }, [videoTexture]);

  useEffect(() => {
    const cleanup = () => {
      if (materials) {
        Object.values(materials).forEach(material => {
          if (material.map) material.map.dispose();
          material.dispose();
        });
      }
      if (nodes) {
        Object.values(nodes).forEach(node => {
          if (node.geometry) node.geometry.dispose();
        });
      }
      if (videoTexture) {
        videoTexture.dispose();
        videoTexture.source?.data?.pause();
      }
      if (screenMaterial) {
        screenMaterial.dispose();
      }
    };

    return cleanup;
  }, [materials, nodes, videoTexture, screenMaterial]);

  const modelStructure = useMemo(
    () => {
      if (!nodes || !materials || !screenMaterial) return null;
      
      return (
        <group
          {...props}
          dispose={null}
          ref={meshRef}
          position={[-0.1, 1.9, 0]}
          scale={0.005}
          rotation={[-0.6, 0.0, 0.0]}
        >
          <group
            position={[20, -400.625, -352.033]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group rotation={[-Math.PI, 0, 0]}>
              {/* Main body group */}
              <group
                position={[0, -45.502, 311.501]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={[220.908, 333.167, 100]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_PCBody_0.geometry}
                  material={materials.PCBody}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Port_0.geometry}
                  material={materials.Port}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_PortWires_0.geometry}
                  material={materials.PortWires}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Side_0.geometry}
                  material={materials.Side}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Screen_0.geometry}
                  material={screenMaterial}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_ScreenOff_0.geometry}
                  material={materials.ScreenOff}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_OnOffButton_0.geometry}
                  material={materials.OnOffButton}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Body_Logos_0.geometry}
                  material={materials.Logos}
                />
              </group>
              {/* Keyboard group */}
              <group
                position={[-55.589, -318.037, -4.361]}
                rotation={[0.005, 0, 0]}
                scale={100}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_PCBody_0.geometry}
                  material={materials.PCBody}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_KeyboardKeys_0.geometry}
                  material={materials.KeyboardKeys}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_KeyboardLine_0.geometry}
                  material={materials.KeyboardLine}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_OnOff_0.geometry}
                  material={materials.OnOff}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_Logos_0.geometry}
                  material={materials.Logos}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_Port_0.geometry}
                  material={materials.Port}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_PortWires_0.geometry}
                  material={materials.PortWires}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Keyboard_Side001_0.geometry}
                  material={materials["Side.001"]}
                />
              </group>
              {/* Mouse group */}
              <group
                position={[247.424, -309.145, -8.034]}
                rotation={[Math.PI / 2, Math.PI / 2, 0]}
                scale={66.769}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_MouseTop_0.geometry}
                  material={materials.MouseTop}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_Port_0.geometry}
                  material={materials.Port}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_PCBody_0.geometry}
                  material={materials.PCBody}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_Lens_0.geometry}
                  material={materials.Lens}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_OnOff_0.geometry}
                  material={materials.OnOff}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_PortWires_0.geometry}
                  material={materials.PortWires}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_Side001_0.geometry}
                  material={materials["Side.001"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Mouse_Logos_0.geometry}
                  material={materials.Logos}
                />
              </group>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Stand_PCBody_0.geometry}
                material={materials.PCBody}
                position={[0, -49.879, -2.941]}
                rotation={[0.096, 0, -Math.PI / 2]}
                scale={100}
              />
            </group>
          </group>
        </group>
      );
    },
    [nodes, materials, screenMaterial, props]
  );

  return modelStructure;
});

Model.displayName = "Model";

useGLTF.preload(MODEL_PATH, true);

export default Model;