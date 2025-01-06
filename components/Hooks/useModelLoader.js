// import { useState, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";

// export const useModelLoader = (modelPath) => {
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [error, setError] = useState(null);

//   const { scene, animations } = useGLTF(modelPath, {
//     draco: true,
//     progressCallback: (progress) => {
//       setLoadingProgress(progress * 100);
//     },
//   });

//   useEffect(() => {
//     if (scene) {
//       setIsLoaded(true);
//     }
//   }, [scene]);

//   return {
//     scene,
//     animations,
//     progress: loadingProgress,
//     isLoaded,
//     error,
//   };
// };
