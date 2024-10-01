import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Bun from "./Bun";

export function Scene() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 创建媒体查询
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // 初始检查
    setIsDarkMode(darkModeQuery.matches);

    // 监听模式变化
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeQuery.addEventListener("change", handleChange);

    // 清理函数
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);
  const clearColor = isDarkMode ? "#000000" : "#ffffff";

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <color attach="background" args={[clearColor]} />
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        near={0.1}
        far={1000}
      />
      {/* 增加环境光强度 */}
      {/* <ambientLight intensity={1.5} /> */}
      {/* 增加主光源强度 */}
      {/* <directionalLight position={[5, 5, 5]} intensity={5} castShadow /> */}
      {/* 增加填充光强度 */}
      {/* <pointLight position={[-5, -5, -5]} intensity={1} /> */}
      {/* 增加聚光灯强度 */}
      {/* <spotLight position={[10, 10, 10]} angle={0.3} penumbra={0.2} intensity={1.5} castShadow /> */}
      <Suspense fallback={null}>
        <Bun position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
